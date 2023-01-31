import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom'


export default function EpisodeRoom(props) {
  const [detail, setDetail] = useState({
    title: '',
    explain: '',
    image_url: '',
    user: {
      nickname: '',
    },
  });


  let params = useParams();

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

  
  useEffect(() => {
    getEpisode(params.id);
    console.log(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <>
      <h1>Episode</h1>
      <div>
        <div>{detail.user.nickname}</div>
        <EpisodeContent>{detail.title}</EpisodeContent>
        <div>{detail.explain}</div>
        <ImageContent src={detail.image_url} alt="画像" className="image-content"></ImageContent>  
      </div>
      <Link to="/episode_rooms/new" className='nav-item' state={ detail } >
        ルーム作成
      </Link>
    </>
  )
}
