import "./concept-frame.scss"

type props = {
    isVisible: boolean
}

export function ConceptFrame({isVisible} : props) {


    return (
        <div className={`concept-component ${!isVisible && "hidden"}`}>
            <section className="panel">
                <div className="introduction">
                    <div>
                        <i className="fa-brands fa-html5 icon"></i>
                    </div>
                    <div>
                        <p className="title">Was passiert im Browser ?</p>
                        <span className="muted">
              Nicht als Fließtext – sondern in Blöcken mit kleinen Visuals.
              Scanne es schnell und merke dir den Ablauf.
            </span>
                    </div>
                </div>
            </section>
            <section className="blocks">
                <div className="block">
                    <div className="header">
                        <span className="badge">
                        <i className="fa-solid fa-brain"></i>
                        Idee
                    </span>
                        <span className="fw-700">Request -&gt Response</span>
                    </div>
                    <div className="fs-15">
                        Wenn du eine Website öffnest,
                        schickt dein Browser ein <b>Request</b> an einen Server.
                        Der Server antwortet mit einer <b>Response</b> (z.B. HTML, CSS, JavaScript).
                    </div>
                    <div className="hint">
                        Merke: Der Browser ist der „Client“ – der Server liefert die Daten.
                    </div>
                </div>
                <div className="media">
                    <span className="visual-badge">Visual</span>
                    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop offset="0" stop-color="rgba(124,92,255,0.95)"></stop>
                                <stop offset="1" stop-color="rgba(45,212,191,0.90)"></stop>
                            </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="640" height="360" fill="rgba(0,0,0,0.18)"></rect>
                        <rect x="70" y="120" rx="18" ry="18" width="170" height="120" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)"></rect>
                        <rect x="400" y="110" rx="18" ry="18" width="170" height="140" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)"></rect>
                        <text x="155" y="150" text-anchor="middle" font-family="system-ui" font-size="16" fill="rgba(255,255,255,0.9)">Browser</text>
                        <text x="155" y="175" text-anchor="middle" font-family="system-ui" font-size="12" fill="rgba(255,255,255,0.7)">(Client)</text>
                        <text x="485" y="150" text-anchor="middle" font-family="system-ui" font-size="16" fill="rgba(255,255,255,0.9)">Server</text>
                        <text x="485" y="175" text-anchor="middle" font-family="system-ui" font-size="12" fill="rgba(255,255,255,0.7)">(Antwortet)</text>

                        <path d="M260 150 C 300 120, 340 120, 380 150" fill="none" stroke="url(#g1)" stroke-width="6"></path>
                        <polygon points="380,150 362,140 362,160" fill="rgba(45,212,191,0.9)"></polygon>
                        <text x="320" y="112" text-anchor="middle" font-family="system-ui" font-size="12" fill="rgba(255,255,255,0.75)">Request</text>

                        <path d="M380 210 C 340 240, 300 240, 260 210" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="6"></path>
                        <polygon points="260,210 278,200 278,220" fill="rgba(255,255,255,0.7)"></polygon>
                        <text x="320" y="270" text-anchor="middle" font-family="system-ui" font-size="12" fill="rgba(255,255,255,0.75)">Response</text>
                    </svg>
                </div>
            </section>
            <section className="panel">
                <div className="header">
                    <span className="badge">
                  <i className="fa-solid fa-car"></i>
                  Ablauf
                </span>
                    <span className="fw-700">In 3 Schritten</span>
                </div>
                <div className="steps">
                    <div className="panel">
                        <div>
                            <span className="step-num">1</span>
                        </div>
                        <div className="fw-700">
                            HTML Laden
                        </div>
                        <div className="step-txt">
                            Der Browser bekommt das Grundgerüst (Struktur) der Seite.
                        </div>
                    </div>
                    <div className="panel">
                    </div>
                    <div className="panel">
                    </div>
                </div>
            </section>
            <section></section>
        </div>
    )
}