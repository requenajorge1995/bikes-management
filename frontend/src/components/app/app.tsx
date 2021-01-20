import React, { useState } from 'react';

import './app.css';

import { useSchedule } from './useSchedule';
import WithDelayTextInput from '../with-delay-text-input/with-delay-text-input';
import LoaderAnimation from '../loader-animation/loader-animation';
import Table from '../table/table';

export const UserContext = React.createContext({
  user: '',
  userInteraction() {},
});

function App() {
  const [user, setUser] = useState('');
  const [userInteractionToggle, setUserInteractionToggle] = useState(false);

  const { schedule, ...loaderProps } = useSchedule(user, userInteractionToggle);

  return (
    <UserContext.Provider
      value={{
        user,
        userInteraction: () => setUserInteractionToggle(!userInteractionToggle),
      }}
    >
      <div className="App">
        <WithDelayTextInput name="Username" delayedHandleChange={setUser} />
        <LoaderAnimation {...loaderProps}>
          <Table schedule={schedule} />
        </LoaderAnimation>
      </div>
    </UserContext.Provider>
  );
}

export default App;
