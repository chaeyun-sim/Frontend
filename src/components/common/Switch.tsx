import { css, cx } from '../../../styled-system/css';

interface IProps {
  label: string;
  on: boolean;
  handleToggle: () => void;
}

const Switch = ({ label, on, handleToggle }: IProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <button
        onClick={handleToggle}
        className={cx(styles.switch, on ? styles.on_switch : styles.off_switch)}
      >
        <div
          className={cx(
            styles.toggle,
            on ? styles.on_toggle : styles.off_toggle
          )}
        ></div>
      </button>
    </div>
  );
};

export default Switch;

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }),
  label: css({}),
  switch: css({
    position: 'relative',
    width: 40,
    height: 24,
    borderRadius: 48,
  }),
  off_switch: css({ backgroundColor: 'gray.300' }),
  on_switch: css({
    backgroundColor: 'main.base',
  }),
  toggle: css({
    position: 'absolute',
    top: 4,
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'left 0.3s',
  }),
  off_toggle: css({
    left: 4,
  }),
  on_toggle: css({
    left: 20,
  }),
};
