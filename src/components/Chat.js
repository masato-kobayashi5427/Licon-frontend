import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import ActionCable from 'actioncable';
import { UserData} from '../App'
import Canvas from './Canvas';

const Main =styled.div`
  height: 80%;
  width: 1000px;
  margin: 0 auto;
`

const ChatBackground =styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const ChatArea = styled.div`
  height: 400px;
  width: 80vw%;
  display: flex;
  flex-flow: column;
  background: #769ece;
  border: 1px solid #000;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 10px;
`;
const HomeChat = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const AwayChat = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
`

const ImageBox = styled.div`
  height:200px;
  width:200px;
`

const HomeImageContent = styled.img`
  width:200px;
  height:200px;
  transition: 0.5s;
  transform-origin: 100% 60%;
  &:hover { 
    transform: scale(2) 
  }
`
const AwayImageContent = styled.img`
  width:200px;
  height:200px;
  transition: 0.5s;
  transform-origin: 0% 60%;
  &:hover { 
    transform: scale(2) 
  }
`

const AwayChatBox = styled.div`
  position: relative;
  display: inline-block;
  max-width: 192px;
  margin: 8px 0 0;
  padding: 9px 14px;
  border-radius: 19px;
  overflow-wrap: break-word;
  clear: both;
  box-sizing: content-box;
  float: left;
  margin-left: 62px;
  background: white;
  &:before {
    position: absolute;
    content: "";
    width: 24px;
    height: 36px;
    top: -21px;
    left: -10px;
    border-radius: 18px 0 6px 18px/18px 0 1px 18px;
    box-shadow: -3px -15px 0 -5px white inset;
  }
`
const HomeChatBox = styled.div`
  position: relative;
  display: inline-block;
  max-width: 192px;
  margin: 8px 0 0;
  padding: 9px 14px;
  border-radius: 19px;
  overflow-wrap: break-word;
  clear: both;
  box-sizing: content-box;
  float: right;
  margin-right: 12px;
  background: #7adc40;
  &:before{
    position: absolute;
    content: "";
    width: 24px;
    height: 36px;
    top: -21px;
    right: -10px;
    border-radius: 0 18px 18px 6px/0 18px 18px 1px;
    box-shadow: inset 3px -15px 0 -5px #7adc40;
  }
`;
const InputArea = styled.div`
  width: 90%;
  margin: 0 auto;
`

const TextSubmitArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextInput = styled.input`
  height: 40px;
  padding: 0 10px;
  margin-top: 4px;
  margin-right: 10px;
  border-radius: 4px;
  background-color: #fff;
  flex-grow: 1;
`;

const TextSubmitButton = styled.button`
  height: 40px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const ImageForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageInput = styled.input`
  height: 40px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const ImageSubmitButton = styled.button`
  height: 40px;
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const CanvasArea = styled.div`
  display: flex;
  justify-content: space-between;
`
const CanvasSubmitButton = styled.button`
  height: 40px;
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

export default function Chat(props) {
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [text, setText] = useState([]);
  const [input, setInput] = useState('');
  const [subscription, setSubscription] = useState();
  const [chats, setChats] = useState([]);
  const [image, setImage] = useState({ data: '', name: '' });
  const [canvasUrl, setCanvasUrl] = useState("")

  const userData =useContext(UserData);
  const ref = useRef();
  const chatListRef = useRef(null);

  // Action Cableに接続
  const cable = useMemo(() => ActionCable.createConsumer(`${process.env.REACT_APP_API_ENDPOINT}/cable`, { withCredentials: true }), []);

  useEffect(() => {
    // console.log(cable)
    // ChatChannelをサブスクライブ
    // receivedにメッセージを受信した時のメソッドを設定します。
    // 今回はreceivedMessageにメッセージをセットします。
    const sub = cable.subscriptions.create({ channel: "ChatChannel", room_id: props.episode_room_id }, {
      received: (msg) => setReceivedMessage(msg)
    });
    // console.log(sub)
    setSubscription(sub);
  }, [cable]);

// チャットHTMLの挿入
  useEffect(() => {
    if (!receivedMessage) return;
    // console.log(receivedMessage)
    const { sender, body } = receivedMessage;
    if (receivedMessage.sender === userData.nickname) {
      if (body.includes('http://')) {
        setText([text, <HomeChat id="history"><HomeImageContent src={body} alt="画像"></HomeImageContent></HomeChat>]);
      }
      else if (body.includes('data:image/png;base64,')) {
        setText([text, <HomeChat id="history"><HomeImageContent src={body} alt="画像"></HomeImageContent></HomeChat>]);
      }
      else {
        setText([text, <HomeChat id="history"><HomeChatBox id="chat">{sender}:{body}</HomeChatBox></HomeChat>]);
      }
    }
    else {
      if (body.includes('http://')) {
        setText([text, <AwayChat id="history"><AwayImageContent src={body} alt="画像"></AwayImageContent></AwayChat>]);
      }
      else if (body.includes('data:image/png;base64,')) {
        setText([text, <AwayChat id="history"><AwayImageContent src={body} alt="画像"></AwayImageContent></AwayChat>]);
      }
      else {
        setText([text, <AwayChat id="history"><AwayChatBox id="chat">{sender}:{body}</AwayChatBox></AwayChat>]);
      }
    }
    // console.log(text)
  }, [receivedMessage]);
  
// 最新のチャットまでスクロール
  useEffect(() => {
    // console.log(text)
    ref?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [text]);

// チャット履歴を取得
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/episode_rooms/${props.episode_room_id}/chats`, { withCredentials: true })
    .then(resp => {
      setChats(resp.data)
      // console.log(chats)
    })
    .catch(e => {
      // console.log(e);
    })
  }, [props.episode_room_id])

