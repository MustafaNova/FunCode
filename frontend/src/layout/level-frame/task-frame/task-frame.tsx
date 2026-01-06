import "./task-frame.scss"

type props = {
    isVisible: boolean
}

export function TaskFrame({isVisible} : props) {

    return (
        <div className={isVisible ? "" : "hidden"}>
            <h1>task works!</h1>
        </div>
    )
}