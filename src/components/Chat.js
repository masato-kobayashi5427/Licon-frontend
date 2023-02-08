import { useState, useMemo, useEffect, useContext } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import ActionCable from 'actioncable';
import { UserData} from '../App'

// const TextArea = styled.textarea`
// border: none;
// `

const ImageContent = styled.img`
  width:auto;
  height:100%;
  transition: 0.5s;
  margin: auto;
  transform-origin: 0% 0%;
  &:hover { 
    transform: scale(2) 
  }
`

const ImageBox = styled.div`
  height: 200px;
  width: 200px;
  padding-top: 20px
  background-color: #e0e0e0;
`

const UserChat = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  float: right;
`

const AnotherChat = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  : right;
`

export default function Chat(props) {
  const [receivedMessage, setReceivedMessage] = useState();
  const [text, setText] = useState();
  const [input, setInput] = useState('');
  const [subscription, setSubscription] = useState();
  const [chats, setChats] = useState([]);
  const [image, setImage] = useState({data: "", name: ""})

  const userData =useContext(UserData);

  // Action Cableに接続
  const cable = useMemo(() => ActionCable.createConsumer('http://localhost:3001/cable', { withCredentials: true }), []);

  useEffect(() => {
    // ChatChannelをサブスクライブ
    // receivedにメッセージを受信した時のメソッドを設定します。
    // 今回はreceivedMessageにメッセージをセットします。
    const sub = cable.subscriptions.create({ channel: "ChatChannel", room_id: props.episode_room_id }, {
      received: (msg) => setReceivedMessage(msg)
    });
    setSubscription(sub);
  }, [cable]);

// チャットHTMLの挿入
  useEffect(() => {
    if (!receivedMessage) return;
    console.log(receivedMessage)
    const { sender, body } = receivedMessage;
    if (body.includes('http://')) {
      setText([text, <ImageBox><ImageContent src={body} alt="画像"></ImageContent></ImageBox>]);
    } 
    else {
      setText([text, <div id="chat">{sender}:{body}</div>]);
    }

    console.log(text)
  }, [receivedMessage]);
  
// 最新のチャットまでスクロール
  useEffect(() => {
    console.log(text)
    const history = document.getElementById('history');
    history?.scrollTo(0, history.scrollHeight);
  }, [text]);

// チャット履歴を取得
  useEffect(() => {
    axios.get(`http://localhost:3001/episode_rooms/${props.episode_room_id}/chats`, { withCredentials: true })
    .then(resp => {
      setChats(resp.data)
      console.log(chats)
    })
    .catch(e => {
      console.log(e);
    })
  }, [props.episode_room_id])

// チャット履歴を表示
  useEffect(() => {
    if (!chats) return;
    ChatList(chats, props.user_id)
    console.log(userData)
  }, [chats]);
  
// チャットを並べる
  const ChatList = (chats, user_id) => {
    return (
      <>
      {chats.map((val, key) => {
        if ((val.image_url == null) && (val.user.id === userData.id)) {
          return(<UserChat><div key={key}>{val.user.nickname}: {val.content}</div></UserChat>)
        } 
        else if (val.image_url === !null && val.user.id === user_id) {
          return(<UserChat><ImageBox><ImageContent src={val.image_url} alt="画像"></ImageContent></ImageBox></UserChat>)
        }
        else if (val.image_url === null && val.user.id === !user_id) {
          return(<AnotherChat><div key={key}>{val.user.nickname}: {val.content}</div></AnotherChat>)
        }
        else {
          return(<AnotherChat><ImageBox><ImageContent src={val.image_url} alt="画像"></ImageContent></ImageBox></AnotherChat>)
        }
      })}
      </>
  )};

  const handleSend = (event) => {
    // inputをサーバーに送信
    // chat_channel.rbのchatメソッドに送信
    axios.post(`http://localhost:3001/episode_rooms/${props.episode_room_id}/chats`,
    {
      chat: {
      content: input,
      episode_room_id: props.episode_room_id
    }
    },
    { withCredentials: true }
    ).then(response => {
      subscription?.perform('chat', { body: input });
      setInput("")
    }).catch(error => {
      console.log("create episode error", error)
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
			console.log(files[0])
		}
	}

  const handleSubmit = (event) => {
    axios.post(`http://localhost:3001/episode_rooms/${props.episode_room_id}/chats`,
      {
        chat: {
				image: image,
        episode_room_id: props.episode_room_id
      }
    },
    { withCredentials: true }
    ).then(response => {
      console.log(response)
			console.log(response.data.chat.image_url)
      subscription?.perform('chat', { body: response.data.chat.image_url });
    }).catch(error => {
        console.log("create chat error", error)
    })
    event.preventDefault()
	}


  return (
    <div>
      <div id="history">
        {ChatList(chats)}
        <div id="chatHistory"></div>
        {text}
      </div>
      <div>
        <input
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
        <button onClick={handleSend} disabled={input === ''}>
          send
        </button>
        {/* 画像投稿機能 */}
        <form onSubmit={handleSubmit} className="form" >
          <input type="file" name="image" id="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={handleImageSelect}/>
					<button type="submit" className='btn'>画像投稿</button>
        </form>
      </div>
    </div >
  );
}