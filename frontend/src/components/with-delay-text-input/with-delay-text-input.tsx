import React, { useState } from 'react';

import TextInput from '../text-input/text-input';

function WithDelayTextInput(props: Props) {
  const { name, delayedHandleChange, delay = 1000 } = props;

  const [value, setValue] = useState('');
  const [currentTimeout, setCurrentTimeout] = useState({} as NodeJS.Timeout);

  return <TextInput name={name} value={value} handleChange={handleChange} />;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setValue(input);
    clearTimeout(currentTimeout);
    setCurrentTimeout(setTimeout(() => delayedHandleChange(input), delay));
  }
}

type Props = {
  name: string;
  delayedHandleChange(input: string): void;
  delay?: number;
};

export default WithDelayTextInput;
