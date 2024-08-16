import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes as Switch, Route, useLocation } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/app.css';
import './styles/components.less';
import { NotFound, ServerError } from './components/Errors';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Overlay } from './components/Overlay';
import portrait from './assets/brendon-small.png';
import Projects from './pages/projects/Projects';

const Header = function () {
  const { pathname } = useLocation();
  const isHomePage: boolean = pathname === '/';

  // look into using something like Framer Motion to animate changes in header styling
  return (
    <header className={!isHomePage ? 'inline' : ''}>
      <img id='profile-image' src={portrait} alt='Brendon Butler' />
      <div id={'header-right-content'}>
        <h1>Brendon Butler</h1>
        <hr />
        <span id='tagline'>
          I'm a software developer who's working towards a better understanding of web and
          application development
        </span>
        <Navigation />
      </div>
    </header>
  );
};

const Content = function () {
  return (
    <main id='app-content-pane'>
      <Switch>
        {/* Page routes */}
        <Route index path='/' element={<Home />} />
        <Route index path='/projects' element={<Projects />} />
        {/* Error pages */}
        <Route path='/500' element={<ServerError />} />
        <Route path='*' element={<NotFound />} />
      </Switch>
    </main>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <Overlay socialIconSize={30} />
        <Header />
        <Content />
      </div>
    </ThemeProvider>
  );
}

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

export default App;
