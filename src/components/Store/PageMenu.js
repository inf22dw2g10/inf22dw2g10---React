import styles from '../..//pages/styles/Store.module.css';

const PageMenu = ({ totalPages, sendPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const changePageHandler = (page) => {
    sendPage(page);
  };

  return (
    <ul className={styles.ulPageNav}>
      {pages.map((page) => (
        <li key={page} className={styles.liPageNav}>
          <button  className={styles.buttonPageNav} onClick={() => changePageHandler(page)}>{`${page}`}</button>
        </li>
      ))}
    </ul>
  );
};

export default PageMenu;
