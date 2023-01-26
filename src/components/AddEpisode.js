import React, { useState } from 'react'
import axios from 'axios'

export default function AddEpisode(props) {
	const [title, setTitle] = useState("")
  const [explain, setExplain] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
	const [limit, setLimit] = useState("")
	const [period, setPeriod] = useState("")
  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episodes/create",
      {
        episode: {
				title: title,
        explain: explain,
        price: price,
        category: category ,
				limit: limit,
				period: period
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
			<form onSubmit={handleSubmit} className="form" >
				<div className='form-main'>
				<p>新規登録</p>
				<input
						className="textfield"
						type="title"
						name="title"
						placeholder="タイトル"
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
					<input
						className="textfield"
						type="explain"
						name="explain"
						placeholder="説明文"
						value={explain}
						onChange={event => setExplain(event.target.value)}
					/>
					<input
						className="textfield"
						type="price"
						name="price"
						placeholder="価格"
						value={price}
						onChange={event => setPrice(event.target.value)}
					/>
					<input
						className="textfield"
						type="category"
						name="category"
						placeholder="カテゴリー"
						value={category}
						onChange={event => setCategory(event.target.value)}
					/>
					<input
						className="textfield"
						type="limit"
						name="limit"
						placeholder="期限"
						value={limit}
						onChange={event => setLimit(event.target.value)}
					/>
					<input
						className="textfield"
						type="period"
						name="period"
						placeholder="期間"
						value={period}
						onChange={event => setPeriod(event.target.value)}
					/>
					<button type="submit" className='btn'>登録</button>
				</div>
			</form>
		</div>
	)
}