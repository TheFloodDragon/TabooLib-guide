import React from 'react';
import styles from './styles.module.css';

export default function HomepageQuickStart(): JSX.Element {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <h2 className={styles.quickStartTitle}>不知道写啥</h2>
        <p className={styles.quickStartSubtitle}>
          不知道写啥
        </p>
        
        <div className="row">
          <div className="col col--6">
            <div className={styles.quickStartCard}>
              <div className={styles.quickStartCardIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4h6v2H9V4zM8 8h8v2H8V8zm-2 4h12v2H6v-2zm-2 4h16v2H4v-2z" fill="currentColor" />
                </svg>
              </div>
              <h3 className={styles.quickStartCardTitle}>不知道写啥</h3>
              <p className={styles.quickStartCardDescription}>
                不知道写啥
              </p>
            </div>
          </div>
          
          <div className="col col--6">
            <div className={styles.quickStartCard}>
              <div className={styles.quickStartCardIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6.75A2.75 2.75 0 016.75 4h10.5A2.75 2.75 0 0120 6.75v10.5A2.75 2.75 0 0117.25 20H6.75A2.75 2.75 0 014 17.25V6.75zM6.75 6C6.336 6 6 6.336 6 6.75v10.5c0 .414.336.75.75.75h10.5c.414 0 .75-.336.75-.75V6.75C18 6.336 17.664 6 17.25 6H6.75z" fill="currentColor"/>
                  <path d="M7 14.95l1.768-1.768a.75.75 0 011.06 0L11 14.354l2.672-2.672a.75.75 0 111.06 1.06l-3.202 3.204a.75.75 0 01-1.06 0l-1.172-1.172-1.237 1.237a.75.75 0 01-1.061-1.06z" fill="currentColor" />
                </svg>
              </div>
              <h3 className={styles.quickStartCardTitle}>不知道写啥</h3>
              <p className={styles.quickStartCardDescription}>
                不知道写啥
              </p>
            </div>
          </div>
        </div>
        
        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col col--6">
            <div className={styles.quickStartCard}>
              <div className={styles.quickStartCardIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V8a1 1 0 011-1z" fill="currentColor" />
                </svg>
              </div>
              <h3 className={styles.quickStartCardTitle}>不知道写啥</h3>
              <p className={styles.quickStartCardDescription}>
                不知道写啥
              </p>
            </div>
          </div>
          
          <div className="col col--6">
            <div className={styles.quickStartCard}>
              <div className={styles.quickStartCardIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6a6 6 0 016 6c0 1.667-.67 3.167-1.76 4.253l-.24.247v.5H14v-1h1.25a5 5 0 10-6.5 0H10v1H8v-.5l-.24-.247A5.973 5.973 0 016 12a6 6 0 016-6zm0 14c-.868 0-1.425-.27-1.658-.839-.072-.175-.113-.374-.127-.604L10.212 18h3.576l-.003.557c-.014.23-.055.429-.127.604C13.425 19.73 12.868 20 12 20z" fill="currentColor" />
                </svg>
              </div>
              <h3 className={styles.quickStartCardTitle}>不知道写啥</h3>
              <p className={styles.quickStartCardDescription}>
                不知道写啥
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 