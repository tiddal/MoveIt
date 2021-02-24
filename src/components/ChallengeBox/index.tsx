import { useContext, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './styles.module.css';

const ChallengeBox = (): JSX.Element => {

  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>
              {activeChallenge.description}
            </p>

          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailed}
              onClick={resetChallenge}
            >
              Falhei
              </button>
            <button
              type="button"
              className={styles.challengeSucceeded}
            >
              Consegui
              </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>
              Termine um ciclo para receber um desafio!
        </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
          Suba de nível ao completar desafios.
        </p>
          </div>
        )}
    </div>
  );
};

export default ChallengeBox;
