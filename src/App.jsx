import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import LoginPage from './LoginPage';
import DetailPerusahaan from './Detail';
import DetailFasilitas from './DetailFasilitas';
import FasilitasPage from './Companies';
import DashboardPage from './Dashboard';
import DashboardPPK from './PPK/DashboardPPK';
import RecoveryPlanStatusPPK from './PPK/RecoveryPlanPPK';
import RecoveryPlanPageMng from './Manager/RecoveryPlanMng';
import RecoveryPlanStatusPage from './Manager/RecoveryStatusMng';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/fasilitas" element={<PrivateRoute><FasilitasPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/recovery" element={<PrivateRoute><RecoveryPlanPageMng /></PrivateRoute>} />
        <Route path="/recovery/:id" element={<PrivateRoute><RecoveryPlanStatusPage /></PrivateRoute>} />
        <Route path="/fasilitas/company-detail" element={<PrivateRoute><DetailPerusahaan /></PrivateRoute>} />
        <Route path="/fasilitas/facility-detail/:dealRef" element={<PrivateRoute><DetailFasilitas /></PrivateRoute>} />

        <Route path="/dashboard/ppk" element={<PrivateRoute><DashboardPPK /></PrivateRoute>} />
        <Route path="/recovery/ppk" element={<PrivateRoute><RecoveryPlanStatusPPK /></PrivateRoute>} />

        {/* <Route path="/fasilitas" element={<FasilitasPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/recovery" element={<RecoveryPlanPageMng />} />
        <Route path="/recovery/:id" element={<RecoveryPlanStatusPage />} />
        <Route path="/fasilitas/company-detail" element={<DetailPerusahaan />} />
        <Route path="/fasilitas/facility-detail/:id" element={<DetailFasilitas />} />

        <Route path="/dashboard/ppk" element={<DashboardPPK />} />
        <Route path="/recovery/ppk" element={<RecoveryPlanStatusPPK />} /> */}
        <Route path="*" element={<img src="https://media1.tenor.com/m/6m3I1g_WiokAAAAC/fish-spin-sha.gif" alt="Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
