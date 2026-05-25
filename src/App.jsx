import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0a0a0a",
  nav: "#111111",
  card: "#111111",
  input: "#161616",
  border: "#222222",
  border2: "#2a2a2a",
  blue: "#185FA5",
  blueLight: "#5ba3e0",
  blueBg: "#0d2d4a",
  green: "#4fc38a",
  greenBg: "#0e1f0a",
  greenBorder: "#3B6D11",
  amber: "#f0a832",
  amberBg: "#1f1500",
  amberBorder: "#854F0B",
  red: "#f07070",
  redBg: "#1f0808",
  redBorder: "#791F1F",
  text: "#f0f0f0",
  muted: "#777",
  dim: "#666",
  hint: "#444",
};

function Nav() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 32px", background: COLORS.nav,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 600, color: COLORS.text, textDecoration: "none" }}>
        <div style={{ width: 30, height: 30, background: COLORS.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ti ti-microphone" style={{ color: "#fff", fontSize: 17 }} />
        </div>
        Interview AI
      </a>
      <span style={{ fontSize: 12, background: COLORS.blueBg, color: COLORS.blueLight, padding: "3px 11px", borderRadius: 20, fontWeight: 500, border: `1px solid #1a4a72` }}>
        Beta
      </span>
    </nav>
  );
}

