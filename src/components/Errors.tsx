export function NotFound() {
  return (
      <div className='error-page'>
        <h1>404</h1>
        <p>the page you are looking for does not exist</p>
      </div>
  );
}

export function ServerError() {
  return (
      <div className='error-page'>
        <h1>500</h1>
        <p>an error has occurred -- please try again in a few minutes</p>
      </div>
  );
}