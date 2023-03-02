import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

interface EpisodeRoom {
  episode_room: {
    id: number,
    name: string,
    episode_id: number,
    order_id: number,
    episode: {
      category: string,
      explain: string,
      id: number,
      image_url: string,
      limit: number,
      title: string;
    },
    chats: any | null,
    user: {
      id: number,
      nickname: string,
    }
  }
}


const List = styled.div`
  margin: 17px 14px;
  font-size:  16px;
`

const EpisodeContent = styled.div`
  height: 120px;
  width: 90vw;
  display: flex;
  border: 2px solid black;
`

const ImageBox = styled.div`
  height: 100%;
  width: 120px;
  background-color: #e0e0e0;
  display: flex;
  position: relative;
  justify-content: center;
`;

const ImageContent = styled.img`
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
  transition: 0.5s;
  margin: auto;
  transform-origin: 50% 50%;
  &:hover { 
    transform: scale(1.2) 
  }
`

const EpisodeText = styled.div`
  flex: 2;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RoomTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const RoomUser = styled.div`
  margin-top: 5px;
`;

const RoomLastChat = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const RoomLink = styled(Link)`
  color: #333;
  font-weight: 600;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
`

export default function EpisodeRoomList(props: any) {
  const [episode_rooms, setEpisodeRooms] = useState<EpisodeRoom[]>([])
  const navigate = useNavigate();

  // useEffect(() => {
	// 	if (props.user.id === 0) {navigate('/login')}
	// });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT!}episode_rooms`, { withCredentials: true })
    .then(resp => {
      console.log(resp)
      setEpisodeRooms(resp.data);
    })
    .catch(e => {
      console.log(e)
    })
  }, [])

  const RoomList = (userCheck: any) => {
    if (userCheck !== undefined) {
      return (
        <div>
        {episode_rooms.map((val: any, key: number) => {
          return(
            <div>
              <motion.div whileInView={{ scale: [0.7, 1.05, 1.0] }}
              transition={{
                duration: 1.0,
                delay: 0 }}
                key={key}>
              <List>
                <RoomLink to={"/episode_rooms/" + val.episode_room_id} state={ val.episode_room_id } key={key} >
                  <EpisodeContent>
                    <ImageBox>
                      <ImageContent src={val.episode_room.episode.image_url} alt="画像"></ImageContent>
                    </ImageBox>
                    <EpisodeText>
                      <RoomTitle>{val.episode_room.name}</RoomTitle>
                      <RoomLastChat>{val.episode_room.chats[val.episode_room.chats.length - 1]?.content}</RoomLastChat>
                    </EpisodeText>
                    <RoomUser>{val.user.nickname}さん</RoomUser>
                  </EpisodeContent>
                </RoomLink>
              </List>
            </motion.div>
          </div>
          )
        })
      }</div>
      )
    }
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
