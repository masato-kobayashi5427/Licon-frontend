import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const EpisodeContent = styled.span`
  font-size: 24px;
`

export default function Episode() {
  const [episodes, setEpisodes] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/episodes")
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
            <List key={key}>
              <EpisodeContent>{val.title}</EpisodeContent>
            </List>
          )
        })}
      </div>
    </>
  )
}
