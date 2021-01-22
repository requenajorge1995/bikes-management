import React, { useRef, useState } from 'react';

import TextInput from '../text-input/text-input';

function WithDelayTextInput(props: Props) {
  const { name, delayedHandleChange, delay = 1000 } = props;
  const [value, setValue] = useState('');

  const timeoutRef = useRef({} as NodeJS.Timeout);

  return (
    <TextInput
      name={name}
      value={value}
      handleChange={(event) => {
        const text = event.target.value;
        setValue(text);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => delayedHandleChange(text), delay);
      }}
    />
  );
}

type Props = {
  name: string;
  delayedHandleChange(input: string): void;
  delay?: number;
};

export default WithDelayTextInput;
