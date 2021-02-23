import styles from './styles.module.css';

const ExperienceBar = (): JSX.Element => {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />
        <span style={{ left: '50%' }}>300xp</span>
      </div>
      <span>600 xp</span>
    </header>
  );
};

export default ExperienceBar;
