import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ImageContent = styled.img`
  height: 10vh;
  width: 10vw;
`

export default function EpisodeRoomList(props) {
  const [episode_rooms, setEpisodeRooms] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/episode_rooms")
    .then(resp => {
      console.log(resp.data[0]);
      setEpisodeRooms(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <>
      <h1>EpisodeRoom List</h1>
      <div>
        {episode_rooms.filter(episode_room => {
          return episode_room.id !== props.user.id
        }).map((val, key) => {
          return(
        <li key={key}>
          <Link to={"/episode_rooms/" + val.id} state={ val.id } >
            <div>{val.episode_room.name}</div>
            <div>{val.user.nickname}</div>
            <ImageContent src={val.episode_room.episode.image_url} alt="画像"></ImageContent>
          </Link>
        </li>
        )})}
      </div>
    </>
  )
}
