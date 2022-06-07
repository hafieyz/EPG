import { useContext } from 'react';

import { ThemeContext } from '../ThemeContext';
import ChannelRow from './ChannelRow';

// Seems like the https://img.noriginmedia.com/ is unavailable
// Use static files instead
// eslint-disable-next-line import/no-unresolved
import logos from '../assets/*.png';

const ChannelOverview = ({ channels }) => {
  const { isLight } = useContext(ThemeContext);
  const today = channels[0].schedules[0].start;
  const [day, date] = new Date(today)
    .toLocaleString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric' })
    .split(', ');

  const hours = [...new Array(24)].map((_, i) => String(i).padStart(2, '0') + ':00');

  return (
    <main className="chart">
      <div className="headers">
        <div className={`chart-row-item ${isLight ? 'chart-row-item-light' : ''}`}>
          <span>{day}</span>
          <span>{date}</span>
        </div>
        {channels.map((channel) => (
          <div key={channel.title} className={`chart-row-item ${isLight ? 'chart-row-item-light' : ''}`}>
            <img className="channel-logo" src={logos[channel.id]} alt={channel.title} />
          </div>
        ))}
      </div>

      <div className="rows">
        <div className="chart-row chart-period">
          {hours.map((hour, index) => (
            <div className={`hour ${isLight ? 'hour-light' : ''}`} key={hour}>
              <span>{index !== 0 && hour}</span>
            </div>
          ))}
        </div>
        {channels.map((channel) => (
          <ChannelRow key={channel.id} schedules={channel.schedules} />
        ))}
      </div>
    </main>
  );
};

export default ChannelOverview;
