import Icon from './common/Icon';

const VisibilityOption = ({
  isSelected,
  value,
  onClick,
  label,
}: {
  isSelected: boolean;
  value: boolean;
  onClick: (value: boolean) => void;
  label: string;
}) => (
  <>
    <button onClick={() => onClick(value)}>
      <Icon
        name={isSelected === value ? 'check2-checked' : 'check2-unchecked'}
      />
    </button>
    {label}
  </>
);

export default VisibilityOption;
