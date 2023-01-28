import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams  } from 'react-router-dom';

const List = styled.div`
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const EpisodeContent = styled.div`
  font-size: 24px;
`

const ImageContent = styled.img`
  height: 30vh;
  width: 30vw;
`

export default function DetailEpisode(props) {
  const [episode, setEpisode] = useState([])
  let params = useParams();

  const getEpisode = id => {
    console.log(`/episodes/${params.id}`)
    axios.get(`http://localhost:3001/episodes/${params.id}`)
    .then(resp => {
      console.log(resp.data)
      setEpisode(resp.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getEpisode(params.id);
    console.log(params.id)
  }, [params.id]);

  return (
    <>
      <h1>Episode</h1>
      <div>
        <div>{episode.user.nickname}</div>
        <EpisodeContent>{episode.title}</EpisodeContent>
        <div>{episode.explain}</div>
        <ImageContent src={episode.image_url} alt="画像" className="image-content"></ImageContent>  
      </div>
    </>
  )
}
