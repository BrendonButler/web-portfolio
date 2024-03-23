import { Link, useLocation } from 'react-router-dom';

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

  return activePath !== '/' ? (
      <nav>
         <ul>{links.map((link: LinkType, index: number) => (
             link.path !== activePath && (
                 <li key={index}>
                   <Link className='app-link' to={link.path}>
                     {link.value}
                   </Link>
                 </li>
             )
         ))}</ul>
      </nav>
  ) : null;
}

export default Navigation;