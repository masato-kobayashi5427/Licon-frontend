import { React } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import Chat from './Chat'

const ChatSpace = styled.div`
  width: 100%;
`


export default function EpisodeRoom(props) {
  const location = useLocation();
  const episode_room_id = location.state

  return (
    <>
      <ChatSpace>
        <h1>EpisodeRoom</h1>
        <Chat episode_room_id={episode_room_id} user_id={props.user_id}/>
      </ChatSpace>
    </>
  )
}
