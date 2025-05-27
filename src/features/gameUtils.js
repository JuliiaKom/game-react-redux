import { GAME_STATUS, MESSAGES } from '../constants/gameMessages';

export function getStatusMessage({ status, board, winningLine, freeze, currentPlayer, player }) {
  const isMyTurn = currentPlayer === player && !freeze;
  const isGameWon = status === GAME_STATUS.WON;
  const isDraw = board.every(cell => cell) && !winningLine;

  if (isGameWon) {
    return player === currentPlayer ? MESSAGES.WIN : MESSAGES.LOSE;
  }

  if (isDraw) {
    return MESSAGES.DRAW;
  }

  if (freeze && !isMyTurn) {
    return MESSAGES.WAIT_START;
  }

  if (isMyTurn) {
    return MESSAGES.YOUR_TURN;
  }

  return MESSAGES.WAIT_OPPONENT;
}


// logic with winningLine
export function getWinningLineClassNames(winningLine, css) {
  if (!winningLine) return [];

  const lineClasses = [];

  const check = (combo, className) => {
    if (combo.every(i => winningLine.includes(i))) {
      lineClasses.push(css[className]);
    }
  };

  check([0, 1, 2], 'lineTop');
  check([3, 4, 5], 'lineMiddle');
  check([6, 7, 8], 'lineBottom');
  check([0, 3, 6], 'lineLeft');
  check([1, 4, 7], 'lineCenter');
  check([2, 5, 8], 'lineRight');
  check([0, 4, 8], 'lineDiagonalRight');
  check([2, 4, 6], 'lineDiagonalLeft');

  return lineClasses;
}
