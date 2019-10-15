import React from 'react';
import './Modal.css';

export default function Modal({ closeModal }) {
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('Copied shareable URL to clipboard.');
      })
      .catch(() => alert('Was unable to copy to clipboard'));
  };

  return (
    <React.Fragment>
      <div className='modal-backdrop' onClick={closeModal} />
      <div className='modal'>
        <img
          className='modal-close-button'
          src='/img/icons8-close-window-50.png'
          alt='close modal icon'
          onClick={closeModal}
        />
        <h2>Share this link!</h2>
        <div className='modal-textbox'>
          <input
            className='modal-textarea'
            type='button'
            size='70'
            value={window.location.href}
            onClick={() => handleCopyToClipboard()}
          ></input>
          <img
            className='modal-clipboard-button'
            src='/img/icons8-clipboard-50.png'
            alt='copy to clipboard icon'
            onClick={handleCopyToClipboard}
          ></img>
        </div>
      </div>
    </React.Fragment>
  );
}
