import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryList from './CategoryList';
import Select from 'react-select';
import moment from 'moment';
import sold from "../images/sold.jpg";
import expired from "../images/expired.png";

const Sorts = [
  { label: "投稿順：新〜古", value: "投稿順：新〜古" },
  { label: "投稿順：古〜新", value: "投稿順：古〜新" },
  { label: "価格：安い順", value: "価格：安い順" },
  { label: "価格：高い順", value: "価格：高い順" }
];

const MainView = styled.div`
  padding: 24px
`
const SearchArea = styled.div`
  width: 90vw;
  margin: 0 8px;
`
const EpisodeList = styled.h1`
  margin: 4px 14px;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 10px;
`

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

const Sold = styled.img`
  height: 40px;
  width: 60px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
`
const Expired = styled.img`
  height: 40px;
  width: 60px;
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translateX(-50%);
  transform: translateY(-50%);
`

const ImageBox = styled.div`
  height: 100%;
  width: 120px;
  background-color: #e0e0e0;
  display: flex;
  position: relative;
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
  font-size: 20px;
`
const MainEpisode = styled.div`
  height: 90px;
`
const BottomEpisode = styled.div`
  display: flex;
`

const Episode = () => {
  const [episodes, setEpisodes] = useState([])
  const [searchName, setSearchName] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState("投稿順：新〜古")

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

  const SoldCheck = (ordered: any) => {
    console.log(ordered)
    if (ordered.length !== 0) {
    return (<Sold src={sold} alt="売り切れ"></Sold>)
  }}

  const ExpiredCheck = (val: any) => {
    if (moment(val.created_at).format('YYYY年MM月DD日') > moment(new Date()).format('YYYY年MM月DD日')) {
      return (<Expired src={expired} alt="期限切れ"></Expired>)
  }}

  return (
    <>
    <MainView>
      <EpisodeList>Episode List</EpisodeList>
      <SearchArea>
        <SearchForm
          type="text"
          placeholder="SearchEpisode..."
          onChange={(event: any) => {
            setSearchName(event.target.value)
          }}
        />
      <Select options={Sorts} defaultValue={sort} placeholder="並び替え" onChange={(value: any) => { setSort(value["value"]) }}/>
      <CategoryList category={category} setCategory={setCategory}/>
      </SearchArea>
      <div>
        {episodes.filter((val: any) => {
          if(searchName === "" && category === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchName.toLowerCase()) && category === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchName.toLowerCase()) && val.category === category) {
            return val
          } else if (searchName === "" && val.category === category) {
            return val
          }
        }).sort(function(a: any, b: any): any{
          if(sort === "投稿順：新〜古"){
            return a.created_at > b.created_at? -1: 1;
          } else if(sort === "投稿順：古〜新"){
            return a.created_at < b.created_at? -1: 1;
          } else if(sort === "価格：安い順"){
            return a.price < b.price? -1: 1;
          } else if(sort === "価格：高い順"){
            return a.price > b.price? -1: 1;
          }
        }).map((val: any, key) => {
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
                  {SoldCheck(val.orders)}
                  {ExpiredCheck(val)}
                  <ImageContent src={val.image_url} alt="画像"></ImageContent>
                </ImageBox>
                <EpisodeText>
                  <MainEpisode>
                    <EpisodeTitle>{val.title}</EpisodeTitle>
                    <div>{val.explain}</div>
                  </MainEpisode>
                  <BottomEpisode>
                    <div>{val.price}円</div>
                    <div>{moment(val.created_at).format('YYYY年MM月DD日')}</div>
                    <Link to={"/users/" + val.user.id + "/show"} state={{user_id: val.user.id}}>{val.user.nickname}</Link>
                  </BottomEpisode>
                </EpisodeText>
              </EpisodeContent>
            </List>
            </Link>
            </motion.div>
          )
        })}
      </div>
      </MainView>
    </>
  )
}

export default Episode;