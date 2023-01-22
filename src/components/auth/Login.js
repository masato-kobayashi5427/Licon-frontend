import React, { useState } from 'react'
import axios from 'axios'

export default function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/login",
    {
      user: {
      email: email,
      password: password,
    }
    },
    { withCredentials: true }
    ).then(response => {
        if (response.data.logged_in) {
          props.handleSuccessfulAuthentication(response.data)
        }
      }).catch(error => {
        console.log("login error", error)
      })
      event.preventDefault()
    }


  return (
    <div>
      

      <form onSubmit={handleSubmit} className="form">
        <div className='form-main'>
          <p>ログイン</p>
          <input
            className="textfield"
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className="textfield"
            type="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button type="submit" className='btn'>ログイン</button>
        </div>
      </form>
    </div>
  )
}