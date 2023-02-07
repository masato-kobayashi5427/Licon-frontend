import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ImageContent = styled.img`
  height: 100%;
  width: 22vw;
  transition: 0.5s;
  &:hover { 
    height: 25vh;
    width: 25vw; 
  }
`

const List = styled.div`
  margin: 7px 14px;
  padding: 10px;
  font-size:  16px;
`

const EpisodeContent = styled.div`
  height: 22vh;
  width: 90vw;
  display: flex;
  border: 1px solid black;
`

const EpisodeText = styled.div`
  margin-left: 15px;
`

export default function EpisodeRoomList(props) {
  const [episode_rooms, setEpisodeRooms] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/episode_rooms", { withCredentials: true })
    .then(resp => {
      console.log(resp.data[0]);
      setEpisodeRooms(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const RoomList = (userCheck) => {
    if (userCheck !== undefined) {
      return (
        <div>
        {episode_rooms.map((val, key) => {
          return(
            <Link to={"/episode_rooms/" + val.id} state={ val.id } key={key} >
            <List >
              <EpisodeContent>
                <div>
                  <ImageContent src={val.episode_room.episode.image_url} alt="画像"></ImageContent>
                </div>
                <EpisodeText>
                  <div>{val.episode_room.name}</div>
                  <div>{val.user.nickname}</div>
                </EpisodeText>
              </EpisodeContent>
            </List>
            </Link>
        )})}
        </div>
      )}
    else {
      return (<div>ログインしてください</div>)
    }
  }

  return (
    <>
      <h1>EpisodeRoom List</h1>
      <div>
        {RoomList(props.user.id)}
      </div>
    </>
  )
}
