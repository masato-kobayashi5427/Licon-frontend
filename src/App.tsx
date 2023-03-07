import React, { useState, useEffect, createContext } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { AnimatePresence } from "framer-motion"
import Top from './components/Top'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import DetailUser from './components/DetailUser'
import Episode from './components/Episode'
import AddEpisode from './components/AddEpisode'
import DetailEpisode from './components/DetailEpisode'
import AddEpisodeRoom from './components/AddEpisodeRoom'
import EpisodeRoomList from './components/EpisodeRoomList'
import EpisodeRoom from './components/EpisodeRoom'
import EditEpi from './components/EditEpi'
import './App.css'

export const UserData = createContext<object>({});

interface User {
  id: number;
  nickname: string;
}

const AppView = styled.div`
  height: 100vh;
  width: 100vw;
`

export default function App(props: any) {
// useState
  const [loggedInStatus, setLoggedInStatus] = useState<string>("未ログイン");
  const [user, setUser] = useState<User>({
    id: 0,
    nickname: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccessfulAuthentication = (data: any) => {
    handleLogin(data)
  };
  
// ログイン状態切り替え時のレンダリング
  const handleLogin = (data: any) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }
// ログイン表示の切り替え
  useEffect(() => {
    checkLoginStatus()
  },[])

  // ログイン有無の確認
  const checkLoginStatus = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT!}/logged_in`, { withCredentials: true })
      .then(response => {
        // console.log(response)
        if (response.data.logged_in) {
          setUser(response.data.user);
          setLoggedInStatus(prevLoggedInStatus => prevLoggedInStatus !== "ログイン中" ? "ログイン中" : prevLoggedInStatus);
        } else {
          setUser({id: 0, nickname: ''});
          setLoggedInStatus(prevLoggedInStatus => prevLoggedInStatus !== "未ログイン" ? "未ログイン" : prevLoggedInStatus);
        }
      })
      .catch(error => {
        // console.log("ログインエラー", error)
      })
  }

  // ログアウト機能
  const handleLogoutClick = () => {
    axios.delete(`${process.env.REACT_APP_API_ENDPOINT!}/logout`, { withCredentials: true })
    .then(response => {
      handleLogout()
      navigate("/login")
    }).catch(error => console.log("ログアウトエラー", error))
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({
      id: 0,
      nickname: ''
    })
  }
  
  return (  
    <AppView>
      <UserData.Provider value={user}>
      <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
      <div className="App">
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={"/"}
          element={<>
            <Episode/>
          </>}
        />
        <Route
          path={"/episodes"}
          element={<>
            <Episode/>
          </>}
        />
        <Route
          path={"/episodes/new"}
          element={<>
            <AddEpisode user={user}/>
          </>}
        />
        <Route
          path={"/registration"}
          element={<>
            <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
          </>}
        />
        <Route
          path={"/login"}
          element={<>
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
          </>}
        />
        <Route
          path={"/episodes/:id"}
          element={<>
            <DetailEpisode user={user}/>
          </>}
        />
        <Route
          path={"/episode_rooms/new"}
          element={<>
            <AddEpisodeRoom user={user} />
          </>}
        />
        <Route
          path={"/episode_rooms"}
          element={<>
            <EpisodeRoomList user={user}/>
          </>}
        />
        <Route
          path={"/episode_rooms/:id"}
          element={<>
            <EpisodeRoom user_id={user.id}/>
          </>}
        />
        <Route
          path={"/episodes/:id/edit"}
          element={<>
            <EditEpi user={user} />
          </>}
        />
        <Route
          path={"/users/:id/show"}
          element={<>
            <DetailUser user_id={user.id} />
          </>}
        />
      </Routes>
      </AnimatePresence>
      </div>
      </UserData.Provider>
    </AppView>
  )
}