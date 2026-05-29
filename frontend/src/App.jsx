import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
//  DONNÉES GLOBALES (Jobs, Secteurs, Options)
// ═══════════════════════════════════════════════════════════
const JOBS = [
  { id: 1, title: "Développeur Full Stack", company: "TechNova", location: "Paris, France 🇫🇷", type: "CDI", salary: "45 000 – 60 000 €/an", match: 94, tags: ["React", "Node.js", "MongoDB"], logo: "TN", color: "#6C63FF", desc: "Rejoignez une startup en pleine croissance et travaillez sur des produits utilisés par des millions d'utilisateurs." },
  { id: 2, title: "UX/UI Designer", company: "DesignHub", location: "Remote 🌍", type: "Freelance", salary: "400 – 600 €/jour", match: 87, tags: ["Figma", "Prototyping", "Motion"], logo: "DH", color: "#FF6B6B", desc: "Concevez des expériences digitales pour des clients Fortune 500 depuis n'importe où dans le monde." },
  { id: 3, title: "Data Analyst", company: "FinSmart", location: "Dubai, UAE 🇦🇪", type: "Stage", salary: "2 500 $/mois", match: 81, tags: ["Python", "SQL", "PowerBI"], logo: "FS", color: "#00C9A7", desc: "Stage de 6 mois au cœur de la fintech la plus innovante du Moyen-Orient." },
  { id: 4, title: "Chef de Projet IT", company: "GlobalSys", location: "Lomé, Togo 🇹🇬", type: "CDI", salary: "A débattre", match: 78, tags: ["Agile", "Scrum", "Jira"], logo: "GS", color: "#FFBE9F", desc: "Gérez le déploiement de nos nouvelles solutions bancaires en Afrique de l'Ouest." }
];

const SKILL_OPTIONS = ["React", "Node.js", "Python", "SQL", "Figma", "Excel", "Marketing", "Comptabilité", "Java", "Gestion de projet", "Communication", "Design graphique", "DevOps", "Data Science"];
const JOB_TYPES = ["CDI", "CDD", "Stage", "Freelance", "Alternance"];
const ZONES = ["Local", "National", "International", "Remote"];
const avatarColors = ["#6C63FF", "#FF6B6B", "#00C9A7", "#F7B731", "#FF9FF3"];

const QUICK_ACTIONS = [
  { icon: "📄", label: "Améliore mon CV", prompt: "Analyse mon CV et donne-moi 5 conseils concrets pour l'améliorer et décrocher plus d'entretiens." },
  { icon: "🎤", label: "Prépare un entretien", prompt: "Prépare-moi pour un entretien d'embauche. Quelles sont les questions les plus fréquentes ?" },
  { icon: "✉️", label: "Lettre de motivation", prompt: "Aide-moi à rédiger une lettre de motivation percutante pour un poste informatique." },
  { icon: "🌍", label: "Travailler à l'étranger", prompt: "Je veux travailler à l'international. Quels pays offrent les meilleures opportunités ?" }
];

