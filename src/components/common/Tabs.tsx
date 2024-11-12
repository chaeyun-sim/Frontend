import Icon from './Icon';
import { css, cx } from '../../../styled-system/css';

interface TabItem {
  id: string;
  value: string;
  disabled?: boolean;
  iconName?: string;
}

interface IProps<T extends string> {
  tabList: TabItem[];
  selected: T;
  handleSelect: (id: T) => void;
  handleSelectDisabled?: (id: T) => void;
  type?: 'box' | 'line';
}

const Tabs = <T extends string>({
  tabList,
  selected,
  handleSelect,
  handleSelectDisabled,
  type = 'box',
}: IProps<T>) => {
  return (
    <div className={styles.tabs_wrapper}>
      <div className={styles.tabs_container}>
        {tabList.map((tab) => (
          <button
            key={tab.id}
            className={cx(
              styles.tab,
              type === 'line' &&
                selected !== tab.id &&
                css({ borderBottomColor: 'white' }),
              selected === tab.id && type === 'box'
                ? styles.selected_tab_box
                : styles.selected_tab_line,
              tab.disabled && styles.disabled
            )}
            onClick={() =>
              tab.disabled
                ? handleSelectDisabled!(tab.id as T)
                : handleSelect(tab.id as T)
            }
          >
            {tab.iconName && (
              <Icon
                name={tab.iconName}
                className={css({ marginRight: '10px' })}
              />
            )}
            {tab.value}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
    </div>
  );
};

export default Tabs;

const styles = {
  tabs_wrapper: css({
    position: 'relative',
    textStyle: 'button1',
  }),
  tabs_container: css({
    height: '44px',
    width: '100%',
    display: 'flex',
    position: 'relative',
    zIndex: 1,
  }),
  tab: css({
    width: '160px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    position: 'relative',
    color: 'gray.300',
    fontWeight: 500,
  }),
  selected_tab_box: css({
    borderColor: 'main.base',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomColor: 'white',
    marginBottom: '-1px',
    zIndex: 2,
    color: 'main.base !important',
    fontWeight: 500,
  }),
  selected_tab_line: css({
    borderBottom: '2px solid',
    borderBottomColor: 'main.base',
    borderWidth: '1px',
    marginBottom: '-1px',
    zIndex: 2,
    color: 'main.base !important',
    fontWeight: 500,
  }),
  divider: css({
    height: '1px',
    width: '100%',
    backgroundColor: 'main.base',
    position: 'absolute',
    bottom: 0,
    left: 0,
  }),
  disabled: css({
    color: 'gray.300 !important',
    cursor: 'default',
  }),
};
