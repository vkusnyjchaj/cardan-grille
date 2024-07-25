import classNames from 'classnames';
import styles from './TextArea.module.css';

interface TextAreaProps {
  className?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (text: string) => void;
}

function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className={classNames(styles.textarea, props.className)}
      value={props.value}
      placeholder={props.placeholder}
      rows={props.rows}
      onChange={e => props.onChange!(e.currentTarget.value)}
    />
  );
}

export default TextArea;
