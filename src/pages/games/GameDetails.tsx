import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type Game from '../../types/Game';
import Card from '../../components/cards/Card';
import SideCard from '../../components/cards/SideCard';

function GameDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/assets/games.json')
      .then((response) => response.json())
      .then((data: Game[]) => {
        const found = data.find((g) => g.slug === slug);
        if (found) {
          setGame(found);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, [slug]);

  if (notFound) {
    navigate('/404');
    return null;
  }

  if (!game) return null;

  return (
    <div id='game'>
      <Card
        as='article'
        className='project-card header-card'
        id={game.slug}
        body={
          <div className='project-card-info'>
            <div className='project-card-title'>
              <span id='back-button' onClick={() => navigate('/games')}>
                ..
              </span>
              <h2>{game.title}</h2>
            </div>
            <p>{game.shortDescription}</p>
          </div>
        }
      />

      <div id='game-panel'>
        <div className='game-embed-card'>
          <iframe
            src={game.embedPath}
            title={game.title}
            style={{ aspectRatio: game.aspectRatio }}
          />
        </div>

        <aside className='side-cards'>
          <SideCard props={{ id: game.slug, title: 'Game Info' }}>
            <table>
              <tbody>
                <tr>
                  <td>Engine</td>
                  <td>{game.engine}</td>
                </tr>
                <tr>
                  <td>Version</td>
                  <td>{game.version}</td>
                </tr>
                <tr>
                  <td>Released</td>
                  <td>{game.releaseDate}</td>
                </tr>
              </tbody>
            </table>
          </SideCard>

          <SideCard props={{ id: `${game.slug}-controls`, title: 'Controls' }}>
            <ul>
              {game.controls.map((control, index) => (
                <li key={index}>{control}</li>
              ))}
            </ul>
          </SideCard>
        </aside>
      </div>
    </div>
  );
}

export default GameDetails;