// ═══════════════════════════════════════════════════════════
//  COMPOSANT : FLOW D'INSCRIPTION COMPLET (Multi-étapes)
// ═══════════════════════════════════════════════════════════
function SignupFlow({ onDone }) {
  const [step, setStep] = useState("welcome"); // welcome, account, identity, skills, prefs
  const [form, setForm] = useState({ name: "", email: "", password: "", field: "Informatique", level: "Master 1", skills: [], jobTypes: [], zones: [] });
  const [selColor, setSelColor] = useState(avatarColors[0]);

  const toggleSkill = (s) => setForm(f => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s] }));
  const toggleJobType = (t) => setForm(f => ({ ...f, jobTypes: f.jobTypes.includes(t) ? f.jobTypes.filter(x => x !== t) : [...f.jobTypes, t] }));
  const toggleZone = (z) => setForm(f => ({ ...f, zones: f.zones.includes(z) ? f.zones.filter(x => x !== z) : [...f.zones, z] }));

  if (step === "welcome") {
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:32, textAlign:"center" }}>
        <div style={{ width:80, height:80, borderRadius:24, background:"linear-gradient(135deg, #6C63FF, #FF6B6B)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, marginBottom:24, boxShadow:"0 12px 24px #6C63FF30" }}>🚀</div>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, margin:"0 0 12px", letterSpacing:-1 }}>Trouve ton <span style={{ color:"#6C63FF" }}>Match</span> Pro</h1>
        <p style={{ color:"#94A3B8", fontSize:16, maxWidth:280, margin:"0 0 40px", lineHeight:1.5 }}>Le Tinder du recrutement national & international guidé par Opi IA.</p>
        <button onClick={() => setStep("account")} style={{ width:"100%", maxWidth:280, padding:16, background:"#6C63FF", color:"#FFF", border:"none", borderRadius:16, fontSize:16, fontWeight:600, cursor:"pointer" }}>Créer un compte</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {step === "account" && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Créons tes accès</h2>
          <input type="text" placeholder="Nom complet" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: 16, background: "#1E293B", border: "1px solid #334155", borderRadius:12, color: "#FFF", marginBottom: 16, boxSizing: "border-box" }} />
          <input type="email" placeholder="Adresse Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: 16, background: "#1E293B", border: "1px solid #334155", borderRadius:12, color: "#FFF", marginBottom: 24, boxSizing: "border-box" }} />
          <button onClick={() => setStep("identity")} disabled={!form.name || !form.email} style={{ width: "100%", padding: 16, background: "#6C63FF", borderRadius: 16, border: "none", color: "#FFF", fontWeight: 600, cursor: "pointer" }}>Continuer</button>
        </div>
      )}

      {step === "identity" && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Ton Profil d'Études</h2>
          <input type="text" placeholder="Filière (ex: Génie Informatique)" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })} style={{ width: "100%", padding: 16, background: "#1E293B", border: "1px solid #334155", borderRadius:12, color: "#FFF", marginBottom: 16, boxSizing: "border-box" }} />
          <input type="text" placeholder="Niveau d'études (ex: Master 1)" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} style={{ width: "100%", padding: 16, background: "#1E293B", border: "1px solid #334155", borderRadius:12, color: "#FFF", marginBottom: 24, boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {avatarColors.map(c => <div key={c} onClick={() => setSelColor(c)} style={{ width: 32, height: 32, borderRadius: "50%", background: c, cursor: "pointer", border: selColor === c ? "3px solid #FFF" : "none" }} />)}
          </div>
          <button onClick={() => setStep("skills")} style={{ width: "100%", padding: 16, background: "#6C63FF", borderRadius: 16, border: "none", color: "#FFF", fontWeight: 600 }}>Suivant</button>
        </div>
      )}

      {step === "skills" && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Tes Compétences</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {SKILL_OPTIONS.map(s => (
              <button key={s} onClick={() => toggleSkill(s)} style={{ padding: "10px 14px", background: form.skills.includes(s) ? "#6C63FF" : "#1E293B", border: "1px solid #334155", borderRadius: 20, color: "#FFF", cursor: "pointer" }}>{s}</button>
            ))}
          </div>
          <button onClick={() => setStep("prefs")} style={{ width: "100%", padding: 16, background: "#6C63FF", borderRadius: 16, border: "none", color: "#FFF", fontWeight: 600 }}>Suivant</button>
        </div>
      )}

      {step === "prefs" && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Préférences de Missions</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>Types de contrat :</p>
            {JOB_TYPES.map(t => <button key={t} onClick={() => toggleJobType(t)} style={{ margin: 4, padding: 10, background: form.jobTypes.includes(t) ? "#00C9A7" : "#1E293B", color: "#FFF", border: "none", borderRadius: 8 }}>{t}</button>)}
          </div>
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>Zones géographiques :</p>
            {ZONES.map(z => <button key={z} onClick={() => toggleZone(z)} style={{ margin: 4, padding: 10, background: form.zones.includes(z) ? "#FF6B6B" : "#1E293B", color: "#FFF", border: "none", borderRadius: 8 }}>{z}</button>)}
          </div>
          <button onClick={() => onDone(form, selColor)} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #6C63FF, #9C88FF)", borderRadius: 16, border: "none", color: "#FFF", fontWeight: 700, cursor: "pointer" }}>Terminer l'inscription ⚡</button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMPOSANT : ÉCRAN ANALYSEUR DE CV DÉTAILLÉ
// ═══════════════════════════════════════════════════════════
function CvUploadScreen({ onDone }) {
  const [phase, setPhase] = useState("upload"); // upload, analyzing, result
  const [score, setScore] = useState(0);

  const startAnalysis = () => {
    setPhase("analyzing");
    setTimeout(() => {
      setScore(84);
      setPhase("result");
    }, 2500);
  };

  return (
    <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {phase === "upload" && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Analyse ton CV</h2>
          <p style={{ color: "#94A3B8", marginBottom: 32, fontSize: 14 }}>Opi IA va scanner ton dossier pour maximiser tes recommandations.</p>
          <div onClick={startAnalysis} style={{ height: 200, border: "2px dashed #334155", borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", background: "#1E293B30" }}>
            <span style={{ fontSize: 40, marginBottom: 12 }}>📄</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Dépose ton CV ou clique pour uploader</span>
          </div>
        </div>
      )}

      {phase === "analyzing" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 50, height: 50, border: "4px solid #334155", borderTopColor: "#6C63FF", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ color: "#94A3B8" }}>Opi IA extrait les compétences et calcule la compatibilité internationale...</p>
        </div>
      )}

      {phase === "result" && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ width: 110, height: 110, borderRadius: "50%", background: "#00C9A715", border: "2px solid #00C9A7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#00C9A7", margin: "0 auto 24px" }}>{score}%</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Analyse terminée avec succès !</h3>
          <div style={{ background: "#1E293B", padding: 16, borderRadius: 12, textAlign: "left", marginBottom: 32, fontSize: 13, color: "#94A3B8" }}>
            <p>✅ Mots-clés techniques validés.</p>
            <p>💡 Conseil d'Opi IA : Ajoute tes certifications pour viser plus d'offres à l'international.</p>
          </div>
          <button onClick={() => onDone(score)} style={{ width: "100%", padding: 16, background: "#00C9A7", color: "#FFF", border: "none", borderRadius: 16, fontSize:16, fontWeight: 600, cursor: "pointer" }}>Accéder au Tableau de Bord</button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMPOSANT INTERFACE PRINCIPALE (Matcher + Opi IA + Parcours)
