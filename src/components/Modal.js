import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ title, onClick }) => {
  const ref = useRef(null);
  if (!ref.current) ref.current = document.createElement('div');

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(ref.current);

    return () => modalRoot.removeChild(ref.current);
  }, []);

  return createPortal(
    <>
      <h2>{title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ullamcorper morbi tincidunt ornare massa. Feugiat sed lectus vestibulum mattis ullamcorper velit.
        Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Turpis nunc eget lorem dolor sed
        viverra ipsum nunc aliquet. Lectus proin nibh nisl condimentum id venenatis. Amet venenatis urna cursus eget
        nunc scelerisque viverra. Hac habitasse platea dictumst quisque sagittis purus sit amet.
      </p>
      <p>
        Justo nec ultrices dui sapien eget mi proin. Massa enim nec dui nunc mattis enim ut. Morbi blandit cursus risus
        at ultrices mi tempus imperdiet nulla. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit.
        Penatibus et magnis dis parturient montes nascetur ridiculus.
      </p>
      <button className="button-modal" onClick={onClick}>
        Close
      </button>
    </>,
    ref.current,
  );
};

export default Modal;
