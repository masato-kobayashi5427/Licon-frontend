import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Main = styled.div`
  width: 90vw;
  margin: 0 auto;
`

const DetailUserWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`

const DetailWrapper = styled.div`
  scroll-snap-align: start;
  width: 300px;
  margin-right: 20px;
  flex-shrink: 0;
`

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const MainWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const Wrapper = styled.div`
  margin-top: 5px;
  font-weight: bold;
`

const Image = styled.img`
  height: 200px;
  width: 200px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`

const Explain = styled.div`
  margin-top: 5px;
`

const Price = styled.div`
  margin-top: 5px;
  text-align: center;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`

const UserIntroduction = styled.div`
  margin-bottom: 20px;
`

const UserEpisodeListTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`

export default function DetailUser(props: any) {
  const [detail, setDetail] = useState([])
  const location = useLocation()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT!}/users/${location.state.user_id}`)
      .then(resp => {
        console.log(resp.data)
        setDetail(resp.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [props]);

  const DetailUser = (detail: any) => {
    if (detail.user !== undefined) {
      console.log(detail)
      return (
        <>
          <Main>
            <PageTitle>{detail.user.nickname}さんのページ</PageTitle>
            <MainWrapper>紹介文</MainWrapper>
            <UserIntroduction>{detail.user.introduction}</UserIntroduction>
            <UserEpisodeListTitle>投稿一覧</UserEpisodeListTitle>
            <DetailUserWrapper>
              {detail.episodes.map((val: any, key: number) => {
                return (
                  <DetailWrapper key={key}>
                    <Link to={"/episodes/" + val.id} className="episode-link" >
                      <ImageBox>
                        <Image src={val.image_url} alt="画像"></Image>
                      </ImageBox>
                      <Title>{val.title}</Title>
                      <Wrapper>説明文</Wrapper>
                      <Explain>{val.explain}</Explain>
                      <Wrapper>価格</Wrapper>
                      <Price>{val.price}円</Price>
                    </Link>
                  </DetailWrapper>
                )
              })}
            </DetailUserWrapper>
          </Main>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {DetailUser(detail)}
    </>
  )
}