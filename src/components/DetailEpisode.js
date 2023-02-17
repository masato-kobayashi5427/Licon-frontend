import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EpisodeContent = styled.div`
  font-size: 24px;
`

const ImageContent = styled.img`
  height: 30vh;
  width: 30vw;
`

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 50;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

export default function DetailEpisode(props) {
  const [detail, setDetail] = useState({
    title: '',
    explain: '',
    image_url: '',
    user: {
      nickname: '',
    },
  });
  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
		if (props.user === undefined) {navigate('/login')}
	},[props.user]);

  const getEpisode = id => {
    axios.get(`http://localhost:3001/episodes/${params.id}`)
    .then(resp => {
      console.log(resp.data)
      setDetail(resp.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const deleteEpisode = id => {
    axios.delete(`http://localhost:3001/episodes/${params.id}`)
    .then(resp => {
      console.log(resp.data)
      navigate("/episodes")
    })
    .catch(e => {
      console.log(e)
    })
  }
  
  useEffect(() => {
    getEpisode(params.id);
    console.log(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const logincheck = () => {
    if ((props.user.id !== undefined) && (detail.user.id === props.user.id)) {
      return (
        <>
          <Link to={"/episodes/" + params.id + "/edit"}>
            Update
          </Link>
          <DeleteButton onClick={deleteEpisode}>
            Delete
          </DeleteButton>
        </>)}
    else if ((props.user.id !== undefined) && (detail.user.id !== props.user.id)) {
      return (
        <>
          <Link to="/episode_rooms/new" className='nav-item' state={ detail } >
            依頼する
          </Link>
        </>
      )
    }
  }

  return (
    <>
      <h1>Episode</h1>
      <div>
        <div>{detail.user.nickname}</div>
        <EpisodeContent>{detail.title}</EpisodeContent>
        <div>{detail.explain}</div>
        <ImageContent src={detail.image_url} alt="画像" className="image-content"></ImageContent>  
      </div>
      {logincheck()}
    </>
  )
}
