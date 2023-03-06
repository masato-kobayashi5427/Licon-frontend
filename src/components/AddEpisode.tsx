import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import background from "../images/木目.png";
import CategoryList from './CategoryList'
import Limit from './Limit'
import Period from './Period'

interface User {
  id: number;
  nickname: string;
}

interface AddEpisodeProps {
  user: User;
}

const Background = styled.div`
	height: 100%;
	width: 100vw;
	display: flex;
  align-items: center;
  flex-direction: column;
`

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 0px;
`

const Label = styled.label`
  margin-right: 8px;
`

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 3px;
  background-color: #f2f2f2;
  margin-bottom: 1rem;
  width: 100%;
`;

export default function AddEpisode(props: AddEpisodeProps) {
	const [title, setTitle] = useState("")
  const [explain, setExplain] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
	const [limit, setLimit] = useState<Date | undefined>(new Date())
	const [period, setPeriod] = useState(0)
	const [image, setImage] = useState({data: "", name: ""})
	const [error_message, setError_message] = useState({
		title: "",
		explain: "",
		price: "",
		category: "",
		limit: "",
		period: "",
		image: "",
	})
	const navigate = useNavigate();
	
	// useEffect(() => {
	// 	if (props.user.id === 0) {navigate('/login')}
	// });

  const handleSubmit = (event: any) => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT!}episodes`,
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
				setError_message(response.data.errors)
			}
			else {
				navigate("/episodes")
			}
    }).catch(error => {
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
  <form onSubmit={handleSubmit} className="form">
    <div className='form-main'>
      <p>新規登録</p>
      <ErrorMessage>{error_message.title}</ErrorMessage>
      <Label htmlFor="title">タイトル</Label>
      <Input
        className="textfield"
        type="title"
        id="title"
        name="title"
        placeholder="タイトル"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <ErrorMessage>{error_message.explain}</ErrorMessage>
      <Label htmlFor="explain">説明文</Label>
      <Input
        className="textfield"
        type="explain"
        id="explain"
        name="explain"
        placeholder="説明文"
        value={explain}
        onChange={event => setExplain(event.target.value)}
      />
      <ErrorMessage>{error_message.price}</ErrorMessage>
      <Label htmlFor="price">価格</Label>
      <Input
        className="textfield"
        type="price"
        id="price"
        name="price"
        placeholder="価格"
        value={price}
        onChange={(event: any) => setPrice(event.target.value)}
      />
      <ErrorMessage>{error_message.category}</ErrorMessage>
      <Label htmlFor="category">カテゴリ</Label>
      <CategoryList category={category} setCategory={setCategory} />
      <ErrorMessage>{error_message.limit}</ErrorMessage>
      <Label htmlFor="limit">公開期限</Label>
      <Limit limit={limit} setLimit={setLimit} />
      <ErrorMessage>{error_message.period}</ErrorMessage>
      <Label htmlFor="period">公開期間（日数）</Label>
      <Period period={period} setPeriod={setPeriod} />
      <ErrorMessage>{error_message.image}</ErrorMessage>
      <Label htmlFor="image">画像</Label>
      <Input type="file" name="image" id="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={handleImageSelect} />
      <button type="submit" className='btn'>登録</button>
    </div>
  </form>
</Background>
	)
}