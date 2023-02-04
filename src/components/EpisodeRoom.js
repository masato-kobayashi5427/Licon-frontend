import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Chat from './Chat'


export default function EpisodeRoom(props) {
  const location = useLocation();
  const episode_room_id = location.state

  return (
    <>
      <h1>EpisodeRoom</h1>
        <div>
          表示
        </div>
      <Chat episode_room_id={episode_room_id}/>
    </>
  )
}
