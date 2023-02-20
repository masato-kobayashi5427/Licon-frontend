import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import PayjpCheckout from '../Payjp_Checkout'

export default function AddEpisodeRoom(props) {
  const [name, setName] = useState("")
  const [paytoken, setPaytoken] = useState('')
  const navigate = useNavigate();

  const payjpCheckoutProps = {
    dataKey: process.env.REACT_APP_PAYJP_PUBLIC_KEY,
    dataText: 'クレジットカードで支払う',
    dataPartial: 'true',
    onCreatedHandler: onCreated,
    onFailedHandler: onFailed,
  }
  const location = useLocation();
  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/episode_rooms",
      {
        order_episode_room:{
          name: name,
          episode_id: location.state.id,
          price: location.state.price,
          token: paytoken,
          user_ids: [location.state.user.id, props.user.id],
        }
      },
    { withCredentials: true }
    ).then(response => {
      console.log(response)
      navigate("/episode_rooms")
    }).catch(error => {
      console.log("create room error", error)
    })
    event.preventDefault()
  }

  function onCreated(payload){
    setPaytoken(payload.token)
  }

  function onFailed(payload){}

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
          <div className="payjpButtonArea">
            <PayjpCheckout {...payjpCheckoutProps}/>
          </div>
          <button type="submit" className='btn'>登録</button>
        </div>
      </form>
    </div>
	)
}