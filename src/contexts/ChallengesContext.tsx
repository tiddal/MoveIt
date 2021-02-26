import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceTillNextLevel: number;
  completedChallenges: number;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

const ChallengesContext = createContext({} as ChallengesContextData);

const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps): JSX.Element => {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const experienceTillNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('completedChallenges', String(completedChallenges));

  }, [level, currentExperience, completedChallenges]);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 💪🏼', {
        body: `Vale ${challenge.amount}xp`,
        silent: true
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const levelUp = () => {
    setLevel(level + 1);
    setLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => {
    setLevelUpModalOpen(false);
  };

  const completeChallenge = () => {
    if (!activeChallenge) return;
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceTillNextLevel) {
      levelUp();
      finalExperience = finalExperience - experienceTillNextLevel;
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceTillNextLevel,
        completedChallenges,
        activeChallenge,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};

export { ChallengesContext, ChallengesProvider };