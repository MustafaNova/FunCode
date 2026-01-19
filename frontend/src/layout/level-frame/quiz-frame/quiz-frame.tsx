import s from "./quiz-frame.module.scss"
import clsx from 'clsx';

type props = {
    isVisible: boolean
}

export function QuizFrame({isVisible} : props) {

    return (
        <div className={clsx({[s.hidden] : !isVisible})}>
            <div className={s.panel}>
                <div className={s.headerPanel}>
                    <div className={s.logo}>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}