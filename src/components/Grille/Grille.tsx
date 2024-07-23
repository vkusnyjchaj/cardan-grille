import classNames from 'classnames';
import styles from './Grille.module.css';

interface GrilleProps {
  className?: string,
  grille: Array<Array<boolean>> | null
  printMode?: boolean
}

function Grille(props: GrilleProps) {
  return (
    <table className={classNames(styles.grille, props.className)}>
      <tbody>
        {props.grille?.map((row, i) => {
          return (
            <tr className={styles.row} key={i}>
              {row.map((cell, j) => {
                return (
                  <td className={classNames(styles.cell, { [styles.print]: props.printMode})} key={`${i},${j}`}>
                    { cell ? <div className={classNames(styles.hole, { [styles.print]: props.printMode})}></div> : null }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
} 

export default Grille;