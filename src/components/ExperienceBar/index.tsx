import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './styles.module.css';

const ExperienceBar = (): JSX.Element => {

  const { currentExperience, experienceTillNextLevel } = useContext(ChallengesContext);

  const progress = Math.round((currentExperience * 100) / experienceTillNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${progress}%` }} />
        <span style={{ left: `${progress}%` }}>{currentExperience}xp</span>
      </div>
      <span>{experienceTillNextLevel} xp</span>
    </header>
  );
};

export default ExperienceBar;
