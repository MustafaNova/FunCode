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
import { NotFound } from './pages/NotFound/NotFound.tsx';
import { Clan } from './pages/clan/Clan.tsx';
import { Clans } from './pages/clan/subpages/Clans/Clans.tsx';
import { Create } from './pages/clan/subpages/Create/Create.tsx';
import { Friends } from './pages/clan/subpages/Friends/Friends.tsx';
import { Chat } from './pages/clan/subpages/Chat/chat.tsx';
import { War } from './pages/clan/subpages/War/war.tsx';
import { ClanIndexRedirect } from './pages/clan/subpages/ClanIndexRedirect/clanIndexRedirect.tsx';
import { ClanMemberGuard, NoClanMemberGuard } from './utils/guards.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { Practice } from './pages/practice/practice.tsx';
import { BugHunter } from './pages/practice/games/bugHunter/bugHunter.tsx';
import { BugHunterLevel } from './pages/practice/games/bugHunter/bugHunterLevel.tsx';

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
              <Route path='home' element={<AuthProvider children={<App/>} /> }>
                  <Route index element={<School/>}></Route>
                  <Route path='arena' element={<Arena/>}></Route>
                  <Route path='arena/1v1' element={<Arena1v1/>}></Route>
                  <Route path='clan' element={<Clan />}>
                      <Route index element={<ClanIndexRedirect />}></Route>

                      <Route element={<NoClanMemberGuard />}>
                          <Route path='clans' element={<Clans />}></Route>
                          <Route path='create' element={<Create />}></Route>
                      </Route>

                      <Route element={<ClanMemberGuard />}>
                          <Route path='chat' element={<Chat />}></Route>
                          <Route path='war' element={<War />}></Route>
                      </Route>

                      <Route path='friends' element={<Friends />}></Route>
                  </Route>
                  <Route path='practice' element={<Practice />}></Route>
                  <Route path='practice/bug-hunter' element={<BugHunter />}></Route>
                  <Route path='practice/bug-hunter/:levelId' element={<BugHunterLevel />}></Route>
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
