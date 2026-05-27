import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss'
import App from './App.tsx'
import { School } from "./pages/school/school.tsx";
import { Arena } from "./pages/arena/arena.tsx";
import { Arena1v1 } from './pages/arena1v1/arena1v1.tsx';
import { Login } from './pages/auth/login/login.tsx';
import { Registration } from './pages/auth/registration/registration.tsx';
import { ReadyScreen } from './pages/ready/readyScreen.tsx';
import { Match } from './pages/match/match.tsx';

import { MatchWin } from './pages/match/MatchWin/MatchWin.tsx';
import { MatchLose } from './pages/match/MatchLose/MatchLose.tsx';
import { LevelFrame } from './layout/level-frame/level-frame.tsx';
import { LevelLoseScreen } from './pages/LevelLoseScreen/LevelLoseScreen.tsx';
import { LevelWinScreen } from './pages/LevelWinScreen/LevelWinScreen.tsx';
import { Onboarding } from './pages/Onboarding/Onboarding.tsx';
import { CourseSelection } from './pages/Onboarding/CourseSelection/CourseSelection.tsx';
import { ComingSoon } from './pages/ComingSoon/ComingSoon.tsx';
import { NotFound } from './pages/NotFound/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/register' element={<Registration/>}></Route>
              <Route path='/match' element={<Match/>}></Route>
              <Route path='/match/ready' element={<ReadyScreen/>}></Route>
              <Route path='/match/win' element={<MatchWin/>}></Route>
              <Route path='/match/lose' element={<MatchLose/>}></Route>
              <Route path='home' element={<App/>}>
                  <Route index element={<School/>}></Route>
                  <Route path='arena' element={<Arena/>}></Route>
                  <Route path='arena/1v1' element={<Arena1v1/>}></Route>
                  <Route path='clan' element={<ComingSoon />}></Route>
                  <Route path='practice' element={<ComingSoon />}></Route>
              </Route>
              <Route path='onboarding' element={<Onboarding/>}></Route>
              <Route path='onboarding/courses' element={<CourseSelection/>}></Route>
              <Route path="/level/:course/:module/:level" element={<LevelFrame/>}/>
              <Route path="/levelLose" element={<LevelLoseScreen/>}></Route>
              <Route path="/levelWin" element={<LevelWinScreen/>}></Route>

              <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
