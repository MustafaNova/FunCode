import "./bottomBar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSchool,
    faTrophy,
    faPen,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

type TabName = "school" | "arena" | "practice" | "clan"

export function BottomBar() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<TabName>("school")
    const tabs = [
        {name: "school", icon: faSchool, path: ""},
        {name: "arena", icon: faTrophy, path: "arena"},
        {name: "practice", icon: faPen, path: "practice"},
        {name: "clan", icon: faUser, path: "clan"}
    ]

    function handleClick(tab: TabName, path: string) {
        setActiveTab(tab)
        navigate(path)
    }

    return (
        <div className="bottom-bar">
            {tabs.map(tab => (
                    <button
                        className={`section ${activeTab === tab.name ? "selected" : ""}`}
                        onClick={() => handleClick(tab.name as TabName, tab.path)}>
                        <FontAwesomeIcon icon={tab.icon} className={`icon ${activeTab === tab.name ? "selected" : ""}`}/>
                        <span>{tab.name}</span>
                    </button>
                )
            )}
        </div>
    )

}