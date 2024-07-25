import classNames from 'classnames';
import styles from './DataTable.module.css';

type DataTableProps = {
  className?: string;
  table: string[][];
};

function DataTable(props: DataTableProps) {
  return (
    <table className={classNames(styles.table, props.className)}>
      <tbody>
        {props.table.map((row, i) => {
          return (
            <tr className={styles.row} key={i}>
              {row.map((cell, j) => {
                return (
                  <td className={styles.cell} key={`${i},${j}`}>
                    <div className={styles.value}>{cell}</div>
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

export default DataTable;
