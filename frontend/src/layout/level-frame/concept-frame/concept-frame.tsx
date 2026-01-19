import  s from "./concept-frame.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faBrain, faCar } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
type props = {
    isVisible: boolean
}

export function ConceptFrame({isVisible} : props) {

    return (
        <div className={clsx(s.conceptComponent, {
            [s.hidden] : !isVisible
        })}>
            <section className={s.panel}>
                <div className={s.introduction}>
                    <div>
                        <FontAwesomeIcon icon={faHtml5} className={s.htmlIcon} />
                    </div>
                    <div>
                        <p className={s.title}>Was passiert im Browser ?</p>
                        <span className={s.muted}>
                          Nicht als Fließtext – sondern in Blöcken mit kleinen Visuals.
                          Scanne es schnell und merke dir den Ablauf.
                        </span>
                    </div>
                </div>
            </section>
            <section className={s.blocks}>
                <div className={s.block}>
                    <div className={s.header}>
                        <span className={s.badge}>
                            <FontAwesomeIcon icon={faBrain} />
                            Idee
                        </span>
                        <span className={s.fw700}>Request  →  Response</span>
                    </div>
                    <div className={s.fs15}>
                        Wenn du eine Website öffnest,
                        schickt dein Browser ein <b>Request</b> an einen Server.
                        Der Server antwortet mit einer <b>Response</b> (z.B. HTML, CSS, JavaScript).
                    </div>
                    <div className={s.hint}>
                        Merke: Der Browser ist der „Client“ – der Server liefert die Daten.
                    </div>
                </div>
                <div className={s.media}>
                    <span className={s.visualBadge}>Visual</span>
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
            <section className={s.panel}>
                <div className={s.header}>
                    <span className={s.badge}>
                      <FontAwesomeIcon icon={faCar} />
                      Ablauf
                    </span>
                    <span className={s.fw700}>In 3 Schritten</span>
                </div>
                <div className={s.steps}>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>1</span>
                        </div>
                        <div className={s.fw700}>HTML Laden</div>
                        <div className={s.stepTxt}>
                            Der Browser bekommt das Grundgerüst (Struktur) der Seite.
                        </div>
                    </div>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>2</span>
                        </div>
                        <div className={s.fw700}>HTML Laden</div>
                        <div className={s.stepTxt}>
                            Der Browser bekommt das Grundgerüst (Struktur) der Seite.
                        </div>
                    </div>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>3</span>
                        </div>
                        <div className={s.fw700}>HTML Laden</div>
                        <div className={s.stepTxt}>
                            Der Browser bekommt das Grundgerüst (Struktur) der Seite.
                        </div>
                    </div>
                </div>
            </section>
            <section className={s.blocks}>
                <div className={s.block}>
                    <div className={s.header}>
                        <span className={s.badge}>
                            <FontAwesomeIcon icon={faBrain} />
                            Idee
                        </span>
                        <span className={s.fw700}>Request  →  Response</span>
                    </div>
                    <div className={s.fs15}>
                        Wenn du eine Website öffnest,
                        schickt dein Browser ein <b>Request</b> an einen Server.
                        Der Server antwortet mit einer <b>Response</b> (z.B. HTML, CSS, JavaScript).
                    </div>
                    <div className={s.hint}>
                        Merke: Der Browser ist der „Client“ – der Server liefert die Daten.
                    </div>
                </div>
                <div className={s.media}>
                    <span className={s.visualBadge}>Visual</span>
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
        </div>
    )
}