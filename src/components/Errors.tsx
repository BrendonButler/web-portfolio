function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function NotFound() {
  const message: string[] = [
      "the page you are looking for does not exist!",
      "your princess is in another castle!",
      "the lost levels...",
      "I am error",
      "when ya don’t care ‘bout somethin’, ya ‘couldn’t care less.’ if ya ‘could care less,’ that means ya still care. it ain’t that tough. ‘couldn’t care’ means ya don’t care. stop carin’ 'bout stuff ya don’t care 'bout!"
  ];

  const randomErrorMessage: string = message[randomNumber(0, message.length - 1)];

  return (
      <div id='error-page'>
        <h1>404</h1>
        <p>{randomErrorMessage}</p>
      </div>
  );
}

export function ServerError() {
  const message: string[] = [
      "an error has occurred -- please try again in a few minutes",
      "think about it, will ya? what, you wanna fix all the things that go wrong? you wanna snap your fingers and erase your screw-ups? sure, who don’t?",
      "it's time to debug code and chew bubble gum...and I'm all outta gum"
  ];

  const randomErrorMessage: string = message[randomNumber(0, message.length - 1)];

  return (
      <div id='error-page'>
        <h1>500</h1>
        <p>{randomErrorMessage}</p>
      </div>
  );
}