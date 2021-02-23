import styles from './styles.module.css';

const Profile = (): JSX.Element => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/tiddal.png" alt="Zé Pedro Resende" />
      <div>
        <strong>Zé Pedro Resende</strong>
        <p>
          <img src="icons/level.svg" alt="Level Up" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
