import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'

export default function AddEpisodeRoom(props) {
  const [name, setName] = useState("")
  const location = useLocation();
  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episode_rooms",
      {
        episode_room: {
        name: name,
        episode_id: location.state.id,
        user_ids: [location.state.user.id, props.user.id]
      }
    },
    { withCredentials: true }
    ).then(response => {
      console.log('response')
      if (response.data.status === 'created') {
          props.handleSuccessfulAuthentication(response.data)
      }
    }).catch(error => {
        console.log("create room error", error)
    })
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form" >
        <div className='form-main'>
        <p>ルーム作成</p>
          <input
            className="textfield"
            type="name"
            name="name"
            placeholder="ルームネーム"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <button type="submit" className='btn'>登録</button>
        </div>
      </form>
    </div>
	)
}