import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonLink = styled(Link)`
  background-color: #ffffff;
  color: #333;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
`;

const LogoutButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

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
        <ButtonLink to="/login" className='nav-item'>ログイン</ButtonLink>
        <ButtonLink to="/registration" className='nav-item'>新規登録</ButtonLink>
      </LoginMenu>)}
    else {
      return (
        <LoginMenu>
          <ButtonLink to={"/users/" + props.user.id + "/show"} state={{user_id: props.user.id}}>{props.user.nickname}さん</ButtonLink>
          <LogoutButton onClick={props.handleLogoutClick}>ログアウト</LogoutButton>
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