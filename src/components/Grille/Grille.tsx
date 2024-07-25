import classNames from 'classnames';
import styles from './Grille.module.css';

type GrilleProps = {
  id?: string;
  className?: string;
  grille: boolean[][];
};

function Grille(props: GrilleProps) {
  return (
    <table id={props.id} className={classNames(styles.grille, props.className)}>
      <tbody>
        {props.grille.map((row, i) => {
          return (
            <tr className={styles.row} key={i}>
              {row.map((cell, j) => {
                return (
                  <td className={styles.cell} key={`${i},${j}`}>
                    {cell ? <div className={styles.hole}></div> : null}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Grille;
