import React from 'react';

import './table.css';
import { Schedule } from '../../types';
import Block from '../block/block';

function Table(props: Props) {
  const { schedule } = props;

  return (
    <div className="table">
      {Object.keys(schedule)
        .map(parseFloat)
        .sort((a, b) => a - b)
        .map((time, index) => (
          <Block key={index} time={time} {...schedule[time]} />
        ))}
    </div>
  );
}

type Props = {
  schedule: Schedule;
};

export default Table;
