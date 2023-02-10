import {React, useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EpisodeList = styled.h1`
  margin: 4px 14px;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 80%;
  height: 40px;
  margin: 7px 14px;
  padding: 10px;
`

const List = styled.div`
  margin: 7px 14px;
  padding: 10px;
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
  justify-content: center;
`

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
  height: 100%;
  width: calc(90vw - 120px);
  padding-left: 15px;
`

const EpisodeTitle = styled.div`
  font-size: 24px;
`

export default function Episode() {
  const [episodes, setEpisodes] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/episodes", { withCredentials: true })
    .then(resp => {
      console.log(resp.data);
      setEpisodes(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])


  return (
    <>
      <EpisodeList>Episode List</EpisodeList>
      <div>
        <SearchForm
          type="text"
          placeholder="SearchEpisode..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />
      </div>

      <div >
        {episodes.filter((val) => {
          if(searchName === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return(
            <motion.div whileInView={{ scale: [0.7, 1.05, 1.0] }}
            transition={{
              duration: 1.0,
              delay: 0 }}
              key={key}>
            <Link to={"/episodes/" + val.id} className="episode-link" >
            <List >
              <EpisodeContent>
                <ImageBox>
                  <ImageContent src={val.image_url} alt="画像"></ImageContent>
                </ImageBox>
                <EpisodeText>
                  <EpisodeTitle>{val.title}</EpisodeTitle>
                  <div>{val.explain}</div>
                  <div>{val.user.nickname}</div>
                </EpisodeText>
              </EpisodeContent>
            </List>
            </Link>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
