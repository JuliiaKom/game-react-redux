import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../features/chatSlice';
import css from './ChatBox.module.scss';
import xChutIcon from '../icons/xChut.png';
import oChutIcon from '../icons/oChut.png';
import { PLAYER_X, PLAYER_O } from '../constants/constants';
import MessagesList from './MessagesList';

const ChatBox = ({ player }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const messagesContainerRef = useRef(null);
  const handleSend = () => {
    if (text.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dispatch(sendMessage({
        sender: player === 'X' ? PLAYER_X : PLAYER_O,
        text,
        time: currentTime,
      }));
      setText('');
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={css.chatbox}>
      <div className={css.chatHeader}>
        <div className={css.chutImg}>
          <img
            src={player === 'X' ? xChutIcon : oChutIcon}
            alt={player}
            className={css.chutIcon}
          />

        </div>

        Player {player === 'X' ?  PLAYER_X : PLAYER_O}

      </div>

      {/* <div className={css.messages} ref={messagesContainerRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${css.message} ${msg.sender === PLAYER_X ? css.fromPlayer1 : css.fromPlayer2}`}>
            <div className={css.text}>
              {msg.text}
              <div className={css.time}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div> */}
       <MessagesList messages={messages} ref={messagesContainerRef} />

      <div className={css.input}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
        />
        <button className={css.chutButton} onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};

export default ChatBox;
