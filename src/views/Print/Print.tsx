import { useSearchParams } from 'react-router-dom';
import styles from './Print.module.css';
import Grille from '../../components/Grille/Grille';
import Counter from '../../components/Counter/Counter';
import { useState } from 'react';
import DataTable from '../../components/DataTable/DataTable';

export default function Print() {
  const [searchParams] = useSearchParams();
  const grilleStr = searchParams.get('grille');
  const dataStr = searchParams.get('data');
  let grille: boolean[][] | null = null;
  let data: string[][][] | null = null;

  if (grilleStr) {
    grille = JSON.parse(grilleStr);
  }

  if (dataStr) {
    data = JSON.parse(dataStr);
  }
  const [count, setCount] = useState(2);

  return (
    <div className={styles.print}>
      <div
        className={styles.controls}
        style={{ display: grille ? 'block' : 'none' }}
      >
        <Counter
          value={count}
          min={1}
          max={Number.MAX_VALUE}
          step={1}
          onChange={setCount}
        />
      </div>
      <div className={styles.printContainer}>
        {grille &&
          [...Array(count)].map((_, i) => (
            <Grille className={styles.grille} key={i} print grille={grille} />
          ))}
        {data &&
          data.map((item, i) => (
            <DataTable className={styles.table} key={i} table={item} />
          ))}
      </div>
    </div>
  );
}
