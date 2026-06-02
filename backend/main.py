from fastapi import FastAPI, UploadFile, File, Form, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
import os
import json
import websockets
import asyncio

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_stage_url")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Interview(Base):
    __tablename__ = "interviews"
    __table_args__ = {"schema": "public"}
    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String)
    job_description = Column(Text)
    difficulty = Column(String)
    resume_filename = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Question(Base):
    __tablename__ = "questions"
    __table_args__ = {"schema": "public"}
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String)
    difficulty = Column(String)
    question_text = Column(Text)
    expected_keywords = Column(Text)

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    __table_args__ = {"schema": "public"}
    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer)
    role = Column(String)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}

@app.post("/start-interview")
async def start_interview(
    job_title: str = Form(...),
    job_description: str = Form(...),
    difficulty: str = Form(...),
    resume: UploadFile = File(...)
):
    resume_content = await resume.read()

    # Extract text from PDF
    resume_text = ""
    try:
        import PyPDF2
        import io
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(resume_content))
        for page in pdf_reader.pages:
            resume_text += page.extract_text() or ""
    except:
        resume_text = "Resume uploaded but could not be parsed."

    db = SessionLocal()
    interview = Interview(
        job_title=job_title,
        job_description=job_description,
        difficulty=difficulty,
        resume_filename=resume.filename
    )
    db.add(interview)
    db.commit()
    db.refresh(interview)
    interview_id = interview.id

    questions = db.query(Question).filter(Question.difficulty == difficulty).all()
    questions_list = [{"id": q.id, "question_text": q.question_text, "topic": q.topic} for q in questions]
    db.close()

    return {
        "message": "Interview started and saved!",
        "interview_id": interview_id,
        "job_title": job_title,
        "job_description": job_description,
        "difficulty": difficulty,
        "resume_filename": resume.filename,
        "resume_text": resume_text,
        "questions": questions_list
    }

@app.get("/interviews")
def get_interviews():
    db = SessionLocal()
    interviews = db.query(Interview).all()
    db.close()
    return interviews

@app.post("/add-question")
def add_question(
    topic: str = Form(...),
    difficulty: str = Form(...),
    question_text: str = Form(...),
    expected_keywords: str = Form(...)
):
    db = SessionLocal()
    question = Question(
        topic=topic,
        difficulty=difficulty,
        question_text=question_text,
        expected_keywords=expected_keywords
    )
    db.add(question)
    db.commit()
    db.close()
    return {"message": "Question added!"}

@app.get("/questions/{difficulty}")
def get_questions(difficulty: str):
    db = SessionLocal()
    questions = db.query(Question).filter(Question.difficulty == difficulty).all()
    db.close()
    return questions

@app.post("/chat")
async def chat(
    interview_id: int = Form(...),
    job_title: str = Form(...),
    job_description: str = Form(...),
    difficulty: str = Form(...),
    user_message: str = Form(...),
    conversation_history: str = Form(default="[]")
):
    from openai import AzureOpenAI

    client = AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION")
    )

    system_prompt = f"""You are an expert AI interviewer conducting a job interview.
Job Title: {job_title}
Job Description: {job_description}
Difficulty Level: {difficulty}
Ask relevant questions, evaluate answers, and adapt difficulty in real time."""

    history = json.loads(conversation_history)
    history.append({"role": "user", "content": user_message})

    db = SessionLocal()
    db.add(ChatMessage(interview_id=interview_id, role="user", content=user_message))
    db.commit()

    def generate():
        full_response = ""
        stream = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=[{"role": "system", "content": system_prompt}] + history,
            stream=True,
            max_tokens=1000
        )
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                text = chunk.choices[0].delta.content
                full_response += text
                yield text
        db.add(ChatMessage(interview_id=interview_id, role="assistant", content=full_response))
        db.commit()
        db.close()

    return StreamingResponse(generate(), media_type="text/plain")

