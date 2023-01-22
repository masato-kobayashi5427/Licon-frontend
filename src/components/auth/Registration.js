import React, { useState } from 'react'
import axios from 'axios'

export default function Registration(props) {
	const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [last_name, setLast_name] = useState("")
	const [first_name, setFirst_name] = useState("")
	const [last_name_kana, setLast_name_kana] = useState("")
	const [first_name_kana, setFirst_name_kana] = useState("")
	const [birth_day, setBirth_day] = useState("")
	const [introduction, setIntroduction] = useState("")

  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/signup",
      {
        user: {
				nickname: nickname,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
				last_name: last_name,
				first_name: first_name,
				last_name_kana: last_name_kana,
				first_name_kana: first_name_kana,
				birth_day: birth_day,
				introduction: introduction
      }
    },
    { withCredentials: true }
    ).then(response => {
			console.log('response')
      if (response.data.status === 'created') {
          props.handleSuccessfulAuthentication(response.data)
      }
    }).catch(error => {
        console.log("registration error", error)
    })
    event.preventDefault()
	}

	return (
		<div>
			
			{/* onSubmit、onChangeイベントを追加 */}
			<form onSubmit={handleSubmit} className="form" >
				<div className='form-main'>
				<p>新規登録</p>
				<input
						className="textfield"
						type="nickname"
						name="nickname"
						placeholder="ニックネーム"
						value={nickname}
						onChange={event => setNickname(event.target.value)}
					/>
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
					<input
						className="textfield"
						type="password"
						name="password_confirmation"
						placeholder="確認用パスワード"
						value={passwordConfirmation}
						onChange={event => setPasswordConfirmation(event.target.value)}
					/>
					<input
						className="textfield"
						type="last_name"
						name="last_name"
						placeholder="名字"
						value={last_name}
						onChange={event => setLast_name(event.target.value)}
					/>
					<input
						className="textfield"
						type="first_name"
						name="first_name"
						placeholder="名前"
						value={first_name}
						onChange={event => setFirst_name(event.target.value)}
					/>
					<input
						className="textfield"
						type="last_name_kana"
						name="last_name_kana"
						placeholder="名字（カナ）"
						value={last_name_kana}
						onChange={event => setLast_name_kana(event.target.value)}
					/>
					<input
						className="textfield"
						type="first_name_kana"
						name="first_name_kana"
						placeholder="名前（カナ）"
						value={first_name_kana}
						onChange={event => setFirst_name_kana(event.target.value)}
					/>
					<input
						className="textfield"
						type="date"
						name="birth_day"
						placeholder="誕生日"
						value={birth_day}
						onChange={event => setBirth_day(event.target.value)}
					/>
					<input
						className="textfield"
						type="introduction"
						name="introduction"
						placeholder="紹介文"
						value={introduction}
						onChange={event => setIntroduction(event.target.value)}
					/>
					<button type="submit" className='btn'>登録</button>
				</div>
			</form>
		</div>
	)
}