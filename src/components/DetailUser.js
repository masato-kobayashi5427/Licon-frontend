import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation  } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function DetailUser(props) {
  const [detail, setDetail] = useState([])
  const location =useLocation()

  // useEffect(() => {
	// 	if (props.user_id === undefined) {navigate('/login')}
	// },[props.user_id]);
    

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${location.state.user_id}`)
    .then(resp => {
      console.log(resp.data)
      setDetail(resp.data)
    })
    .catch(e => {
      console.log(e)
    })
  }, [props]);

  const DetailUser = (detail) => {
    if (detail.user !== undefined) {
      console.log(detail)
      return (
        <div>
          <div>{detail.user.nickname}</div>
          <div>{detail.user.introduction}</div>
          <div>{detail.episodes.map((val, key) => {
            return (<>
              <Link to={"/episodes/" + val.id} className="episode-link" >
                <div>{val.title}</div>
                <div>{val.explain}</div>
                <div>{val.price}</div>
              </Link>
            </>)
            })}
          </div>
        </div>
      )
    } 
    else {
      return
    }
  }

  return (
    <>
      <h1>マイページ</h1>
      {DetailUser(detail)}
    </>
  )
}