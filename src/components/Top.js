import { Link } from 'react-router-dom'

export default function Top(props) {

// ログイン有無によるリンクの切り替え
  const loginitem = (loggedInStatus) => {
    if (loggedInStatus === "未ログイン") {
      return (<div>
        <Link to="/login" >ログイン</Link>
        <Link to="/registration" >新規登録</Link>
      </div>)}
    else {
      return <button onClick={props.handleLogoutClick}>ログアウト</button>
    }
  }

  return (
    <div className='top'>
      {loginitem(props.loggedInStatus)}
      <h2>ログイン状態: {props.user.nickname}</h2>
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
        </div>
      </div>
    </div>
  )
}