// /stores: Zustand 또는 다른 상태 관리 라이브러리 파일을 저장

import { create } from 'zustand';

interface IStore {
  count: number;
  inc: () => void;
}

export const useStore = create<IStore>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
