import { IconHome, IconList } from '@arco-design/web-react/icon';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router';
import { Header, Menu, Layout as TcLayout } from 'tc-components';

function Layout(): React.ReactNode {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TcLayout
      header={
        <Header
          logo={{
            url: '/logo.png',
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
              icon: <IconList />,
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
