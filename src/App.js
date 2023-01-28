import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Top from './components/Top'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import Episode from './components/Episode'
import AddEpisode from './components/AddEpisode'
import DetailEpisode from './components/DetailEpisode'
import './App.css'

export default function App(props) {
// useState
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})


  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data)
  }

// ログイン状態切り替え時のレンダリング
  const handleLogin = (data) => {
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }

// ログイン表示の切り替え
  useEffect(() => {
    checkLoginStatus()
  })

  // ログイン有無の確認
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response => {
      console.log(response)
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus("ログインなう")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
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
    <div>
      <BrowserRouter>
        <>
          <Routes>
            <Route
              path={"/episodes"}
              element={<>
                <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
                <Episode user={user}  />
              </>}
            />
            <Route
              path={"/episodes/new"}
              element={<>
                <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
                <AddEpisode />
              </>}
            />
            <Route
              path={"/registration"}
              element={<>
                <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
                <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
              </>}
            />
            <Route
              path={"/login"}
              element={<>
                <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus}/>
                <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
              </>}
            />
            <Route
              path={"/episodes/:id"}
              element={<>
                <Top user={user} handleLogoutClick={handleLogoutClick} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus}/>
                <DetailEpisode />
              </>}
            />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  )
}