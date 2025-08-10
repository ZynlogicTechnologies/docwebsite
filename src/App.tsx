// App.tsx
import React, { Component, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FaHeartbeat, FaUserMd, FaPills, FaStethoscope } from "react-icons/fa";
import Index from "./pages/Index";
import FindDoctors from "./pages/FindDoctors";
import BookAppointment from "./pages/BookAppointment";
import HealthRecords from "./pages/HealthRecords";
import Medicine from "./pages/Medicine";
import LabTests from "./pages/LabTests";
import BookTest from "./pages/BookTest";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DoctorProfile from "./pages/DoctorProfile";
import PatientDashboard from "./pages/PatientDashboard";
import VideoConsultation from "./pages/VideoConsultation";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import ArticlesPage from "./pages/ArticlesPage";
import NotFound from "./pages/NotFound";
import HospitalsPage from "./pages/HospitalsPage";
import SpecialtiesPage from "./pages/SpecialtiesPage";
import Cart from "./pages/Cart";
import HospitalDashboard from "./pages/Hospitaldashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProfileUpdate from "./pages/PatientProfile";
import UserAppointments from "./pages/UserAppointments";
import DoctorProfileUpdate from "./pages/DoctorProfileUpdate";
import DoctorProfileAvalaibility from "./pages/DoctorAvailabilityUpdate";
import { useEffect } from "react";
import { useGlobalTextZigzag } from './components/ui/AnimatedTextWrapper';
import PaymentStatus from "./pages/PaymentStatus";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}



class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-red-600">Something went wrong.</h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page or contact support.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>

        
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => {
   useGlobalTextZigzag();
  useEffect(() => {
    const elements = document.querySelectorAll('body *');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.setProperty('--i', index.toString());
    });
  }, []);
  return (
    <AuthProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/find-doctors" element={<FindDoctors />} />
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="/health-records" element={<HealthRecords />} />
                  <Route path="/medicine" element={<Medicine />} />
                  <Route path="/lab-tests" element={<LabTests />} />
                  <Route path="/book-test/:id" element={<BookTest />} />
                  <Route path="/video-consultation" element={<VideoConsultation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/doctor/:id" element={<DoctorProfile />} />
                  <Route path="/userappointments" element={<UserAppointments />} />
                  <Route path="/payment-status" element={<PaymentStatus />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["general_user"]}>
                        <PatientDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["general_user"]}>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      // <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      // </ProtectedRoute>
                    }
                  />
                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/article/:id" element={<div>Article Detail Page</div>} />
                  <Route path="/hospitals" element={<HospitalsPage />} />
                  <Route path="/hospitals/:id" element={<div>Hospital Detail Page</div>} />
                  <Route path="/specialties" element={<SpecialtiesPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/hospital-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["hospital"]}>
                        <HospitalDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doctor-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorDashboard />
                      </ProtectedRoute>
                    }
                  />
                    <Route
                    path="/doctor-profile-update"
                    element={
                      <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorProfileUpdate />
                      </ProtectedRoute>
                    }
                  />
                   <Route
                    path="/set-Availability"
                    element={
                      <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorProfileAvalaibility />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profileUpdate"
                    element={
                      <ProtectedRoute allowedRoles={["general_user"]}>
                        <ProfileUpdate />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                      
              </BrowserRouter>
            </CartProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
