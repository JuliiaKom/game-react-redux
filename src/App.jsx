import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from './features/gameSlice';
import PlayerPanel from './Components/PlayerPanel'
import GameInfoPanel from './Components/GameInfoPanel';
import css from './App.module.scss'; 
import './styles/variables.scss';


const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.game);

  useEffect(() => {
    if (status !== 'playing') {
      const timer = setTimeout(() => {
        dispatch(resetGame());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div className={css.appContainer}>
      <GameInfoPanel />
      <div className={css.playersContainer}>
        <PlayerPanel  player={'X'}/>
        <PlayerPanel  player={'O'}/>
      </div>
    </div>
  );
};

export default App;
