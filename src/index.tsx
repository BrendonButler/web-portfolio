import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import './styles/normalize.css';
import './styles/home.less';
import { NotFound, ServerError } from './components/Errors';
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

const Header = function () {
  return (
      <header>
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
      <div className='app'>
        <Header />
        <Content show={true} />
      </div>
  );
}

const root = ReactDOM.createRoot(
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