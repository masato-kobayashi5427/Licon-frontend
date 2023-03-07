import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import background from "../../images/木目.png";

const Background = styled.div`
	height: 100%;
	width: 100vw;
	display: flex;
  align-items: center;
  flex-direction: column;
`

export default function Login(props: any) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();


  const handleSubmit = (event: any) => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT!}/login`,
    {
      user: {
      email: email,
      password: password,
    }
    },
    { withCredentials: true }
    ).then(response => {
        console.log(response)
        if (response.data.logged_in) {
          props.handleSuccessfulAuthentication(response.data)
          navigate("/episodes")
        }
      }).catch(error => {
        console.log("login error", error)
      })
      event.preventDefault()
    }


  return (
    <Background style={{ backgroundImage: `url(${background})` }}>
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
    </Background>
  )
}