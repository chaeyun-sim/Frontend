import { useCallback, useState } from 'react';

interface IProps<T> {
  tabs: T[];
  initialValue?: T;
}

export const useTab = <T>({ tabs, initialValue }: IProps<T>) => {
  const [activeTab, setActiveTab] = useState<T>(initialValue!);

  const handleTabChange = useCallback(
    (value: T) => {
      if (tabs.includes(value)) {
        setActiveTab(value);
      }
    },
    [tabs]
  );

  const isActive = useCallback((tab: T) => activeTab === tab, [activeTab]);

  return {
    activeTab,
    handleTabChange,
    isActive,
  };
};
