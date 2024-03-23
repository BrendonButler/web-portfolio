import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/components.less';
import { NotFound, ServerError } from './components/Errors';
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { ThemeProvider } from './contexts/ThemeProvider';
import { ThemeToggleButton } from "./components/Overlay";
import portrait from "./assets/brendon-small.png";

const Header = function () {
  return (
      <header>
        <img id="profile-image" src={portrait} alt='Brendon Butler' />
        <h1>Brendon Butler</h1>
        <hr />
        <span id="tagline">I'm a software developer who's working towards a better understanding of web and application development</span>
        <Navigation />
      </header>
  );
}

const Content = function (props: { show: boolean }) {
  return (
      <main className={'app-content-pane ' + (props.show ? '' : 'hidden')}>
        <Switch>
          {/* Page routes */}
          <Route index path='/' element={<Home />} />
          {/* Error pages */}
          <Route path='/500' element={<ServerError />} />
          <Route path='*' element={<NotFound />} />
        </Switch>
      </main>
  )
}

function App() {
  return (
      <ThemeProvider>
        <div className='app'>
          <ThemeToggleButton />
          <Header />
          <Content show={true} />
        </div>
      </ThemeProvider>
  );
}

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
);

export default App;