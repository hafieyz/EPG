import { useEffect, useState } from 'react';

import { getCurrentTimeInMillis, getDateStartInMillis, getTimeInMillis, convertMillisToMins } from '../utils';

import Programme from './Programme';

const MINUTES_IN_DAY = 1440;
const HOUR_REMS = 20; // Because one hour is represented as 20rem in the top row

const ChannelRow = ({ schedules }) => {
  const dayStartInMillis = getDateStartInMillis(schedules[0].start);
  const initTimeInMillis = getCurrentTimeInMillis();
  const [linePosition, setLinePosition] = useState(convertMillisToMins(initTimeInMillis - dayStartInMillis));
  const linePositionInPercent = (100 * linePosition) / MINUTES_IN_DAY + '%';

  const programmes = schedules.map((schedule) => {
    const startInMillis = getTimeInMillis(schedule.start) - dayStartInMillis;
    const endInMillis = getTimeInMillis(schedule.end) - dayStartInMillis;
    const startInMins = convertMillisToMins(startInMillis);
    const endInMins = convertMillisToMins(endInMillis);
    const duration = ((endInMins - startInMins) * HOUR_REMS) / 60 + 'rem';

    return { ...schedule, duration };
  });

  useEffect(() => {
    const currentTimeInMillis = getCurrentTimeInMillis();
    const timeout = setTimeout(
      () => setLinePosition(Math.floor(currentTimeInMillis - dayStartInMillis) / 1000 / 60),
      1000,
    );

    return () => clearTimeout(timeout);
  }, [dayStartInMillis, linePosition]);

  return (
    <div className="chart-row channel-row">
      <div style={{ left: linePositionInPercent }} className="line"></div>
      <div className="programmes">
        {programmes.map((programme) => (
          <Programme programme={programme} key={programme.start} />
        ))}
      </div>
    </div>
  );
};

export default ChannelRow;