// ═══════════════════════════════════════════════════════════
function MainApp({ userForm, avatarColor, cvScore }) {
  const [tab, setTab] = useState("match"); // match, coach, parcours
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedJobs, setLikedJobs] = useState([]);

  // États Opi IA branchés sur le backend Python Flask
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Salut ${userForm.name} ! Je suis Opi IA, ton coach personnel. Ton profil affiche un excellent potentiel initial de ${cvScore}%. Comment puis-je t'aider à décrocher ton stage ou emploi national ou international aujourd'hui ?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction de messagerie corrigée reliée au serveur Flask
  const sendMsg = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;
    
    const userMsg = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError("Connexion au serveur Opi IA interrompue. Vérifie que le script Python (app.py) est bien démarré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 70px)", justifyContent: "space-between" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        
        {/* ONGLET 1 : TINDER SWIPE MATCH */}
        {tab === "match" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
            {currentIndex < JOBS.length ? (
              <div style={{ width: "100%", maxWidth: 340, background: "#1E293B", borderRadius: 24, padding: 24, border: "1px solid #334155", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: JOBS[currentIndex].color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{JOBS[currentIndex].logo}</div>
                  <span style={{ color: "#00C9A7", background: "#00C9A715", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{JOBS[currentIndex].match}% Match</span>
                </div>
                <h3 style={{ fontSize: 22, margin: "0 0 4px" }}>{JOBS[currentIndex].title}</h3>
                <h4 style={{ fontSize: 14, color: "#94A3B8", margin: "0 0 16px" }}>{JOBS[currentIndex].company} • {JOBS[currentIndex].location}</h4>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>{JOBS[currentIndex].desc}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setCurrentIndex(currentIndex + 1)} style={{ flex: 1, padding: 14, background: "#FF6B6B15", border: "1px solid #FF6B6B", color: "#FF6B6B", borderRadius: 12, cursor: "pointer" }}>✕ Passer</button>
                  <button onClick={() => { setLikedJobs([...likedJobs, JOBS[currentIndex]]); setCurrentIndex(currentIndex + 1); }} style={{ flex: 1, padding: 14, background: "#00C9A715", border: "1px solid #00C9A7", color: "#00C9A7", borderRadius: 12, cursor: "pointer" }}>♥ Matcher</button>
                </div>
              </div>
            ) : (
              <p style={{ color: "#94A3B8" }}>Aucune autre offre pour le moment. Parle à Opi IA pour booster tes opportunités !</p>
            )}
          </div>
        )}

        {/* ONGLET 2 : OPI IA (Messagerie & Actions Rapides) */}
        {tab === "coach" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Suggestions d'actions rapides d'origine */}
            {messages.length === 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {QUICK_ACTIONS.map(act => (
                  <div key={act.label} onClick={() => sendMsg(act.prompt)} style={{ background: "#1E293B", padding: 14, borderRadius: 16, border: "1px solid #334155", cursor: "pointer" }}>
                    <span style={{ fontSize: 18, display: "block", marginBottom: 6 }}>{act.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{act.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Liste des messages du Chat */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#6C63FF" : "#1E293B", padding: 14, borderRadius: 16, maxWidth: "85%", fontSize: 14, lineHeight: 1.4 }}>
                  {m.content}
                </div>
              ))}
              {loading && <p style={{ color: "#94A3B8", fontSize: 12 }}>Opi IA élabore une stratégie...</p>}
              {error && <p style={{ color: "#FF6B6B", fontSize: 12 }}>{error}</p>}
            </div>
          </div>
        )}

        {/* ONGLET 3 : PARCOURS DE SUIVI & COMPTE PRO */}
        {tab === "parcours" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, background: "#1E293B", padding: 16, borderRadius: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20 }}>{userForm.name[0]}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{userForm.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{userForm.field} • {userForm.level}</p>
              </div>
            </div>

            {/* Jauge de complétion du profil d'origine */}
            <div style={{ background: "#1E293B", borderRadius: 16, padding: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                <span>Score de visibilité pro</span>
                <span style={{ color: "#F7B731" }}>{cvScore}%</span>
              </div>
              <div style={{ background: "#334155", borderRadius: 10, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${cvScore}%`, height: "100%", background: "linear-gradient(90deg, #6C63FF, #F7B731)", borderRadius: 10 }} />
              </div>
              <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 8 }}>💡 Ajoute une photo et lie ton LinkedIn pour atteindre 100%.</p>
            </div>

            <h4 style={{ fontSize: 14, color: "#94A3B8", marginBottom: 12 }}>Mes Opportunités Matchées ({likedJobs.length})</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {likedJobs.map((j, i) => (
                <div key={i} style={{ background: "#1E293B", padding: 14, borderRadius: 12, border: "1px solid #334155" }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{j.company} — {j.location}</div>
                </div>
              ))}
              {likedJobs.length === 0 && <p style={{ color: "#475569", fontSize: 13 }}>Swipe à droite sur les offres pour les enregistrer ici.</p>}
            </div>
          </div>
        )}

      </div>

      {/* Zone de saisie (Chat uniquement) et Menu du bas */}
      <div style={{ background: "#0F172A", padding: 20 }}>
        {tab === "coach" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} style={{ flex: 1, padding: 14, background: "#1E293B", border: "1px solid #334155", borderRadius: 12, color: "#FFF", outline: "none" }} placeholder="Demande un conseil à Opi IA..." />
            <button onClick={() => sendMsg()} style={{ padding: "0 20px", background: "#6C63FF", border: "none", borderRadius: 12, color: "#FFF", fontWeight: 600, cursor: "pointer" }}>Envoyer</button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid #1E293B", paddingTop: 12 }}>
          <button onClick={() => setTab("match")} style={{ background: "none", border: "none", color: tab === "match" ? "#6C63FF" : "#94A3B8", fontWeight: 600, cursor: "pointer" }}>🔥 Offres</button>
          <button onClick={() => setTab("coach")} style={{ background: "none", border: "none", color: tab === "coach" ? "#6C63FF" : "#94A3B8", fontWeight: 600, cursor: "pointer" }}>🤖 Opi IA</button>
          <button onClick={() => setTab("parcours")} style={{ background: "none", border: "none", color: tab === "parcours" ? "#6C63FF" : "#94A3B8", fontWeight: 600, cursor: "pointer" }}>📈 Parcours</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome, signup, cv, main
  const [userForm, setUserForm] = useState(null);
  const [avatarColor, setAvatarColor] = useState("#6C63FF");
  const [cvScore, setCvScore] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0F172A", color: "#FFF", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "24px 24px 10px", fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>Oppor<span style={{ color: "#6C63FF" }}>Match</span></div>
      {screen === "welcome" && <SignupFlow onDone={(form, color) => { setUserForm(form); setAvatarColor(color); setScreen("cv"); }} />}
      {screen === "cv" && <CvUploadScreen onDone={(score) => { setCvScore(score); setScreen("main"); }} />}
      {screen === "main" && <MainApp userForm={userForm} avatarColor={avatarColor} cvScore={cvScore} />}
    </div>
  );
}