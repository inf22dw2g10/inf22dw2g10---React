import React from 'react';
import styles from './styles/LoadingPage.module.css'

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner}></div>
      <h1>Loading...</h1>
    </div>
  );
};
export default LoadingPage;
