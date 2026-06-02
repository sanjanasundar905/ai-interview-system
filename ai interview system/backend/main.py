from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
import os

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

    db = SessionLocal()
    interview = Interview(
        job_title=job_title,
        job_description=job_description,
        difficulty=difficulty,
        resume_filename=resume.filename
    )
    db.add(interview)
    db.commit()
    db.close()

    return {
        "message": "Interview started and saved!",
        "job_title": job_title,
        "difficulty": difficulty,
        "resume_filename": resume.filename
    }
@app.get("/interviews")
def get_interviews():
    db = SessionLocal()
    interviews = db.query(Interview).all()
    db.close()
    return interviews

class Question(Base):
    __tablename__ = "questions"
    __table_args__ = {"schema": "public"}

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String)
    difficulty = Column(String)  # easy, medium, hard
    question_text = Column(Text)
    expected_keywords = Column(Text)  # comma separated keywords

# Add a question
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

# Get questions by difficulty
@app.get("/questions/{difficulty}")
def get_questions(difficulty: str):
    db = SessionLocal()
    questions = db.query(Question).filter(Question.difficulty == difficulty).all()
    db.close()
    return questions
