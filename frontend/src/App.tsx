import type { CSSProperties } from "react";
import { TopBar } from "./layout/topbar/topbar.tsx";
import { BottomBar } from "./layout/bottomBar/bottomBar.tsx"
import { Outlet } from "react-router-dom";


function App() {
    const appWrapper: CSSProperties = { display: 'flex', flexDirection: 'column', height: '100vh', width: '100%'}
    const mainStyle: CSSProperties = {
        marginTop: 'var(--top-bar-height)',
        marginBottom: 'var(--bottom-bar-height)',
        height: 'calc(100vh - var(--top-bar-height) - var(--bottom-bar-height))'
    }

    return (
      <div style={appWrapper}>
          <TopBar/>
          <main style={mainStyle}>
            <Outlet/>
          </main>
          <BottomBar/>
      </div>
    )
}

export default App
