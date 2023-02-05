import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddEpisode(props) {
	const [title, setTitle] = useState("")
  const [explain, setExplain] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
	const [limit, setLimit] = useState("")
	const [period, setPeriod] = useState("")
	const [image, setImage] = useState({data: "", name: ""})
	const navigate = useNavigate();
	
		useEffect(() => {
			if (props.user === undefined) {navigate('/login')}
		})
	;

  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episodes/create",
      {
        episode: {
				title: title,
        explain: explain,
        price: price,
        category: category ,
				limit: limit,
				period: period,
				image: image
      }
    },
    { withCredentials: true }
    ).then(response => {
			console.log('response')
      if (response.data.status === 'created') {
          props.handleSuccessfulAuthentication(response.data)
      }
    }).catch(error => {
        console.log("create episode error", error)
    })
    event.preventDefault()
	}

	const handleImageSelect = (e) => {
		const reader = new FileReader()
		const files = (e.target ).files
		if (files) {
			reader.onload = () => {
				setImage({
					data: reader.result ,
					name: files[0] ? files[0].name : "unknownfile"
				})
			}
			reader.readAsDataURL(files[0])
			console.log(files[0])
		}
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
					<label htmlFor="image">画像</label>
					<input type="file" name="image" id="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={handleImageSelect}/>
					<button type="submit" className='btn'>登録</button>
				</div>
			</form>
		</div>
	)
}