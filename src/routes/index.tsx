import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListComponent from '@/pages/teams';
import Detail from '@/pages/team';
import Layout from '@/components/Layout';

function RouteComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index Component={ListComponent} />
          <Route path="teams" Component={ListComponent} />
          <Route path="teams/:teamId" Component={Detail} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouteComponent;
