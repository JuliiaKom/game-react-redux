
import css from './ChatBox.module.scss';

const MessagesList = ({ messages }) => {
  return (
    <div className={css.messages}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`${css.message} ${msg.sender === 1 ? css.fromPlayer1 : css.fromPlayer2}`}
        >
          <div className={css.text}>
            {msg.text}
            <div className={css.time}>{msg.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
