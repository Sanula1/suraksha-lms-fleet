import { useEffect, useState } from 'react';
import AdminDashboard from '@/pages/AdminDashboard';
import { Login } from '@/pages/Login';
import { UserManagement } from '@/components/UserManagement';
import { InstituteManagement } from '@/pages/InstituteManagement';
import { SubjectManagement } from '@/pages/SubjectManagement';
import SubjectLecturesManagement from '@/pages/SubjectLecturesManagement';
import { PaymentManagement } from '@/pages/PaymentManagement';
import { AssignRfidManagement } from '@/pages/AssignRfidManagement';
import TransportManagement from '@/pages/TransportManagement';
import InstituteLectures from '@/components/InstituteLectures';
import ApiService from '@/services/api';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathMap: { [key: string]: string } = {
      '/': 'home',
      '/login': 'login',
      '/admin': 'dashboard',
      '/admin/users': 'users',
      '/admin/institutes': 'institutes',
      '/admin/subjects': 'subjects',
      '/admin/lectures': 'lectures',
      '/admin/payments': 'payments',
      '/admin/rfid': 'rfid',
      '/admin/transport': 'transport',
      '/institute-lectures': 'institute-lectures'
    };
    
    setCurrentPage(pathMap[currentPath] || 'login');
    setUser(ApiService.getCurrentUser());
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            <div className="container mx-auto px-4 py-16">
              <div className="text-center space-y-8">
                <h1 className="text-6xl font-bold text-foreground">
                  Welcome to LAAS
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Learning as a Service - Your comprehensive educational platform for modern learning experiences.
                </p>
              </div>
            </div>
          </div>
        );
      case 'login':
        return <Login />;
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement currentUserType={user?.userType || 'ADMIN'} />;
      case 'institutes':
        return <InstituteManagement />;
      case 'subjects':
        return <SubjectManagement />;
      case 'lectures':
        return <SubjectLecturesManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'rfid':
        return <AssignRfidManagement />;
      case 'transport':
        return <TransportManagement />;
      case 'institute-lectures':
        return <InstituteLectures />;
      default:
        return <Login />;
    }
  };

  return renderContent();
};

export default AppContent;