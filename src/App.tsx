import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookingStudents from "./pages/BookingStudents";
import BookingAttendance from "./pages/BookingAttendance";
import MarkAttendance from "./pages/MarkAttendance";
import Profile from "./pages/Profile";
import Appearance from "./pages/Appearance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/appearance" element={<Appearance />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/booking/students" element={<BookingStudents />} />
            <Route path="/booking/attendance" element={<BookingAttendance />} />
            <Route path="/booking/mark-attendance" element={<MarkAttendance />} />
            <Route path="/booking/appearance" element={<Appearance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
