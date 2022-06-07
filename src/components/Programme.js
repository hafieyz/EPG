import { useContext, useState } from 'react';

import { formatTimeSlot, getCurrentTimeInMillis, getTimeInMillis } from '../utils';

import { ThemeContext } from '../ThemeContext';
import Modal from './Modal';

const Programme = ({ programme }) => {
  const { start, end, duration, title } = programme;
  const { isLight } = useContext(ThemeContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  const now = getCurrentTimeInMillis();
  const startInMillis = getTimeInMillis(start);
  const endInMillis = getTimeInMillis(end);

  const isLive = now > startInMillis && now < endInMillis;
  const timeSlot = formatTimeSlot(start, end);

  return (
    <>
      <button
        style={{ width: duration }}
        className={`programme ${isLive ? 'programme-live' : ''} ${isLight ? 'programme-light' : ''}`}
        onClick={toggleModal}
      >
        {title}
        <br />
        <small>{timeSlot}</small>
      </button>
      {isModalOpened && <Modal title={title} onClick={toggleModal}></Modal>}
    </>
  );
};

export default Programme;
