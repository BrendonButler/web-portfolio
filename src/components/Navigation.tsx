import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import portrait from '../assets/brendon-small.png';

type LinkType = {
  path: string,
  value: string
}

function Navigation() {
  const location = useLocation();
  const activePath: string = location.pathname;
  const links: LinkType[] = [
    { path: '/', value: 'Home' },
    { path: '/projects', value: 'View my projects' },
    { path: '/about', value: 'About me' }
  ];

  return (
      <Fragment>
        <img id="profile-image" src={portrait} alt='Photo of Brendon Butler' />
        <h1>Brendon Butler</h1>
        <hr />
        <p><span id="tagline">I'm a software developer who's working towards a better understanding of web and application development</span></p>
      </Fragment>
  );
}

export default Navigation;