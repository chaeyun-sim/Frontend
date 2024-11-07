import Icon from './common/Icon';

const VisibilityOption = ({
  value,
  onClick,
  label,
}: {
  value: boolean;
  onClick: (value: boolean) => void;
  label: string;
}) => {
  return (
    <>
      <button onClick={() => onClick(value)}>
        <Icon name={value ? 'check2-checked' : 'check2-unchecked'} />
      </button>
      <span style={{ marginTop: '2px' }}>{label}</span>
    </>
  );
};

export default VisibilityOption;
