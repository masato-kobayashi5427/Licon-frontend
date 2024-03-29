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

type SortOption = {
  label: string;
  value: string;
};

const Sorts: SortOption[] = [
  { value: "投稿順：新〜古", label: "投稿順：新〜古" },
  { value: "投稿順：古〜新", label: "投稿順：古〜新" },
  { value: "価格：安い順", label: "価格：安い順" },
  { value: "価格：高い順", label: "価格：高い順" }
];

const MainView = styled.div`
  padding: 24px
`
const SearchArea = styled.div`
  width: 90vw;
  margin: 0 8px;
`
const EpisodeList = styled.h2`
  text-align: center;
  width: auto;
  padding: 10px;
  margin: 4px 14px 4px 0;
  background-color: white;
  color: #333;
  border-radius: 20px;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 10px;
`

const List = styled.div`
  margin: 17px 14px;
  font-size: 16px;
`

const EpisodeContent = styled.div`
  height: 120px;
  width: 90vw;
  display: flex;
  border: 2px solid black;
  background-color: white;
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
  justify-content: space-between;
`
const EpisodeLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: #333;
  text-decoration: none;
`
const UserLink = styled(Link)`
  width: 200px;
  margin-right: 10px;
  display: inline-block;
  color: #333;
  text-align: right;
  text-decoration: none;
`

const Episode = () => {
  const [episodes, setEpisodes] = useState([])
  const [searchName, setSearchName] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState(Sorts[0]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT!}/episodes`, { withCredentials: true })
    .then(resp => {
      setEpisodes(resp.data);
    })
    .catch(e => {
    })
  }, [])

  const SoldCheck = (ordered: any) => {
    if (ordered.length !== 0) {
    return (<Sold src={sold} alt="売り切れ"></Sold>)
  }}

  const ExpiredCheck = (val: any) => {
    if (moment(val).format('YYYY年MM月DD日') < moment(new Date()).format('YYYY年MM月DD日')) {
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
      <Select
        value={sort}
        options={Sorts}
        onChange={(value) => {
          if (value) {
            setSort(value);
          }
        }}
        placeholder="並び替え"
      />
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
          if(sort.value === "投稿順：新〜古"){
            return a.created_at > b.created_at? -1: 1;
          } else if(sort.value === "投稿順：古〜新"){
            return a.created_at < b.created_at? -1: 1;
          } else if(sort.value === "価格：安い順"){
            return a.price < b.price? -1: 1;
          } else if(sort.value === "価格：高い順"){
            return a.price > b.price? -1: 1;
          }
        }).map((val: any, key) => {
          return(
            <motion.div whileInView={{ scale: [0.7, 1.05, 1.0] }}
            transition={{
              duration: 1.0,
              delay: 0 }}
              key={key}>
              <List >
                <EpisodeContent>
                  <Link to={"/episodes/" + val.id} className="episode-link" >
                    <ImageBox>
                      {SoldCheck(val.orders)}
                      {ExpiredCheck(val.limit)}
                      <ImageContent src={val.image_url} alt="画像"></ImageContent>
                    </ImageBox>
                  </Link>
                  <EpisodeText>
                    <EpisodeLink to={"/episodes/" + val.id} className="episode-link" >
                      <MainEpisode>
                        <EpisodeTitle>{val.title}</EpisodeTitle>
                        <div>{val.explain}</div>
                      </MainEpisode>
                    </EpisodeLink>
                    <BottomEpisode>
                      <EpisodeLink to={"/episodes/" + val.id} className="episode-link" >
                        <div>{val.price}円</div>
                        <div>{moment(val.created_at).format('YYYY年MM月DD日')}</div>
                      </EpisodeLink>
                      <UserLink to={"/users/" + val.user.id + "/show"} state={{user_id: val.user.id}}>{val.user.nickname}</UserLink>
                    </BottomEpisode>
                  </EpisodeText>
                </EpisodeContent>
              </List>
            </motion.div>
          )
        })}
      </div>
      </MainView>
    </>
  )
}

export default Episode;