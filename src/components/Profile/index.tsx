import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './styles.module.css';

const Profile = (): JSX.Element => {

  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/tiddal.png" alt="Zé Pedro Resende" />
      <div>
        <strong>Zé Pedro Resende</strong>
        <p>
          <img src="icons/level.svg" alt="Level Up" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
