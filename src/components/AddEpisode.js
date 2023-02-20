import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import background from "../images/木目.png";
import CategoryList from './CategoryList'
import Limit from './Limit'
import Period from './Period'

const Background = styled.div`
	height: 100%;
	width: 100vw;
	display: flex;
  align-items: center;
  flex-direction: column;
`

export default function AddEpisode(props) {
	const [title, setTitle] = useState("")
  const [explain, setExplain] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
	const [limit, setLimit] = useState(new Date())
	const [period, setPeriod] = useState("")
	const [image, setImage] = useState({data: "", name: ""})
	const navigate = useNavigate();
	
	useEffect(() => {
		if (props.user.id === undefined) {navigate('/login')}
		console.log(period)
	});

  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episodes",
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
			console.log(response.data.image_url)
			navigate("/episodes")
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
		<Background style={{ backgroundImage: `url(${background})` }}>
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
					<CategoryList category={category} setCategory={setCategory}/>
					<Limit limit={limit} setLimit={setLimit}/>
					<Period period={period} setPeriod={setPeriod}/>
					<label htmlFor="image">画像</label>
					<input type="file" name="image" id="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={handleImageSelect}/>
					<button type="submit" className='btn'>登録</button>
				</div>
			</form>
		</Background>
	)
}