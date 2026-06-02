import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0a", nav: "#111111", card: "#111111", input: "#161616",
  border: "#222222", border2: "#2a2a2a", blue: "#185FA5", blueLight: "#5ba3e0",
  blueBg: "#0d2d4a", green: "#4fc38a", greenBg: "#0e1f0a", greenBorder: "#3B6D11",
  amber: "#f0a832", amberBg: "#1f1500", amberBorder: "#854F0B",
  red: "#f07070", redBg: "#1f0808", redBorder: "#791F1F",
  text: "#f0f0f0", muted: "#777", dim: "#666", hint: "#444",
};

function Nav() {
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", background: COLORS.nav, borderBottom: `1px solid ${COLORS.border}` }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 600, color: COLORS.text, textDecoration: "none" }}>
        <div style={{ width: 30, height: 30, background: COLORS.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ti ti-microphone" style={{ color: "#fff", fontSize: 17 }} />
        </div>
        Interview AI
      </a>
      <span style={{ fontSize: 12, background: COLORS.blueBg, color: COLORS.blueLight, padding: "3px 11px", borderRadius: 20, fontWeight: 500, border: `1px solid #1a4a72` }}>Beta</span>
    </nav>
  );
}

/* ── SCREEN 1 ── */
function SetupScreen({ onStart }) {
  const [diff, setDiff] = useState("med");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const diffConfig = {
    easy: { label: "Easy", icon: "ti-leaf", activeBg: COLORS.greenBg, activeBorder: COLORS.greenBorder, activeColor: "#7ec84a" },
    med:  { label: "Medium", icon: "ti-flame", activeBg: COLORS.amberBg, activeBorder: COLORS.amberBorder, activeColor: COLORS.amber },
    hard: { label: "Hard", icon: "ti-bolt", activeBg: COLORS.redBg, activeBorder: COLORS.redBorder, activeColor: COLORS.red },
  };

  const inputStyle = {
    width: "100%", padding: "9px 13px", fontSize: 14, fontFamily: "Inter, sans-serif",
    border: `1px solid ${COLORS.border2}`, borderRadius: 8,
    background: COLORS.input, color: COLORS.text, outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ background: COLORS.bg }}>
      <div style={{ textAlign: "center", padding: "44px 32px 28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.blueLight, background: COLORS.blueBg, padding: "4px 13px", borderRadius: 20, marginBottom: 16, fontWeight: 500, border: "1px solid #1a4a72" }}>
          <i className="ti ti-sparkles" /> Powered by voice AI
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, lineHeight: 1.35, marginBottom: 10 }}>Practice your interview with AI</h1>
        <p style={{ fontSize: 14, color: COLORS.muted, maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>Upload your resume — our AI interviewer calibrates difficulty in real time</p>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto 44px", padding: "28px 32px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Job title</label>
          <input className="form-input" type="text" placeholder="e.g. Senior Frontend Engineer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Job description</label>
          <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 88, lineHeight: 1.55 }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Upload resume</label>
          <label style={{ border: `1.5px dashed ${resume ? COLORS.blue : COLORS.border2}`, borderRadius: 8, padding: "22px 16px", textAlign: "center", cursor: "pointer", background: resume ? "#0d1f2e" : COLORS.input, color: resume ? COLORS.blueLight : COLORS.dim, fontSize: 13, display: "block" }}>
            <i className={`ti ${resume ? "ti-circle-check" : "ti-file-upload"}`} style={{ fontSize: 26, display: "block", marginBottom: 7, color: resume ? COLORS.green : COLORS.blue }} />
            {resume ? resume.name : "Drop your resume here or click to browse"}
            <div style={{ fontSize: 11, color: COLORS.hint, marginTop: 4 }}>{resume ? "Click to replace" : "PDF or DOCX · Max 5MB"}</div>
            <input type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => { const file = e.target.files[0]; if (file) setResume(file); }} />
          </label>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Difficulty level</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {Object.entries(diffConfig).map(([key, cfg]) => {
              const active = diff === key;
              return (
                <button key={key} onClick={() => setDiff(key)} style={{ padding: "10px 6px", textAlign: "center", fontSize: 13, fontWeight: 500, border: `1px solid ${active ? cfg.activeBorder : COLORS.border2}`, borderRadius: 8, cursor: "pointer", background: active ? cfg.activeBg : COLORS.input, color: active ? cfg.activeColor : "#666", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <i className={`ti ${cfg.icon}`} /> {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={async () => {
          if (!jobTitle || !jobDescription || !resume) { alert("Please fill all fields and upload a resume!"); return; }
          const formData = new FormData();
          formData.append("job_title", jobTitle);
          formData.append("job_description", jobDescription);
          const diffMap = { easy: "easy", med: "medium", hard: "hard" };
          formData.append("difficulty", diffMap[diff]);
          formData.append("resume", resume);
          try {
            const res = await fetch("http://127.0.0.1:8000/start-interview", { method: "POST", body: formData });
            const data = await res.json();
            onStart(data);
          } catch (err) {
            alert("Backend not reachable. Is FastAPI running?");
          }
        }} style={{ width: "100%", padding: 13, fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif", background: COLORS.blue, color: "#fff", border: "none", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
          <i className="ti ti-player-play" /> Start interview
        </button>
      </div>
      <style>{`.form-input:focus { border-color: #185FA5 !important; box-shadow: 0 0 0 3px rgba(24,95,165,0.2); }`}</style>
    </div>
  );
}

/* ── SCREEN 2 ── */
function LoadingScreen() {
  const steps = [
    { label: "Analysing job description", state: "done" },
    { label: "Parsing resume", state: "done" },
    { label: "Generating interview questions", state: "running" },
    { label: "Activating voice agent", state: "pending" },
  ];
  const stateStyles = {
    done: { color: "#4fc38a", icon: "ti-circle-check" },
    running: { color: COLORS.blueLight, icon: "ti-loader-2", spin: true },
    pending: { color: "#333", icon: "ti-circle-dashed" },
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 460, padding: 40, background: COLORS.bg }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid #1a1a1a`, borderTopColor: COLORS.blue, animation: "spin 0.9s linear infinite", marginBottom: 32 }} />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 19, fontWeight: 600, color: COLORS.text, marginBottom: 7 }}>Setting up your interview…</h2>
        <p style={{ fontSize: 14, color: COLORS.dim, marginBottom: 28 }}>This usually takes a few seconds</p>
        <ul style={{ listStyle: "none", textAlign: "left", display: "inline-block", padding: 0 }}>
          {steps.map((step, i) => {
            const s = stateStyles[step.state];
            return (
              <li key={i} style={{ fontSize: 13, padding: "6px 0", display: "flex", alignItems: "center", gap: 10, fontWeight: 500, color: s.color }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 17, color: s.color, animation: s.spin ? "spin 0.9s linear infinite" : "none", display: "inline-block" }} />
                {step.label}
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── SCREEN 3 ── */
function InterviewScreen({ data, onEnd, onMessagesUpdate }) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    connectWebSocket();
    return () => { if (wsRef.current) wsRef.current.close(); };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (onMessagesUpdate) onMessagesUpdate(messages);
  }, [messages]);

  function connectWebSocket() {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/interview");
    wsRef.current = ws;
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: "context",
        job_title: data?.job_title,
        job_description: data?.job_description,
        difficulty: data?.difficulty,
        resume_text: data?.resume_text || ""
      }));
    };
    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "response.audio.delta") { playAudio(msg.delta); setIsSpeaking(true); }
      if (msg.type === "response.audio.done") { setIsSpeaking(false); }
      if (msg.type === "response.audio_transcript.delta") {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === "ai" && last.streaming) return [...prev.slice(0, -1), { ...last, text: last.text + msg.delta }];
          return [...prev, { role: "ai", who: "AI Interviewer", text: msg.delta, streaming: true }];
        });
      }
      if (msg.type === "response.done") {
        setIsSpeaking(false);
        setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, streaming: false } : m));
      }
      if (msg.type === "conversation.item.input_audio_transcription.completed") {
        setMessages(prev => [...prev, { role: "user", who: "You", text: msg.transcript }]);
      }
    };
    ws.onclose = () => setIsConnected(false);
    ws.onerror = (e) => console.error("WebSocket error:", e);
  }

  async function playAudio(base64Audio) {
    if (!audioContextRef.current) audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    const ctx = audioContextRef.current;
    const binary = atob(base64Audio);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const buffer = ctx.createBuffer(1, bytes.length / 2, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < channelData.length; i++) {
      const lo = bytes[i * 2], hi = bytes[i * 2 + 1];
      const val = (hi << 8) | lo;
      channelData[i] = val >= 32768 ? (val - 65536) / 32768 : val / 32768;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ctx = new AudioContext({ sampleRate: 24000 });
    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    source.connect(processor);
    processor.connect(ctx.destination);
    processor.onaudioprocess = (e) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const input = e.inputBuffer.getChannelData(0);
        const pcm = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) pcm[i] = Math.max(-32768, Math.min(32767, input[i] * 32768));
        const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm.buffer)));
        wsRef.current.send(JSON.stringify({ type: "audio", audio: base64 }));
      }
    };
    mediaRecorderRef.current = { stream, ctx, processor };
    setIsRecording(true);
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.processor.disconnect();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      mediaRecorderRef.current = null;
    }
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: "commit" }));
    setIsRecording(false);
  }

  return (
    <div style={{ background: COLORS.bg }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, margin: "24px 28px", overflow: "hidden", minHeight: 460 }}>
        <div style={{ padding: "36px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${COLORS.border}` }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ width: 92, height: 92, borderRadius: "50%", background: COLORS.blueBg, border: `3px solid ${isSpeaking ? COLORS.green : COLORS.blue}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.3s" }}>
              <i className="ti ti-robot" style={{ fontSize: 40, color: COLORS.blueLight }} />
            </div>
            <div style={{ position: "absolute", bottom: 4, right: 4, width: 18, height: 18, borderRadius: "50%", background: isConnected ? "#1D9E75" : "#666", border: `2.5px solid ${COLORS.card}`, animation: "pdot 1.2s ease-in-out infinite" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>AI Interviewer</div>
          <div style={{ fontSize: 12, color: isSpeaking ? COLORS.green : COLORS.dim, fontWeight: 500, display: "flex", alignItems: "center", gap: 5, marginBottom: 26 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: isSpeaking ? COLORS.green : COLORS.dim, display: "inline-block" }} />
            {isSpeaking ? "Speaking..." : isConnected ? "Listening..." : "Connecting..."}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, height: 52, marginBottom: 30 }}>
            {[14,26,40,30,44,34,20,36,26,18,32,22].map((h, i) => (
              <div key={i} style={{ width: 4, borderRadius: 3, background: isRecording ? COLORS.green : "#378ADD", opacity: 0.8, height: h, animation: `wave 1.2s ease-in-out infinite`, animationDelay: `${[0,0.1,0.2,0.3,0.15,0.25,0.05,0.35,0.2,0.1,0.3,0.15][i]}s` }} />
            ))}
          </div>
          <button onMouseDown={startRecording} onMouseUp={stopRecording} onTouchStart={startRecording} onTouchEnd={stopRecording} style={{ width: 72, height: 72, borderRadius: "50%", background: isRecording ? COLORS.green : COLORS.blue, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, transition: "background 0.2s", boxShadow: isRecording ? `0 0 20px ${COLORS.green}` : "none" }}>
            <i className="ti ti-microphone" style={{ fontSize: 28, color: "#fff" }} />
          </button>
          <span style={{ fontSize: 12, color: COLORS.dim }}>{isRecording ? "Release to send" : "Hold to speak"}</span>
          <div style={{ fontSize: 11, color: COLORS.hint, marginTop: 16 }}>{isConnected ? "✅ Connected to AI" : "⏳ Connecting..."}</div>
        </div>

        <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-align-left" style={{ color: COLORS.blueLight, fontSize: 15 }} /> Live transcript
            </span>
            <small style={{ fontSize: 11, color: COLORS.hint }}>Auto-scroll on</small>
          </div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.length === 0 && <div style={{ fontSize: 13, color: COLORS.dim, textAlign: "center", marginTop: 20 }}>Hold the mic button and speak...</div>}
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 5, color: msg.role === "ai" ? COLORS.blueLight : COLORS.green }}>{msg.who}</div>
                <div style={{ padding: "10px 13px", borderRadius: 9, fontSize: 13, lineHeight: 1.6, background: msg.role === "ai" ? COLORS.blueBg : "#1a1a1a", color: msg.role === "ai" ? "#a8cff0" : "#ccc" }}>
                  {msg.text}
                  {msg.streaming && <span style={{ display: "inline-block", width: 2, height: 13, background: COLORS.blueLight, marginLeft: 2, verticalAlign: "middle", animation: "blink 0.8s step-end infinite" }} />}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0e0e0e", margin: "0 28px 24px", borderRadius: "0 0 14px 14px", border: `1px solid ${COLORS.border}`, borderTop: "none", marginTop: -1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", fontWeight: 500 }}>
          <i className="ti ti-user" style={{ fontSize: 14 }} /> {data?.job_title || "Interview"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", fontWeight: 500 }}>
          <i className="ti ti-flame" style={{ fontSize: 14, color: COLORS.amber }} /> {data?.difficulty} difficulty
        </div>
        <button onClick={onEnd} style={{ fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 500, padding: "6px 14px", borderRadius: 7, border: `1px solid #5a1f1f`, color: COLORS.red, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <i className="ti ti-square-x" /> End interview
        </button>
      </div>
      <style>{`
        @keyframes pdot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.35);opacity:0.7} }
        @keyframes wave { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── SCREEN 4 — FEEDBACK ── */
function FeedbackScreen({ data, messages, onRestart }) {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { evaluateInterview(); }, []);

  async function evaluateInterview() {
    const conversation = messages.map(m => `${m.role === "ai" ? "Q" : "A"}: ${m.text}`).join("\n");
    const formData = new FormData();
    formData.append("interview_id", data?.interview_id || 1);
    formData.append("conversation", conversation || "No conversation recorded.");
    try {
      const res = await fetch("http://127.0.0.1:8000/evaluate-interview", { method: "POST", body: formData });
      const result = await res.json();
      setEvaluation(result);
    } catch (err) {
      setEvaluation({ overall_score: 0, grade: "Error", strengths: [], weak_areas: ["Could not evaluate"], question_feedback: [], recommended_topics: [], summary: "Evaluation failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: COLORS.text }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid #1a1a1a`, borderTopColor: COLORS.blue, animation: "spin 0.9s linear infinite", margin: "0 auto 20px" }} />
        <p>AI is evaluating your interview...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "40px 28px" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.greenBg, border: `2px solid ${COLORS.green}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <i className="ti ti-trophy" style={{ fontSize: 28, color: COLORS.green }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Interview Complete!</h2>
          <p style={{ fontSize: 14, color: COLORS.muted }}>Here's your AI-powered evaluation</p>
        </div>

        <div style={{ background: COLORS.blueBg, border: `1px solid #1a4a72`, borderRadius: 10, padding: "20px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.blueLight }}>{evaluation?.overall_score}%</div>
          <div style={{ fontSize: 16, color: "#a8cff0", fontWeight: 500 }}>{evaluation?.grade}</div>
          <div style={{ fontSize: 13, color: COLORS.dim, marginTop: 8 }}>{evaluation?.summary}</div>
        </div>

        <div style={{ background: COLORS.greenBg, border: `1px solid ${COLORS.greenBorder}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.green, marginBottom: 10 }}>✅ STRENGTHS</div>
          {evaluation?.strengths?.map((s, i) => <div key={i} style={{ fontSize: 13, color: "#b0e0b0", marginBottom: 4 }}>• {s}</div>)}
        </div>

        <div style={{ background: COLORS.amberBg, border: `1px solid ${COLORS.amberBorder}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.amber, marginBottom: 10 }}>⚠️ AREAS TO IMPROVE</div>
          {evaluation?.weak_areas?.map((w, i) => <div key={i} style={{ fontSize: 13, color: "#f0c070", marginBottom: 4 }}>• {w}</div>)}
        </div>

        {evaluation?.question_feedback?.length > 0 && (
          <div style={{ background: "#111", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 10 }}>📝 QUESTION FEEDBACK</div>
            {evaluation.question_feedback.map((qf, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < evaluation.question_feedback.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>Q: {qf.question}</div>
                <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 4 }}>Your answer: {qf.answer}</div>
                <div style={{ fontSize: 12, color: COLORS.blueLight }}>💡 {qf.feedback}</div>
                <div style={{ fontSize: 11, color: COLORS.amber, marginTop: 4 }}>Score: {qf.score}/10</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: COLORS.redBg, border: `1px solid ${COLORS.redBorder}`, borderRadius: 10, padding: "16px 20px", marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.red, marginBottom: 10 }}>📚 RECOMMENDED TOPICS</div>
          {evaluation?.recommended_topics?.map((t, i) => <div key={i} style={{ fontSize: 13, color: "#f0a0a0", marginBottom: 4 }}>• {t}</div>)}
        </div>

        <button onClick={onRestart} style={{ width: "100%", padding: 13, fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif", background: COLORS.blue, color: "#fff", border: "none", borderRadius: 9, cursor: "pointer" }}>
          Start New Interview
        </button>
      </div>
    </div>
  );
}

/* ── ROOT ── */
export default function App() {
  const [screen, setScreen] = useState(1);
  const [interviewData, setInterviewData] = useState(null);
  const [interviewMessages, setInterviewMessages] = useState([]);

  function handleStart(data) {
    setInterviewData(data);
    setScreen(2);
    setTimeout(() => setScreen(3), 2800);
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: COLORS.bg, color: COLORS.text, minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
      <Nav />
      {screen === 1 && <SetupScreen onStart={handleStart} />}
      {screen === 2 && <LoadingScreen />}
      {screen === 3 && <InterviewScreen data={interviewData} onEnd={() => setScreen(4)} onMessagesUpdate={setInterviewMessages} />}
      {screen === 4 && <FeedbackScreen data={interviewData} messages={interviewMessages} onRestart={() => setScreen(1)} />}
    </div>
  );
}

