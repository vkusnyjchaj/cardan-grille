import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Error.module.css';

function Error() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Unexpected error</h1>
        <h2 className={styles.subtitle}>Something bad happens</h2>
        <label className={styles.description}>
          Please contact the author with details about the issue.
        </label>
        <Button className={styles.button} onClick={() => navigate('/')}>
          Go to the main page
        </Button>
      </div>
    </div>
  );
}

export default Error;
