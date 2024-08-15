import Button from '../../types/Buttons';

const DownloadButton = ({ button }: { button: Button }) => {
  const buttonClass: string = `button ${button.class || ''} ${button.active ? '' : 'inactive'}`;

  return (
    <button id={button.id} className={buttonClass.trim()} onClick={button.onClick}>
      <span className='button-text'>{button.text}</span>
      {button.subText && <span className='button-subtext'>{button.subText}</span>}
    </button>
  );
};

export default DownloadButton;