// チャット履歴を表示
  useEffect(() => {
    if (!chats) return;
    ChatList(chats)
  }, [chats]);
  
// チャットを並べる
  const ChatList = (chats) => {
    return (
      <div>
      {chats.map((val, key) => {
        if ((val.canvasUrl !== null) && (val.user_id === userData.id)) {
          return (<HomeChat key={key}><HomeImageContent src={val.canvasUrl} alt="画像"></HomeImageContent></HomeChat>)
        }
        else if ((val.canvasUrl !== null) && (val.user_id !== userData.id)) {
          return (<AwayChat key={key}><AwayImageContent src={val.canvasUrl} alt="画像"></AwayImageContent></AwayChat>)
        }
        else if ((val.image_url === null) && (val.user_id === userData.id)) {
          return(<HomeChat key={key}><HomeChatBox>{val.user.nickname}: {val.content}</HomeChatBox></HomeChat>)
        } 
        else if ((val.image_url !==  null) && (val.user_id === userData.id)) {
          return(<HomeChat key={key}><ImageBox><HomeImageContent src={val.image_url} alt="画像"></HomeImageContent></ImageBox></HomeChat>)
        }
        else if ((val.image_url === null) && (val.user_id !== userData.id)) {
          return(<AwayChat key={key}><AwayChatBox>{val.user.nickname}: {val.content}</AwayChatBox></AwayChat>)
        }
        else {
          return(<AwayChat key={key}><ImageBox><AwayImageContent src={val.image_url} alt="画像"></AwayImageContent></ImageBox></AwayChat>)
        }
      })}
      </div>
  )};

  useEffect(() => {
    chatListRef.current.scrollTo(0, chatListRef.current.scrollHeight);
  }, []);

  const handleSend = () => {
    // inputをサーバーに送信
    // chat_channel.rbのchatメソッドに送信
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/episode_rooms/${props.episode_room_id}/chats`,
    {
      chat: {
      content: input,
      episode_room_id: props.episode_room_id
    }
    },
    { withCredentials: true }
    ).then(response => {
      // console.log(response)
      subscription?.perform('chat', { body: input });
      setInput("")
    }).catch(error => {
      // console.log("create episode error", error)
    })
  };

  // 画像投稿機能
  const handleImageSelect = (e) => {
		const reader = new FileReader()
		const files = (e.target ).files
		if (files) {
			reader.onload = () => {
				setImage({
					data: reader.result ,
					name: files[0] ? files[0].name : "unknownfile"
				})
			}
			reader.readAsDataURL(files[0])
		}
	}

  const handleSubmit = (event) => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/episode_rooms/${props.episode_room_id}/chats`,
      {
        chat: {
				image: image,
        episode_room_id: props.episode_room_id
      }
    },
    { withCredentials: true }
    ).then(response => {
      // console.log(response)
      subscription?.perform('chat', { body: response.data.chat.image_url });
    }).catch(error => {
        // console.log("create chat error", error)
    })
    event.preventDefault()
    setImage("");
	}

  const sendCanvas = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/episode_rooms/${props.episode_room_id}/chats`,
    {
      chat: {
      canvasUrl: canvasUrl,
      episode_room_id: props.episode_room_id
    }
    },
    { withCredentials: true }
    ).then(response => {
      // console.log(response)
      subscription?.perform('chat', { body: response.data.chat.canvasUrl });
    }).catch(error => {
      // console.log("create canvas error", error)
    })
  };


  return (
    <>
      <Main>
        <ChatBackground id="backgound">
          <ChatArea ref={chatListRef}>
            {ChatList(chats)}
            {text}
            <div ref={ref}></div>
          </ChatArea>
        </ChatBackground>
        <InputArea>
          {/* テキストを投稿する機能 */}
          <TextSubmitArea>
            <TextInput
              type="text"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSend();
                }
              }}
              value={input}
              style={{ width: "400px", marginRight: "10px" }}
              onChange={event => setInput(event.currentTarget.value)}
            />
            <TextSubmitButton onClick={handleSend} className='btn' disabled={input === ''}>
              テキスト投稿
            </TextSubmitButton>
          </TextSubmitArea>

          {/* 画像投稿機能 */}
          <ImageForm onSubmit={handleSubmit} >
            <ImageInput type="file" name="image" id="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={handleImageSelect}/>
            <ImageSubmitButton type="submit" className='btn'>画像投稿</ImageSubmitButton>
          </ImageForm>

          {/* 絵を投稿する機能 */}
          <CanvasArea>
            <Canvas width={300} height={300} setCanvasUrl={setCanvasUrl}/>
            <CanvasSubmitButton className='btn' onClick={sendCanvas} >絵を投稿</CanvasSubmitButton>
          </CanvasArea>
        </InputArea>
      </Main>
    </>
  )
}