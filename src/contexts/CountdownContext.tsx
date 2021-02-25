import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);

const CountdownProvider = ({ children }: CountdownProviderProps): JSX.Element => {

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setFinished] = useState(false);

  const [minutes, seconds] = [Math.floor(time / 60), time % 60];

  let countdownTimeout: NodeJS.Timeout;

  const startCountdown = () => {
    setActive(true);
  };

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setActive(false);
    setTime(0.05 * 60);
    setFinished(false);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setActive(false);
      setFinished(true);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
};

export { CountdownContext, CountdownProvider };
