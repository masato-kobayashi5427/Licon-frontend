import { useState, useMemo, useEffect } from 'react';
import ActionCable from 'actioncable';

export default function Chat(props) {
  const [receivedMessage, setReceivedMessage] = useState();
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [subscription, setSubscription] = useState();

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

  const handleSend = () => {
    // inputをサーバーに送信
    // chat_channel.rbのchatメソッドに送信
    subscription?.perform('chat', { body: input });
    setInput('');
  };

  useEffect(() => {
    console.log(receivedMessage);
    if (!receivedMessage) return;
    const { sender, body } = receivedMessage;
    setText(text.concat("\n", `${sender}: ${body}`));
  }, [receivedMessage]);

  useEffect(() => {
    const history = document.getElementById('history');
    history?.scrollTo(0, history.scrollHeight);
  }, [text]);

  const onChangeInput = (e) => {
    setInput(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        {text}
        <textarea id="history" readOnly style={{ width: "500px", height: "200px" }} value={text} />
      </div>
      <div>
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{ width: "400px", marginRight: "10px" }}
          onChange={onChangeInput}
          value={input}
        />
        <button onClick={handleSend} disabled={input === ''}>
          send
        </button>
      </div>
    </div >
  );
}