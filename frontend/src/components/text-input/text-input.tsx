import React from 'react';

import './text-input.css';

function TextInput(props: Props) {
  const { name, value, handleChange } = props;

  return (
    <label className="text-input-label">
      {name}:
      <input type="tex-input" value={value} onChange={handleChange} />
    </label>
  );
}

type Props = {
  name: string;
  value: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default TextInput;