function Tabs({ screen, setScreen }) {
  return (
    <div style={{
      display: "flex", gap: 6, padding: "12px 32px 0",
      background: COLORS.nav, borderBottom: `1px solid ${COLORS.border}`,
    }}>
      {["1 — Setup", "2 — Connecting", "3 — Interview"].map((label, i) => {
        const active = screen === i + 1;
        return (
          <button key={i} onClick={() => setScreen(i + 1)} style={{
            fontSize: 12, padding: "6px 16px",
            borderRadius: "6px 6px 0 0",
            border: active ? `1px solid #333` : "1px solid transparent",
            borderBottom: "none",
            cursor: "pointer",
            color: active ? COLORS.blueLight : "#666",
            background: "transparent", fontWeight: 500,
            fontFamily: "Inter, sans-serif",
          }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ── SCREEN 1 ── */
function SetupScreen({ onStart }) {

  const [diff, setDiff] = useState("med");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const diffConfig = {
    easy: { label: "Easy", icon: "ti-leaf", sel: "sel-easy", activeBg: COLORS.greenBg, activeBorder: COLORS.greenBorder, activeColor: "#7ec84a" },
    med:  { label: "Medium", icon: "ti-flame", sel: "sel-med", activeBg: COLORS.amberBg, activeBorder: COLORS.amberBorder, activeColor: COLORS.amber },
    hard: { label: "Hard", icon: "ti-bolt", sel: "sel-hard", activeBg: COLORS.redBg, activeBorder: COLORS.redBorder, activeColor: COLORS.red },
  };

  const inputStyle = {
    width: "100%", padding: "9px 13px", fontSize: 14, fontFamily: "Inter, sans-serif",
    border: `1px solid ${COLORS.border2}`, borderRadius: 8,
    background: COLORS.input, color: COLORS.text, outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: COLORS.bg }}>
      <div style={{ textAlign: "center", padding: "44px 32px 28px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12,
          color: COLORS.blueLight, background: COLORS.blueBg, padding: "4px 13px",
          borderRadius: 20, marginBottom: 16, fontWeight: 500, border: "1px solid #1a4a72",
        }}>
          <i className="ti ti-sparkles" aria-hidden="true" /> Powered by voice AI
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, lineHeight: 1.35, marginBottom: 10 }}>
          Practice your interview with AI
        </h1>
        <p style={{ fontSize: 14, color: COLORS.muted, maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
          Upload your resume — our AI interviewer calibrates difficulty in real time
        </p>
      </div>

      <div style={{
        maxWidth: 580, margin: "0 auto 44px", padding: "28px 32px",
        background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14,
      }}>
        {/* Job Title */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Job title</label>
          <input className="form-input" type="text" placeholder="e.g. Senior Frontend Engineer"
            value = {jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
        
            
   
            
            style={inputStyle} />
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Job description</label>
          <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 88, lineHeight: 1.55 }}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
           />
        </div>

      
<div style={{ marginBottom: 18 }}>
  <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>
    Upload resume
  </label>

  <label
    style={{
      border: `1.5px dashed ${resume ? COLORS.blue : COLORS.border2}`,
      borderRadius: 8,
      padding: "22px 16px",
      textAlign: "center",
      cursor: "pointer",
      background: resume ? "#0d1f2e" : COLORS.input,
      color: resume ? COLORS.blueLight : COLORS.dim,
      fontSize: 13,
      display: "block"
    }}
  >
    <i
      className={`ti ${resume ? "ti-circle-check" : "ti-file-upload"}`}
      style={{ fontSize: 26, display: "block", marginBottom: 7, color: resume ? COLORS.green : COLORS.blue }}
      aria-hidden="true"
    />
    {resume ? resume.name : "Drop your resume here or click to browse"}
    <div style={{ fontSize: 11, color: COLORS.hint, marginTop: 4 }}>
      {resume ? "Click to replace" : "PDF or DOCX · Max 5MB"}
    </div>
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      style={{ display: "none" }}
      onChange={(e) => {
        const file = e.target.files[0];
        console.log("file selected:", file);
        setResume(file);
      }}
    />
  </label>
</div>


        {/* Difficulty */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6, display: "block" }}>Difficulty level</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {Object.entries(diffConfig).map(([key, cfg]) => {
              const active = diff === key;
              return (
                <button key={key} onClick={() => setDiff(key)} style={{
                  padding: "10px 6px", textAlign: "center", fontSize: 13, fontWeight: 500,
                  border: `1px solid ${active ? cfg.activeBorder : COLORS.border2}`,
                  borderRadius: 8, cursor: "pointer",
                  background: active ? cfg.activeBg : COLORS.input,
                  color: active ? cfg.activeColor : "#666",
                  fontFamily: "Inter, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <i className={`ti ${cfg.icon}`} aria-hidden="true" /> {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        
        {/* Start */}
<button onClick={async () => { alert("button clicked!");
  if (!jobTitle || !jobDescription || !resume) {
    alert("Please fill all fields and upload a resume!");
    return;
  }
  const formData = new FormData();
  formData.append("job_title", jobTitle);
  formData.append("job_description", jobDescription);
  formData.append("difficulty", diff);
  formData.append("resume", resume);

  try {
    const res = await fetch("http://127.0.0.1:8000/start-interview", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    onStart();
  } catch (err) {
    console.error("Error:", err);
    alert("Backend not reachable. Is FastAPI running?");
  }
}} style={{
  width: "100%", padding: 13, fontSize: 15, fontWeight: 600,
  fontFamily: "Inter, sans-serif",
  background: COLORS.blue, color: "#fff", border: "none",
  borderRadius: 9, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  marginTop: 8,
}}>
  <i className="ti ti-player-play" aria-hidden="true" /> Start interview
</button>
      </div>

      <style>{`
        .form-input:focus { border-color: #185FA5 !important; box-shadow: 0 0 0 3px rgba(24,95,165,0.2); }
        .form-input::placeholder { color: #444; }
      `}</style>
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
    done:    { color: "#4fc38a", icon: "ti-circle-check" },
    running: { color: COLORS.blueLight, icon: "ti-loader-2", spin: true },
    pending: { color: "#333", icon: "ti-circle-dashed" },
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: 460, padding: 40, background: COLORS.bg,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        border: `3px solid #1a1a1a`, borderTopColor: COLORS.blue,
        animation: "spin 0.9s linear infinite", marginBottom: 32,
      }} />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 19, fontWeight: 600, color: COLORS.text, marginBottom: 7 }}>
          Setting up your interview…
        </h2>
        <p style={{ fontSize: 14, color: COLORS.dim, marginBottom: 28 }}>This usually takes a few seconds</p>
        <ul style={{ listStyle: "none", textAlign: "left", display: "inline-block", padding: 0 }}>
          {steps.map((step, i) => {
            const s = stateStyles[step.state];
            return (
              <li key={i} style={{ fontSize: 13, padding: "6px 0", display: "flex", alignItems: "center", gap: 10, fontWeight: 500, color: s.color }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 17, color: s.color, animation: s.spin ? "spin 0.9s linear infinite" : "none", display: "inline-block" }} aria-hidden="true" />
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
function InterviewScreen() {
  const waveHeights = [14, 26, 40, 30, 44, 34, 20, 36, 26, 18, 32, 22];
  const waveDelays  = [0, 0.1, 0.2, 0.3, 0.15, 0.25, 0.05, 0.35, 0.2, 0.1, 0.3, 0.15];

  return (
    <div style={{ background: COLORS.bg }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 340px",
        background: COLORS.card, border: `1px solid ${COLORS.border}`,
        borderRadius: 14, margin: "24px 28px", overflow: "hidden", minHeight: 460,
      }}>

        {/* Voice Panel */}
        <div style={{
          padding: "36px 28px", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          borderRight: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{
              width: 92, height: 92, borderRadius: "50%",
              background: COLORS.blueBg, border: `3px solid ${COLORS.blue}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="ti ti-robot" style={{ fontSize: 40, color: COLORS.blueLight }} aria-hidden="true" />
            </div>
            <div style={{
              position: "absolute", bottom: 4, right: 4,
              width: 18, height: 18, borderRadius: "50%",
              background: "#1D9E75", border: `2.5px solid ${COLORS.card}`,
              animation: "pdot 1.2s ease-in-out infinite",
            }} />
          </div>

          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>AI Interviewer</div>
          <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 500, display: "flex", alignItems: "center", gap: 5, marginBottom: 26 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.green, display: "inline-block", animation: "pdot 1.2s ease-in-out infinite" }} />
            Speaking…
          </div>

          {/* Waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, height: 52, marginBottom: 30 }}>
            {waveHeights.map((h, i) => (
              <div key={i} style={{
                width: 4, borderRadius: 3, background: "#378ADD", opacity: 0.8,
                height: h, animation: `wave 1.2s ease-in-out infinite`,
                animationDelay: `${waveDelays[i]}s`,
              }} />
            ))}
          </div>

          {/* Mic button */}
          <button style={{
            width: 52, height: 52, borderRadius: "50%",
            background: COLORS.blue, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 10,
          }}>
            <i className="ti ti-microphone" style={{ fontSize: 22, color: "#fff" }} aria-label="Mute microphone" />
          </button>
          <span style={{ fontSize: 12, color: COLORS.dim }}>Tap to mute</span>
        </div>

        {/* Transcript Panel */}
        <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-align-left" style={{ color: COLORS.blueLight, fontSize: 15 }} aria-hidden="true" /> Live transcript
            </span>
            <small style={{ fontSize: 11, color: COLORS.hint }}>Auto-scroll on</small>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { role: "ai", who: "AI Interviewer", text: "Hi! Thanks for joining today. I've reviewed your resume and the job description. Let's get started — can you walk me through your experience with React and how you've used it in production?" },
              { role: "user", who: "You", text: "Sure! I've been working with React for about 4 years. Most recently at my current company I led a migration from a legacy AngularJS app to React with TypeScript…" },
              { role: "ai", who: "AI Interviewer", text: "That's great experience. What were the biggest challenges you faced during that migration", cursor: true },
            ].map((msg, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 5, color: msg.role === "ai" ? COLORS.blueLight : COLORS.green }}>
                  {msg.who}
                </div>
                <div style={{
                  padding: "10px 13px", borderRadius: 9, fontSize: 13, lineHeight: 1.6,
                  background: msg.role === "ai" ? COLORS.blueBg : "#1a1a1a",
                  color: msg.role === "ai" ? "#a8cff0" : "#ccc",
                }}>
                  {msg.text}
                  {msg.cursor && (
                    <span style={{
                      display: "inline-block", width: 2, height: 13,
                      background: COLORS.blueLight, marginLeft: 2, verticalAlign: "middle",
                      animation: "blink 0.8s step-end infinite",
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div style={{
        padding: "12px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0e0e0e", margin: "0 28px 24px",
        borderRadius: "0 0 14px 14px",
        border: `1px solid ${COLORS.border}`, borderTop: "none", marginTop: -1,
      }}>
        {[
          { icon: "ti-clock", text: "4:32", color: "#555" },
          { icon: "ti-flame", text: "Medium difficulty", color: "#555", iconColor: COLORS.amber },
          { icon: "ti-user", text: "Senior Frontend Engineer", color: "#555" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: item.color, fontWeight: 500 }}>
            <i className={`ti ${item.icon}`} style={{ fontSize: 14, color: item.iconColor || item.color }} aria-hidden="true" />
            {item.text}
          </div>
        ))}
        <button style={{
          fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 500,
          padding: "6px 14px", borderRadius: 7,
          border: `1px solid #5a1f1f`, color: COLORS.red,
          background: "transparent", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <i className="ti ti-square-x" aria-hidden="true" /> End interview
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

/* ── ROOT ── */
export default function App() {
  const [screen, setScreen] = useState(1);

  function handleStart() {
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
      {screen === 3 && <InterviewScreen />}
    </div>
  );
}
