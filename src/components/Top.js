import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginStatus = styled.h3`
  margin-right: 5px;
`

const LoginMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`

export default function Top(props) {
// ログイン有無によるリンクの切り替え
  const loginitem = (loggedInStatus) => {
    if (loggedInStatus === "未ログイン") {
      return (<div>
        <Link to="/login" className='nav-item'>ログイン</Link>
        <Link to="/registration" className='nav-item'>新規登録</Link>
      </div>)}
    else {
      return (
        <>
          <Link to={"/users/" + props.user.id + "/show"} state={{user_id: props.user.id}}>{props.user.nickname}さん</Link>
          <button onClick={props.handleLogoutClick}>ログアウト</button>
        </>
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