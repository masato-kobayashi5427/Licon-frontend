import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchForm = styled.input`
  font-size: 20px;
  width: 80%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const List = styled.div`
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const EpisodeContent = styled.div`
  font-size: 24px;
`

const ImageContent = styled.img`
  height: 30vh;
  width: 30vw;
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
      <h1>Episode List</h1>
      <div>
        <SearchForm
          type="text"
          placeholder="SearchEpisode..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />
      </div>

      <div>
        {episodes.filter((val) => {
          if(searchName === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return(
            <Link to={"/episodes/" + val.id} className='nav-item'>
            <List key={key}>
              <ImageContent src={val.image_url} alt="画像" className="image-content"></ImageContent>
              <EpisodeContent>{val.title}</EpisodeContent>
              <div>{val.explain}</div>
              <div>{val.user.nickname}</div>
            </List>
            </Link>
          )
        })}
      </div>
    </>
  )
}
