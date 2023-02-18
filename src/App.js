import React, { useState, useEffect, createContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import EditEpisode from './components/EditEpisode'
import './App.css'

export const UserData = createContext();

const AppView = styled.div`
  height: 100vh;
  width: 100vw;
`

export default function App(props) {
// useState
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const location = useLocation();

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data)
  };
// ログイン状態切り替え時のレンダリング
  const handleLogin = (data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }
// ログイン表示の切り替え
  useEffect(() => {
    checkLoginStatus()
  },[props])

  // ログイン有無の確認
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response => {
      console.log(response)
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus("ログイン中")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "ログイン中") {
        setLoggedInStatus("未ログイン")
        setUser({})
      }
    })
    .catch(error => {
      console.log("ログインエラー", error)
    })
  }

  // ログアウト機能
  const handleLogoutClick = () => {
    console.log('handleLogo')
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
    .then(response => {
      handleLogout()
    }).catch(error => console.log("ログアウトエラー", error))
  }

  const handleLogout = () => {
    console.log('handleLogout')
    setLoggedInStatus("未ログイン")
    setUser({})
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
            <Episode user={user}  />
          </>}
        />
        <Route
          path={"/episodes"}
          element={<>
            <Episode user={user}  />
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
            <EditEpisode user_id={user.id} />
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