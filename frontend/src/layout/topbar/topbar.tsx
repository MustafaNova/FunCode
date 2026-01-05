import "./topbar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCoins,
  faFire,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";


export function TopBar() {

  return (
    <div className="topBar">
      <div className="top-buttons">
        <button className="statusBtn">
          <div className="status-content">
            <FontAwesomeIcon icon={faHeart} className="icon"/>
            <span className="icon-num">12</span>
          </div>

        </button>
        <button className="statusBtn">
          <div className="status-content">
            <FontAwesomeIcon icon={faCoins} className="icon" />
            <span className="icon-num">200</span>
          </div>

        </button>
        <button className="statusBtn">
          <div className="status-content">
            <FontAwesomeIcon icon={faFire} className="icon" />
            <span className="icon-num">5</span>
          </div>
        </button>
        <button className="statusBtn">
          <div className="status-content">
            <FontAwesomeIcon icon={faTrophy} className="icon" />
            <span className="icon-num">7</span>
          </div>
        </button>
      </div>
      <div className="bottom-buttons">
        <button className="careerBtn">Full-Stack-Developer</button>
      </div>
    </div>
  )
}


