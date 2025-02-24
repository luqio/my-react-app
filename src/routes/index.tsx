import { BrowserRouter as Router, Route, Routes } from 'react-router';
import ListComponent from '@/pages/list';
import Detail from '@/pages/detail';
import HomeComponent from '@/pages/home';
import Layout from '@/components/Layout';

function RouteComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" Component={HomeComponent} />
          <Route path="/list" Component={ListComponent} />
          <Route path="/detail" Component={Detail} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouteComponent;
