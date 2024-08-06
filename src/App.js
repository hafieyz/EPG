import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { formatStr } from './utils';

import { ThemeContext } from './ThemeContext';

import ChannelOverview from './components/ChannelOverview';
import Navbar from './components/Navbar';

const App = () => {
  const { isLight } = useContext(ThemeContext);
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(document.getElementsByClassName('line')).current[0];

  const handleSearch = (e) => {
    const newChannels = channels.filter((channel) =>
      channel.schedules.some((schedule) => formatStr(schedule.title).includes(formatStr(e.target.value))),
    );
    setFilteredChannels(newChannels);
  };

  const scrollToLive = useCallback(() => {
    if (!ref) return;

    ref.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [ref]);

  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/AqFad2811/epg/main/epg.xml'')
      .then((res) => res.json())
      .then(({ channels }) => setChannels(channels))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  if (error) return <h2>There was an error...</h2>;
  if (loading) return <h2>Loading...</h2>;
  if (channels.length === 0) return <h2>There are no channels available</h2>;

  return (
    <div className={`main ${isLight ? 'light' : ''}`}>
      <Navbar handleSearch={handleSearch} />
      {filteredChannels && filteredChannels.length === 0 ? (
        <h2>No Channels include content you searched for</h2>
      ) : (
        <ChannelOverview channels={filteredChannels || channels} />
      )}
      <button className="live" onClick={scrollToLive}>
        NOW
      </button>
    </div>
  );
};

export default App;
