import { IconHome } from '@arco-design/web-react/icon';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Header, Menu, Layout as TcLayout } from '@tc/components-react';
import IconInternet from '@/assets/svg/icon_internet.svg?react';
import Logo from '@/assets/images/logo.png'

function Layout(): React.ReactNode {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TcLayout
      header={
        <Header
          logo={{
            url: Logo,
            subTitle: '科研助手平台',
            link: 'https://chat-taichu-web-test.wair.ac.cn',
          }}
          extras={<div>extra</div>}
          userInfo={{
            name: '张三',
            onLogout: () => {
              console.log('logout');
            },
          }}
        />
      }
      menu={
        <Menu
          menuKey="menu1"
          locationPath={location.pathname}
          onClickMenuItem={menuItem => {
            navigate({
              pathname: menuItem.path || '',
            });
          }}
          menus={[
            {
              title: '首页',
              id: 'detail',
              path: '/detail',
              icon: <IconHome />,
            },
            {
              title: '列表',
              id: 'list',
              path: '/list',
              icon: <IconInternet className="arco-icon tc-svg-icon" />,
            },
          ]}
        />
      }
    >
      <Outlet />
    </TcLayout>
  );
}

export default Layout;
