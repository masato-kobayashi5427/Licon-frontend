import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  align-items: center;
  & > * {
    margin-left: 10px;
  }
  button {
    background-color: #ffffff;
    color: #0066cc;
    border: 2px solid #0066cc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
`;

export default function Top(props: any) {
// ログイン有無によるリンクの切り替え
  const loginitem = (loggedInStatus: string) => {
    if (loggedInStatus === "未ログイン") {
      return (
      <LoginMenu>
        <Link to="/login" className='nav-item'>ログイン</Link>
        <Link to="/registration" className='nav-item'>新規登録</Link>
      </LoginMenu>)}
    else {
      return (
        <LoginMenu>
          <Link to={"/users/" + props.user.id + "/show"} state={{user_id: props.user.id}}>{props.user.nickname}さん</Link>
          <button onClick={props.handleLogoutClick}>ログアウト</button>
        </LoginMenu>
      )
    }
  }

  return (
    <div className='top'>
      <LoginMenu>
        {loginitem(props.loggedInStatus)}
      </LoginMenu>
      <div className="navbar">
        <h1 className="logo">
          ライコン
        </h1>
        <div className='nav-items'>
          <Link to="/episodes" className='nav-item'>
            エピソード
          </Link>
          <Link to="/episodes/new" className='nav-item'>
            投稿する
          </Link>
          <Link to="/episode_rooms" className='nav-item'>
            エピソードルーム
          </Link>
        </div>
      </div>
    </div>
  )
}