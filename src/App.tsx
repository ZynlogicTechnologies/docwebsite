import React, { Component, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/components/CartContext";
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
import AdminDashboard from "./pages/AdminDashboard";
import ArticlesPage from "./pages/ArticlesPage";
import NotFound from "./pages/NotFound";
import HospitalsPage from "./pages/HospitalsPage";
import SpecialtiesPage from "./pages/SpecialtiesPage";
import Cart from "./pages/Cart";
import HospitalDashboard from "./pages/Hospitaldashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

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
  console.log("App rendered with CartProvider");
  return (
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
                <Route path="/dashboard" element={<PatientDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/article/:id" element={<div>Article Detail Page</div>} />
                <Route path="/hospitals" element={<HospitalsPage />} />
                <Route path="/hospitals/:id" element={<div>Hospital Detail Page</div>} />
                <Route path="/specialties" element={<SpecialtiesPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard></HospitalDashboard>}/>
                <Route path="/doctor-dashboard"  element={<DoctorDashboard></DoctorDashboard>}/>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;