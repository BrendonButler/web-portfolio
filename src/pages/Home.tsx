import { Fragment } from 'react';

function Home() {
  return (
      <Fragment>
        <section id='programming'>
          <h2>Programming</h2>
          <ul>
            <li><a href="http://code.sparkzz.net/">Projects</a></li>
            <li><a href="http://dl.sparkzz.net/">Downloads</a></li>
          </ul>
        </section>
        <section id='videography'>
          <h2>Videography</h2>
          <ul>
            <li><a href="https://www.youtube.com/playlist?list=PLg1YNjiV6PdviTB0NdEsoWRq9ZotMwgtZ">Videos</a></li>
            <li><a href="#">Gear</a></li>
          </ul>
        </section>
        <section id='contact'>
          <h2>Contact</h2>
          <ul>
            <li><a href="http://linkedin.com/in/brendon-butler-19683797/">LinkedIn</a></li>
            <li><a href="http://github.com/BrendonButler">GitHub</a></li>
            <li><a href="mailto:contact@sparkzz.net">Contact</a></li>
          </ul>
        </section>
      </Fragment>
  );
}

export default Home;