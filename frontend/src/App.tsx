import type { CSSProperties } from "react";
import { BottomBar } from "./layout/bottomBar/bottomBar.tsx"
import { Outlet } from "react-router-dom";


function App() {
    const appWrapper: CSSProperties = { display: 'flex', flexDirection: 'column', height: '100vh', width: '100%'}

    return (
      <div style={appWrapper}>
          <main>
            <Outlet/>
          </main>
          <BottomBar/>
      </div>
    )
}

export default App
