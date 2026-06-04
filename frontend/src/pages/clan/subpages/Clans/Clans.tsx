import s from './clans.module.scss';

export function Clans() {
    return (
        <div className={s.clansTab}>
            <div className={s.infoBox}>
                <span>Create or join a clan for:</span>
                <span>Clan chat, clan battles and friendly matches with clanmates!</span>
                <span>Here are some clan recommendations for you:</span>
            </div>
            <input/>
            <div className={s.clans}>
                <div>
                    <span>Clan 1</span>
                    <span> 3/20</span>
                </div>
                <div>
                    <span>Clan 2</span>
                    <span> 5/20</span>
                </div>
                <div>
                    <span>Clan 3</span>
                    <span> 7/20</span>
                </div>
            </div>
        </div>
    )
}