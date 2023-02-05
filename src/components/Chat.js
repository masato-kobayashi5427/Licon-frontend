import { useState, useMemo, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import ActionCable from 'actioncable';

export default function Chat(props) {
  const [receivedMessage, setReceivedMessage] = useState();
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [subscription, setSubscription] = useState();
  const [chats, setChats] = useState([]);

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


  useEffect(() => {
    if (!receivedMessage) return;
    const { sender, body } = receivedMessage;
    setText(text.concat("\n", `${sender}: ${body}`));
    console.log(text)
  }, [receivedMessage]);

  useEffect(() => {
    console.log(text)
    const history = document.getElementById('history');
    history?.scrollTo(0, history.scrollHeight);
  }, [text]);

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

  useEffect(() => {
    if (!chats) return;
    console.log(chats)
    ChatList(chats)
    console.log(props.episode_room_id)
  }, [chats]);

  const ChatList = (chats) => {
    return (
      <>
      {chats.map((val) => {
        return(<div>{val.user.nickname}: {val.content}</div>)
      })}
      </>
  )};

  const handleSend = (event) => {
    // inputをサーバーに送信
    // chat_channel.rbのchatメソッドに送信
    subscription?.perform('chat', { body: input });
    axios.post(`http://localhost:3001/episode_rooms/${props.episode_room_id}/chats`,
    {
      chat: {
      content: input,
      episode_room_id: props.episode_room_id
    }
    },
    { withCredentials: true }
    ).then(response => {
      console.log(response)
      event.preventDefault()
      setInput('');
    }).catch(error => {
        console.log("create episode error", error)
    })
  };

  const TextArea = styled.textarea`
    border: none;
  `

  return (
    <div>
      <div id="history">
        {ChatList(chats)}
        <TextArea readOnly value={text} />
      </div>
      <div>
        <input
          type="text"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSend();
            }
          }}
          style={{ width: "400px", marginRight: "10px" }}
          onChange={event => setInput(event.currentTarget.value)}
        />
        <button onClick={handleSend} disabled={input === ''}>
          send
        </button>
      </div>
    </div >
  );
}