import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookingSidebar } from "@/components/BookingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Search, Filter, Download, ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const attendanceData = [
  {
    id: "ST001",
    name: "Aditya Sharma",
    phone: "+91 98765 43210",
    address: "123 MG Road, Central Area",
    date: "2024-03-20",
    status: "Present",
    time: "8:15 AM",
    route: "Morning Route",
  },
  {
    id: "ST002",
    name: "Priya Patel", 
    phone: "+91 98765 43211",
    address: "456 Park Street, North Zone",
    date: "2024-03-20",
    status: "Present",
    time: "8:20 AM",
    route: "Morning Route",
  },
  {
    id: "ST003",
    name: "Rahul Kumar",
    phone: "+91 98765 43212", 
    address: "789 Lake View, South Area",
    date: "2024-03-20",
    status: "Absent",
    time: "-",
    route: "Morning Route",
  },
  {
    id: "ST004",
    name: "Sneha Reddy",
    phone: "+91 98765 43213",
    address: "321 Hill Road, East Side",
    date: "2024-03-20",
    status: "Late",
    time: "8:45 AM",
    route: "Morning Route",
  },
  {
    id: "ST005",
    name: "Arjun Singh",
    phone: "+91 98765 43214",
    address: "654 Valley Street, West Zone", 
    date: "2024-03-20",
    status: "Present",
    time: "8:10 AM",
    route: "Morning Route",
  },
];

const BookingAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const navigate = useNavigate();

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone.includes(searchTerm) ||
      record.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "success" as const;
      case "absent":
        return "destructive" as const;
      case "late":
        return "warning" as const;
      default:
        return "secondary" as const;
    }
  };

  const attendanceStats = {
    present: attendanceData.filter(r => r.status === "Present").length,
    absent: attendanceData.filter(r => r.status === "Absent").length,
    late: attendanceData.filter(r => r.status === "Late").length,
    total: attendanceData.length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <BookingSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 shadow-soft">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-4 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Book Hire Attendance</h1>
                  <p className="text-sm text-muted-foreground">Track student attendance records</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-soft border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{attendanceStats.total}</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">{attendanceStats.present}</div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((attendanceStats.present / attendanceStats.total) * 100)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{attendanceStats.absent}</div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((attendanceStats.absent / attendanceStats.total) * 100)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Late</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-warning">{attendanceStats.late}</div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((attendanceStats.late / attendanceStats.total) * 100)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, phone, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Attendance Table */}
              <div className="bg-card rounded-lg shadow-medium border-0 overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Attendance Records</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredAttendance.length} record{filteredAttendance.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Route</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.map((record, index) => (
                      <TableRow key={`${record.id}-${index}`}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{record.address}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{record.route}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredAttendance.length === 0 && (
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No attendance records found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Try adjusting your search criteria" : "No attendance data available"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BookingAttendance;