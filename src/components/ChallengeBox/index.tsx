import { useContext, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from './styles.module.css';

const ChallengeBox = (): JSX.Element => {

  const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };

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
              onClick={handleChallengeFailed}
            >
              Falhei
              </button>
            <button
              type="button"
              className={styles.challengeSucceeded}
              onClick={handleChallengeSucceeded}
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
