import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'



export default function EpisodeRoomList() {
  const [episode_rooms, setEpisodeRooms] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/episode_rooms")
    .then(resp => {
      console.log(resp.data);
      setEpisodeRooms(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])


  return (
    <>
      <h1>EpisodeRoom List</h1>
      {/* <div>
      {episodes.filter((val) => {
          if(searchName === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return(
            <List key={key}>
              <ImageContent src={val.image_url} alt="画像" className="image-content"></ImageContent>
              <EpisodeContent>{val.title}</EpisodeContent>
              <div>{val.explain}</div>
              <div>{val.user.nickname}</div>
            </List>
          )
        })}
      </div> */}
    </>
  )
}
