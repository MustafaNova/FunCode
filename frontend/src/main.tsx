import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss'
import App from './App.tsx'
import { School } from "./pages/school/school.tsx";
import { Clan } from "./pages/clan/clan.tsx";
import { Arena } from "./pages/arena/arena.tsx";
import { Practice } from "./pages/practice/practice.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route element={<App/>}>
                  <Route index element={<School/>}></Route>
                  <Route path="arena" element={<Arena/>}></Route>
                  <Route path="clan" element={<Clan/>}></Route>
                  <Route path="practice" element={<Practice/>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
