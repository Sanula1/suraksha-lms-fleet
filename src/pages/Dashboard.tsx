import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import busBooking1 from "@/assets/bus-booking-1.jpg";
import busBooking2 from "@/assets/bus-booking-2.jpg";
import busBooking3 from "@/assets/bus-booking-3.jpg";

const bookHireData = [
  {
    id: 1,
    title: "Morning Route - Central Campus",
    description: "Daily transport service for Central Campus students",
    image: busBooking1,
    route: "Central Campus → Main Building",
    time: "7:30 AM - 8:30 AM",
    capacity: "45 students",
    enrolled: 38,
    status: "Active",
  },
  {
    id: 2,
    title: "Evening Route - North Campus",
    description: "Return service for North Campus students",
    image: busBooking2,
    route: "North Campus → Residential Area",
    time: "4:00 PM - 5:30 PM",
    capacity: "50 students",
    enrolled: 42,
    status: "Active",
  },
  {
    id: 3,
    title: "Weekend Special Service",
    description: "Weekend transport for special events and activities",
    image: busBooking3,
    route: "Multiple Pickup Points",
    time: "Variable Schedule",
    capacity: "35 students",
    enrolled: 15,
    status: "Available",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBookHire = (bookingId: number) => {
    navigate(`/booking/students?bookingId=${bookingId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 shadow-soft">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-3">
              <Bus className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">My Book Hire</h1>
                <p className="text-sm text-muted-foreground">Manage your transport bookings</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Available Transport Services</h2>
                <p className="text-muted-foreground">Select and manage your transport bookings</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookHireData.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-smooth border-0">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={booking.status === "Active" ? "default" : "secondary"}
                          className="shadow-soft"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">{booking.title}</CardTitle>
                      <CardDescription>{booking.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.route}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{booking.enrolled}/{booking.capacity.split(' ')[0]} enrolled</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Capacity</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((booking.enrolled / parseInt(booking.capacity)) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-smooth" 
                            style={{ width: `${(booking.enrolled / parseInt(booking.capacity)) * 100}%` }}
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => handleBookHire(booking.id)}
                        size="lg"
                      >
                        Book Hire
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;