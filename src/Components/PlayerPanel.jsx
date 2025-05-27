import { useDispatch, useSelector } from 'react-redux';
import { makeMove } from '../features/gameSlice';
import ChatBox from './ChatBox';
import css from './PlayerPanel.module.scss';
import CircleIcon from '../icons/o.png';
import CrossIcon from '../icons/Vector.png';
import { getStatusMessage } from '../features/gameUtils';
import { GAME_STATUS } from '../constants/gameMessages';


const PlayerPanel = ({ player }) => {
  const dispatch = useDispatch();

  const {
    board,
    currentPlayer,
    status,
    winningLine,
    freeze
  } = useSelector(state => state.game);

  const isMyTurn = currentPlayer === player && !freeze;

  const statusMessage = getStatusMessage({ status, board, winningLine, freeze, currentPlayer, player });


  // status message
  let messageClass = css.neutralMessage;
  if (status === GAME_STATUS.WON) {
    if (player === currentPlayer) {
      messageClass = css.winMessage;
    } else {
      messageClass = css.loseMessage;
    }
  }

  // Cell click handler
  const handleClick = (index) => {
    if (isMyTurn) {
      dispatch(makeMove(index));
    }
  };

  return (
    <div className={css.playerPanel}>
      <div className={css.playerHeader}>
        <p className={`${css.statusMessage} ${messageClass}`}>
          {statusMessage}
        </p>
      </div>

      <div className={css.board}>

        {board.map((cell, i) => {
          const isWinningCell = winningLine?.includes(i);

          return (

            <div
              key={i}
              className={[
                css.cell,
                i > 2 && css.borderTop,
                i % 3 !== 0 && css.borderLeft,

                isWinningCell && css.winningCell
              ].filter(Boolean).join(' ')}
              onClick={() => handleClick(i)}
            >
              {cell === 'X' && <img src={CrossIcon} alt="X" className={css.icon} />}
              {cell === 'O' && <img src={CircleIcon} alt="O" className={css.icon} />}
            </div>
          );
        })}

      </div>

      <div className="chatContainer">
        <ChatBox player={player} />
      </div>
    </div>
  );
};

export default PlayerPanel;
