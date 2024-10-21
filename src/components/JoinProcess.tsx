import React from 'react';
import { css, cx } from '../../styled-system/css';
import Icon from './common/Icon';

interface IProps {
  processSteps: {
    title: string;
    iconName: string;
  }[];
  currentStep: number;
}

const JoinProcess = ({ processSteps, currentStep }: IProps) => {
  return (
    <div className={styles.process_container}>
      {processSteps.map((process, idx) => (
        <div key={process.title} className={styles.process_item}>
          <div className={styles.process_box}>
            <div
              className={cx(
                styles.process_icon,
                idx <= currentStep ? styles.active : styles.inactive
              )}
            >
              <Icon
                name={`${process.iconName}-${idx <= currentStep ? 'white' : 'beige'}`}
              />
            </div>
            <span
              className={cx(
                styles.process_text,
                idx <= currentStep ? styles.active_text : styles.inactive_text
              )}
            >
              {process.title}
            </span>
          </div>
          {processSteps.length - 1 > idx && (
            <div
              className={cx(
                styles.line,
                idx < currentStep ? styles.active_line : styles.inactive_line
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default JoinProcess;

const styles = {
  process_container: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  process_item: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),
  process_box: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  }),
  process_icon: css({
    borderRadius: '100%',
    width: '48px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  active: css({
    backgroundColor: 'main.base',
  }),
  inactive: css({
    backgroundColor: 'white',
    borderColor: 'gray.200',
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
  process_text: css({
    textStyle: 'caption3',
    marginTop: '8px',
  }),
  active_text: css({
    color: 'main.base',
  }),
  inactive_text: css({
    color: 'gray.300',
  }),
  line: css({
    height: '1px',
    width: '120px',
    marginLeft: '-30px',
    marginRight: '-30px',
    marginBottom: '20px',
  }),
  active_line: css({
    backgroundColor: 'main.base',
  }),
  inactive_line: css({
    backgroundColor: 'gray.300',
  }),
};
