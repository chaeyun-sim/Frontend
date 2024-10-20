import React from 'react';

type IProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className }: IProps) => {
  const iconPath = `/icons/${name}.svg`;

  return (
    <img
      src={iconPath}
      alt={`${name} 아이콘`}
      className={className}
      loading="lazy"
    />
  );
};

export default Icon;