@app.websocket("/ws/interview")
async def websocket_interview(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client connected to WebSocket")

    AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
    AZURE_KEY = os.getenv("AZURE_OPENAI_KEY")
    DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
    API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION")

    endpoint_clean = AZURE_ENDPOINT.rstrip("/").replace("https://", "")
    url = f"wss://{endpoint_clean}/openai/deployments/{DEPLOYMENT}/realtime?api-version={API_VERSION}"

    print(f"🔗 Connecting to Azure URL: {url}")

    headers = {
        "api-key": AZURE_KEY,
        "OpenAI-Beta": "realtime=v1"
    }

    try:
        async with websockets.connect(url, additional_headers=headers) as azure_ws:
            print("✅ Connected to Azure successfully!")

            await azure_ws.send(json.dumps({
                "type": "session.update",
                "session": {
                    "modalities": ["audio", "text"],
                    "instructions": "You are an expert AI interviewer. Ask interview questions and evaluate answers adaptively.",
                    "voice": "alloy",
                    "input_audio_format": "pcm16",
                    "output_audio_format": "pcm16",
                    "input_audio_transcription": {"model": "whisper-1"},
                    "turn_detection": {
                        "type": "server_vad",
                        "threshold": 0.5,
                        "silence_duration_ms": 800
                    }
                }
            }))

            async def receive_from_client():
                try:
                    async for message in websocket.iter_text():
                        data = json.loads(message)
                        if data.get("type") == "audio":
                            await azure_ws.send(json.dumps({
                                "type": "input_audio_buffer.append",
                                "audio": data["audio"]
                            }))
                        elif data.get("type") == "commit":
                            await azure_ws.send(json.dumps({
                                "type": "input_audio_buffer.commit"
                            }))
                            await azure_ws.send(json.dumps({
                                "type": "response.create"
                            }))
                        elif data.get("type") == "context":
                            await azure_ws.send(json.dumps({
                                "type": "session.update",
                                "session": {
                                    "instructions": f"""You are an expert AI interviewer for the role of {data.get('job_title')}.
Job Description: {data.get('job_description')}
Difficulty: {data.get('difficulty')}

Candidate Resume:
{data.get('resume_text', 'No resume provided')}

Based on the resume above, ask relevant personalized interview questions. Reference specific projects, skills and experience from their resume. Evaluate answers and adapt difficulty in real time."""
                                }
                            }))
                except Exception as e:
                    print(f"❌ Client error: {e}")

            async def receive_from_azure():
                try:
                    async for message in azure_ws:
                        data = json.loads(message)
                        print(f"Azure message: {data.get('type')}")
                        await websocket.send_text(json.dumps(data))
                except Exception as e:
                    print(f"❌ Azure error: {e}")

            await asyncio.gather(
                receive_from_client(),
                receive_from_azure()
            )

    except Exception as e:
        print(f"❌ Failed to connect to Azure: {type(e).__name__}: {e}")
        await websocket.send_text(json.dumps({"type": "error", "message": str(e)}))
        await websocket.close()

@app.post("/evaluate-interview")
async def evaluate_interview(
    interview_id: int = Form(...),
    conversation: str = Form(...)
):
    from openai import AzureOpenAI
    import re

    client = AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION")
    )

    evaluation_prompt = f"""You are an expert interview evaluator.
Analyze this interview conversation and provide evaluation in this exact JSON format:
{{
    "overall_score": <number 0-100>,
    "grade": "<Excellent/Good/Average/Needs Improvement>",
    "strengths": ["strength1", "strength2", "strength3"],
    "weak_areas": ["weakness1", "weakness2"],
    "question_feedback": [
        {{"question": "...", "answer": "...", "feedback": "...", "score": <0-10>}}
    ],
    "recommended_topics": ["topic1", "topic2"],
    "summary": "<2-3 sentence overall summary>"
}}

Conversation:
{conversation}

Return ONLY the JSON, no extra text."""

    response = client.chat.completions.create(
        model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
        messages=[{"role": "user", "content": evaluation_prompt}],
        max_tokens=2000
    )

    raw = response.choices[0].message.content
    clean = re.sub(r"```json|```", "", raw).strip()
    result = json.loads(clean)

    db = SessionLocal()
    db.add(ChatMessage(
        interview_id=interview_id,
        role="evaluation",
        content=json.dumps(result)
    ))
    db.commit()
    db.close()

    return result