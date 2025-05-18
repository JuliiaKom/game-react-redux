import { useSelector, useDispatch } from 'react-redux';
import { fullReset } from '../features/gameSlice';
import { clearChat } from '../features/chatSlice';
import css from './GameInfoPanel.module.scss';

const GameInfoPanel = () => {
  const dispatch = useDispatch();
  const { score } = useSelector((state) => state.game);

  const handleReset = () => {
    dispatch(fullReset());
    dispatch(clearChat());
  };

  return (
    <div className={css.panel}>
      <span className={css.player}>Player 1</span>
      <span className={css.score}>Score: {score.X}:{score.O}</span>
      <button className={css.resetButton} onClick={handleReset}>Reset</button>
      <span className={css.player}>Player 2</span>
    </div>
  );
};

export default GameInfoPanel;
