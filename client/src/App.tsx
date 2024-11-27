import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layout/client";
import AuthLayout from "./layout/auth";
import DashboardLayout from "./layout/dashboard";
import NewStudentPage from "./pages/Dashboard/newStudent";
import AllStudentsPage from "./pages/Dashboard/allStudents";
import AccountPage from "./pages/Dashboard/account";
import SettingsPage from "./pages/Dashboard/settings";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ClientLayout />} />
      <Route path="auth" element={<AuthLayout />} />
      <Route path="admin" element={<DashboardLayout />}>
        <Route index element={<NewStudentPage />} />
        <Route path="/admin/all-student" element={<AllStudentsPage />} />
        <Route path="/admin/account" element={<AccountPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};
export default App;
