
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Pill,
  TestTube,
  Heart,
  Plus
} from "lucide-react";
import { mockHealthRecords } from "@/data/mockData";

const HealthRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <Pill className="h-5 w-5 text-green-600" />;
      case "report":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "vaccine":
        return <Activity className="h-5 w-5 text-purple-600" />;
      case "checkup":
        return <Heart className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case "prescription":
        return "bg-green-100 text-green-800";
      case "report":
        return "bg-blue-100 text-blue-800";
      case "vaccine":
        return "bg-purple-100 text-purple-800";
      case "checkup":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Health Records
              </h1>
              <p className="text-lg text-gray-600">
                Securely manage and access your medical records
              </p>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Record
            </Button>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search records..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
              <TabsTrigger value="checkups">Checkups</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {mockHealthRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          {getRecordIcon(record.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {record.title}
                            </h3>
                            <Badge className={getRecordColor(record.type)}>
                              {record.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{record.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{record.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{record.doctor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="prescriptions">
              <div className="space-y-4">
                {mockHealthRecords
                  .filter(record => record.type === "prescription")
                  .map((record) => (
                    <Card key={record.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-green-100">
                              <Pill className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {record.title}
                              </h3>
                              <p className="text-gray-600 mb-2">{record.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{record.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{record.doctor}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="space-y-4">
                {mockHealthRecords
                  .filter(record => record.type === "report")
                  .map((record) => (
                    <Card key={record.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <TestTube className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {record.title}
                              </h3>
                              <p className="text-gray-600 mb-2">{record.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{record.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{record.doctor}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="vaccines">
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No vaccine records found
                </h3>
                <p className="text-gray-600 mb-4">
                  Your vaccination records will appear here
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vaccine Record
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="checkups">
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No checkup records found
                </h3>
                <p className="text-gray-600 mb-4">
                  Your regular checkup records will appear here
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Checkup Record
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HealthRecords;
