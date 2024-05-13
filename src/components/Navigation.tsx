import { Link } from 'react-router-dom';

type LinkType = {
  path: string,
  value: string
}

function Navigation() {
  const links: LinkType[] = [
    { path: '/', value: 'Home' },
    { path: '/projects', value: 'View my projects' },
    { path: '/about', value: 'About me' }
  ];

  return (
      <nav>
         <ul>{links.map((link: LinkType, index: number) => (
             <li key={index}>
               <Link className='app-link' to={link.path}>
                 {link.value}
               </Link>
             </li>
         ))}</ul>
      </nav>
  );
}

export default Navigation;