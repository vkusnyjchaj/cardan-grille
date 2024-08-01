import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>404</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <label className={styles.description}>
          It seems you are trying to access unexisting page, press button below
          to return back to the main page.
        </label>
        <Button className={styles.button} onClick={() => navigate('/')}>
          Go to the main page
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
