import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import PayjpCheckout from '../Payjp_Checkout'

export default function AddEpisodeRoom(props: any) {
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
  const detail = location.state ? location.state.detail : null;
  const handleSubmit = (event: any) => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT!}episode_rooms`,
      {
        order_episode_room:{
          name: name,
          episode_id: detail.id,
          price: detail.price,
          token: paytoken,
          user_id: props.user.id,
          user_ids: [detail.user.id, props.user.id]
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

  function onCreated(payload: any){
    setPaytoken(payload.token)
  }

  function onFailed(payload: any){}

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