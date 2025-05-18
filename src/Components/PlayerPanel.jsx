import { useDispatch, useSelector } from 'react-redux';
import { makeMove } from '../features/gameSlice';
import ChatBox from './ChatBox';
import css from './PlayerPanel.module.scss';
import CircleIcon from '../icons/o.png';
import CrossIcon from '../icons/Vector.png';

function getStatusMessage({ status, board, winningLine, freeze, currentPlayer, player }) {
  const isMyTurn = currentPlayer === player && !freeze;
  const isGameWon = status === 'won';
  const isDraw = board.every(cell => cell) && !winningLine;

  if (isGameWon) {
    return player === currentPlayer ? 'You win!' : 'You lost!';
  }

  if (isDraw) {
    return 'Draw';
  }

  if (freeze && !isMyTurn) {
    return 'Game started! Wait your opponent.';
  }

  if (isMyTurn) {
    return 'Your turn:';
  }

  return 'Wait your opponent.';
}

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

  // Cell click handler
  const handleClick = (index) => {
    if (isMyTurn) {
      dispatch(makeMove(index));
    }
  };

  return (
    <div className={css.playerPanel}>
      <div className={css.playerHeader}>
        <p
          className={`${css.statusMessage} ${status === 'won'
            ? player === currentPlayer
              ? css.winMessage
              : css.loseMessage
            : css.neutralMessage
            }`}
        >
          {statusMessage}
        </p>

      </div>

      <div className={css.board}>


        {/* WIN LINE */}
        {winningLine && (
          <>
            {[0, 1, 2].every(i => winningLine.includes(i)) && (
              <div className={css.lineTop} />
            )}
            {[3, 4, 5].every(i => winningLine.includes(i)) && (
              <div className={css.lineMiddle} />
            )}
            {[6, 7, 8].every(i => winningLine.includes(i)) && (
              <div className={css.lineBottom} />
            )}
            {[0, 3, 6].every(i => winningLine.includes(i)) && (
              <div className={css.lineLeft} />
            )}
            {[1, 4, 7].every(i => winningLine.includes(i)) && (
              <div className={css.lineCenter} />
            )}
            {[2, 5, 8].every(i => winningLine.includes(i)) && (
              <div className={css.lineRight} />
            )}
            {[0, 4, 8].every(i => winningLine.includes(i)) && (
              <div className={css.lineDiagonalRight} />
            )}
            {[2, 4, 6].every(i => winningLine.includes(i)) && (
              <div className={css.lineDiagonalLeft} />
            )}
          </>
        )}


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
