import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import background from "../images/木目.png";
import CategoryList from './CategoryList'
import Limit from './Limit'
import Period from './Period'

interface User {
  id: number;
  nickname: string;
}

const Background = styled.div`
	height: 100%;
	width: 100vw;
	display: flex;
  align-items: center;
  flex-direction: column;
`

export default function EditEpi(props: any) {
	const location = useLocation();
  const { detail } = location.state as any;
  const id = detail.id
	const [title, setTitle] = useState(detail.title)
  const [explain, setExplain] = useState(detail.explain)
  const [price, setPrice] = useState(detail.price)
  const [category, setCategory] = useState(detail.category)
	const [limit, setLimit] = useState<Date | undefined>(new Date())
	const [period, setPeriod] = useState(detail.period)
	const [image, setImage] = useState({data: "", name: ""})
	const [error_message, setError_message] = useState({
		title: "",
		explain: "",
		category: ""
	})
	const navigate = useNavigate();

	useEffect(() => {
		if (props.user.id === 0) {navigate('/login')}
	});

  const handleSubmit = (event: any) => {
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT!}/episodes/${id}`,
      {
        episode: {
				user_id: props.user.id,
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
			if (response.data.errors !== undefined){
				console.log(response.data.errors.title)
			}
			else {
				console.log(response)
				navigate("/episodes")
			}
    }).catch(error => {
      console.log(error)
    })
    event.preventDefault()
	}

	const handleImageSelect = (e: any) => {
		const reader = new FileReader()
		const files = (e.target ).files
		if (files) {
			reader.onload = () => {
				setImage({
					data: reader.result as string,
					name: files[0] ? files[0].name : "unknownfile"
				})
			}
			reader.readAsDataURL(files[0])
		}
	}


	return (
		<Background style={{ backgroundImage: `url(${background})` }}>
			<form onSubmit={handleSubmit} className="form" >
				<div className='form-main'>
				<p>編集画面</p>
				{error_message.title}
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
						onChange={(event: any) => setPrice(event.target.value)}
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