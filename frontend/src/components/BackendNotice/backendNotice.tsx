import s from './backendNotice.module.scss';

export function BackendNotice() {
    return (
        <div className={s.notice}>
            <p>
                Our backend runs on a free hosting plan and goes to sleep
                after a period of inactivity. The first request may take
                up to 60 seconds while the server wakes up.
            </p>
        </div>
    );
}