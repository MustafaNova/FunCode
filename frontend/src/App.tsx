import type { CSSProperties } from "react";
import { TopBar } from "./layout/topbar/topbar.tsx";
import { BottomBar } from "./layout/bottomBar/bottomBar.tsx"
import { Outlet } from "react-router-dom";


function App() {
    const appWrapper: CSSProperties = { display: "flex", flexDirection: "column", height: "100%", width: "100%"}
    const centerContent = {paddingTop: "136px"}

    return (
      <div style={appWrapper}>
        <header>
          <TopBar/>
        </header>
        <main style={centerContent}>
          <Outlet/>
        </main>
        <footer>
          <BottomBar/>
        </footer>
      </div>

    )
}

export default App
