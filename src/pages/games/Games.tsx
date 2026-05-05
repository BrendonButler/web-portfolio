import '../../styles/games.less';
import '../../styles/projects.less';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type Game from '../../types/Game';
import Card from '../../components/cards/Card';

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/assets/games.json')
      .then((response) => response.json())
      .then((data: Game[]) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <div id='game-list'>
      {games.map((game, index) => (
        <li
          key={index}
          className='project-minimal'
          onClick={() => navigate(`/games/${game.slug}`)}>
          <Card
            as='article'
            id={game.slug}
            className='preview-card'
            body={
              <div className='preview-card-info'>
                <div className='project-card-title'>
                  <h2>{game.title}</h2>
                </div>
                <p>{game.shortDescription}</p>
                <p className='game-engine-label'>{game.engine}</p>
              </div>
            }
          />
        </li>
      ))}
    </div>
  );
}

export default Games;
