import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useToggle } from '@/hooks/useToggle';
import { useAuth } from '@/stores/useAuth';
import { useUserStore } from '@/stores/useUserStore';

import Switch from './Switch';
import { css } from '../../../styled-system/css';

interface IProps {
  handleToggle: () => void;
}

const HeaderProfileMenu = ({ handleToggle }: IProps) => {
  const router = useRouter();

  const { logout } = useAuth();
  const { role, setUserRole } = useUserStore();
  const { isOpen: isOnRoleSwitch, handleToggle: handleToggleRoleSwitch } =
    useToggle(role === 'STREAMER');

  const handleRedirectMypage = () => {
    handleToggle();
    router.push('mypage');
  };

  useEffect(() => {
    if (isOnRoleSwitch) setUserRole('STREAMER');
    else setUserRole('MEMBER');
  }, [isOnRoleSwitch]);

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Switch
          label="방송모드"
          on={isOnRoleSwitch}
          handleToggle={handleToggleRoleSwitch}
        />
      </li>
      <li onClick={handleRedirectMypage} className={styles.item}>
        내 정보
      </li>
      <li onClick={logout} className={styles.item}>
        로그아웃
      </li>
    </ul>
  );
};

export default HeaderProfileMenu;

const styles = {
  list: css({
    paddingY: 12,
    width: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    border: '1px solid',
    borderColor: 'gray.100',
    backgroundColor: 'white',
  }),
  item: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    cursor: 'pointer',
  }),
};
