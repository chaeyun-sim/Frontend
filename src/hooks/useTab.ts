import { useCallback, useState } from 'react';

export const useTab = <T>(tabs: T[], initialValue?: T) => {
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
