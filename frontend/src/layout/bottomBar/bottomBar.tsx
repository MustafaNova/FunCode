import "./bottomBar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { getActiveTab, type TabName, tabs } from './configs.ts';

export function BottomBar() {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const activeTab = getActiveTab(pathname);

    function handleClick(tab: TabName, path: string) {
        if (tab === activeTab) return;
        navigate(path)
    }

    return (
        <div className="bottom-bar">
            {tabs.map(tab => (
                    <button
                        key={tab.name}
                        className={`section ${activeTab === tab.name ? "selected" : ""}`}
                        onClick={() => handleClick(tab.name as TabName, tab.path)}>
                        <FontAwesomeIcon icon={tab.icon} className="icon"/>
                        <span className="label">{tab.name}</span>
                    </button>
                )
            )}
        </div>
    )

}
