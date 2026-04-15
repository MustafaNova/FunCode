import  s from "./concept-frame.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faBrain, faCar } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
type props = {
    isVisible: boolean,
    data: any
}

export function ConceptFrame({isVisible, data} : props) {

    return (
        <div className={clsx(s.conceptComponent, {
            [s.hidden] : !isVisible
        })}>
            <section className={s.panel}>
                <div className={s.introduction}>
                    <div>
                        <FontAwesomeIcon icon={faHtml5} className={s.htmlIcon}/>
                    </div>
                    <div>
                        <p className={s.title} id="title">{data.title}</p>
                        <span className={s.muted} id="subtitle">{data.subtitle}</span>
                    </div>
                </div>
            </section>
            <section className={s.blocks}>
                <div className={s.block}>
                    <div className={s.header}>
                        <span className={s.badge}>
                            <FontAwesomeIcon icon={faBrain} />
                            Unit 1
                        </span>
                        <span className={s.fw700} id="unitOneTitle">{data.unitOneTitle}</span>
                    </div>
                    <div className={s.fs15} id="unitOne">
                        {data.unitOne}
                    </div>
                    <div className={s.hint} id="unitOneNote">
                        {data.unitOneNote}
                    </div>
                </div>
                <div className={s.media}>
                    <span className={s.visualBadge}>Visual</span>
                    <img className={s.img} src={data.visualOne}  alt="Visual" id="visualOne"/>
                </div>
            </section>
            <section className={s.panel}>
                <div className={s.header}>
                    <span className={s.badge} id="keyPointsSubtitle">
                      <FontAwesomeIcon icon={faCar} />
                        {data.keyPointsSubtitle}
                    </span>
                    <span className={s.fw700} id="keyPointsTitle">
                        {data.keyPointsTitle}
                    </span>
                </div>
                <div className={s.steps}>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>1</span>
                        </div>
                        <div className={s.fw700} id="pointOneTitle">
                            {data.pointOneTitle}
                        </div>
                        <div className={s.stepTxt} id="pointOneContent">
                            {data.pointOneContent}
                        </div>
                    </div>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>2</span>
                        </div>
                        <div className={s.fw700} id="pointTwoTitle">
                            {data.pointTwoTitle}
                        </div>
                        <div className={s.stepTxt} id="pointTwoContent">
                            {data.pointTwoContent}
                        </div>
                    </div>
                    <div className={s.panel}>
                        <div>
                            <span className={s.stepNum}>3</span>
                        </div>
                        <div className={s.fw700} id="pointThreeTitle">
                            {data.pointThreeTitle}
                        </div>
                        <div className={s.stepTxt} id="pointThreeContent">
                            {data.pointThreeContent}
                        </div>
                    </div>
                </div>
            </section>
            <section className={s.blocks}>
                <div className={s.block}>
                    <div className={s.header}>
                        <span className={s.badge}>
                            <FontAwesomeIcon icon={faBrain} />
                            Unit 2
                        </span>
                        <span className={s.fw700} id="unitTwoTitle">
                            {data.unitTwoTitle}
                        </span>
                    </div>
                    <div className={s.fs15} id="unitTwoContent">
                        {data.unitTwoContent}
                    </div>
                    <div className={s.hint} id="unitTwoNote">
                        {data.unitTwoNote}
                    </div>
                </div>
                <div className={s.media}>
                    <span className={s.visualBadge}>Visual</span>
                    <img src={data.visualTwo} alt="" id="visualTwo" />
                </div>
            </section>
        </div>
    )
}