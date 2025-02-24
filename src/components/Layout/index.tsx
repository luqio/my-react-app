import { IconCaretDown, IconHome, IconList } from '@arco-design/web-react/icon';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router';
import AvatarImg from '@/assets/images/avatar-user.png';

import styles from './index.module.less';
import { Dropdown, Menu } from '@tc/ui-react';

function Layout(): React.ReactNode {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerRight}>
            <Dropdown
              triggerProps={{ autoAlignPopupWidth: false }}
              droplist={
                <Menu>
                  <Menu.Item
                    className={`user-info-dropdownItem`}
                    key="logout"
                    onClick={() => {}}
                  >
                    退出
                  </Menu.Item>
                </Menu>
              }
              position="br"
            >
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <img src={AvatarImg} height={20} alt="" />
                </div>
                <div className={styles.userName}>ChangeKong</div>

                <IconCaretDown className={styles.dropdownIcon} />
              </div>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
