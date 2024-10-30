import { css, cx } from '../../../styled-system/css';

interface IProps<T extends string> {
  tabList: { id: string; value: string }[];
  selected: T;
  handleSelect: (id: T) => void;
}

const Tabs = <T extends string>({
  tabList,
  selected,
  handleSelect,
}: IProps<T>) => {
  return (
    <div className={styles.tabs_wrapper}>
      <div className={styles.tabs_container}>
        {tabList.map((tab) => (
          <button
            key={tab.id}
            className={cx(
              styles.tab,
              selected === tab.id && styles.selected_tab
            )}
            onClick={() => handleSelect(tab.id as T)}
          >
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
  selected_tab: css({
    borderColor: 'main.base',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomColor: 'white',
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
};
