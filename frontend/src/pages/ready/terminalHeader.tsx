import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import s from './ready.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TerminalHeader({ title, icon }: { title: string; icon: typeof faTerminal }) {
    return (
        <div className={s.terminalHeader}>
            <div className={s.windowDots}>
                <span />
                <span />
                <span />
            </div>
            <div className={s.terminalTitle}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </div>
        </div>
    );
}