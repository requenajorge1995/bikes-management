import React, { useContext } from 'react';
import classNames from 'classnames';

import './block.css';

import { numberToTime } from '../../utils';

import { UserContext } from '../app/app';

import { API_URL } from '../../config';

function Block(props: Props) {
  const { time, bikesAvailable, bookedByUser } = props;
  const { user, userInteraction } = useContext(UserContext);

  return (
    <div
      className={classNames('block', {
        booked: bookedByUser,
        full: !bikesAvailable && !bookedByUser,
      })}
      onClick={onClick}
    >
      <span className="time">
        {numberToTime(time)} - {numberToTime(time + 0.5)}
      </span>
      <span className="bikes">Bikes available: {bikesAvailable}/8</span>
      {bookedByUser && <span className="booked-message">✅</span>}
    </div>
  );

  async function onClick() {
    const uri = `${API_URL}/${bookedByUser ? 'cancel' : 'book'}`;
    const res = await fetch(uri, {
      headers: {
        Username: user,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ time: time.toString() }),
    });
    if (!res.ok) alert(await res.text());
    userInteraction();
  }
}

type Props = {
  time: number;
  bikesAvailable: number;
  bookedByUser: boolean;
};

export default Block;
