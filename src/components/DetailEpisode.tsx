import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface DetailData {
  title: string;
  explain: string;
  image_url: string;
  user: {
    id: number;
    nickname: string;
  };
}

interface User {
  id: number;
}

const ImageContent = styled.img`
  height: 30vh;
  width: 30vw;
  object-fit: contain;
  margin-bottom: 20px;
`

const UpdateLink = styled(Link)`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
  background: #1f2937;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    background: #36464f;
  }
`

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
  background: #f54242;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #a51212;
  }
  
  &:active {
    background-color: #721212;
  }
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const RequestButton = styled(Link)`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
  background: #1f2937;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #36464f;
  }
`

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const UserLink = styled(Link)`
  color: #333;
  font-weight: 600;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
`

export default function DetailEpisode(props: { user?: User }) {
  const [detail, setDetail] = useState<DetailData>({
    title: '',
    explain: '',
    image_url: '',
    user: {
      id: 0,
      nickname: '',
    },
  });
  const navigate = useNavigate();
  let params = useParams<{ id: string }>();

  useEffect(() => {
		if (props.user === undefined) {navigate('/login')}
	},[props.user]);

  const getEpisode = (id: string) => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT!}episodes/${params.id}`)
    .then(resp => {
      console.log(resp.data)
      setDetail(resp.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const deleteEpisode = () => {
    axios.delete(`${process.env.REACT_APP_API_ENDPOINT!}episodes/${params.id}`)
    .then(resp => {
      console.log(resp.data)
      navigate("/episodes")
    })
    .catch((e) => {
      console.log(e)
    })
  }
  
  useEffect(() => {
    getEpisode(params.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const logincheck = () => {
    if ((props.user?.id !== undefined) && (detail.user.id === props.user.id)) {
      return (
        <>
          <UpdateLink to={`/episodes/${params.id}/edit`} state={{detail: detail}}>
            Update
          </UpdateLink>
          <DeleteButton onClick={() => deleteEpisode()}>
            Delete
          </DeleteButton>
        </>)}
    else if ((props.user?.id !== undefined) && (detail.user.id !== props.user.id)) {
      return (
        <>
          <RequestButton to="/episode_rooms/new" className='nav-item' state={ detail } >
            依頼する
          </RequestButton>
        </>
      )
    }
  }

  return (
    <Wrapper>
      <div>
        <Title>{detail.title}</Title>
        <div>{detail.explain}</div>
        <ImageContent src={detail.image_url} alt="画像" className="image-content"></ImageContent>  
      </div>
      <UserLink to={"/users/" + detail.user.id + "/show"} state={{user_id: detail.user.id}}>
        <div>{detail.user.nickname}さん</div>
      </UserLink>
      {logincheck()}
    </Wrapper>
  )
}
