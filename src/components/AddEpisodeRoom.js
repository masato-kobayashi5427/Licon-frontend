import React, { useState } from 'react'
import axios from 'axios'

export default function AddEpisodeRoom(props) {

  const [name, setName] = useState("")
  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episode_rooms/new",
      {
        episode_room: {
        name: name,
      }
    },
    { withCredentials: true }
    ).then(response => {
      console.log('response')
      if (response.data.status === 'created') {
          props.handleSuccessfulAuthentication(response.data)
      }
    }).catch(error => {
        console.log("registration error", error)
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
          placeholder="タイトル"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit" className='btn'>登録</button>
				</div>
			</form>
		</div>
	)
}