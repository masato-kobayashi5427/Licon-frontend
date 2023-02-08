import { React } from 'react'
import { useLocation } from "react-router-dom";
import Chat from './Chat'


export default function EpisodeRoom(props) {
  const location = useLocation();
  const episode_room_id = location.state
  console.log(props)
  console.log(props.user_id)

  return (
    <>
      <h1>EpisodeRoom</h1>
        <div>
          表示
        </div>
      <Chat episode_room_id={episode_room_id} user_id={props.user_id}/>
    </>
  )
}
