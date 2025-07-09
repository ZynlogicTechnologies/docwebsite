import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const contentItems = [
  {
    id: "1",
    title: "Homepage Banner - July Promo",
    description: "Display promotional banner for July campaign",
    status: "Published",
    type: "Banner",
  },
  {
    id: "2",
    title: "Monsoon Health Tips",
    description: "Tips to stay healthy during rainy season",
    status: "Draft",
    type: "Article",
  },
  {
    id: "3",
    title: "COVID-19 Safety Guidelines",
    description: "Latest guidelines and safety protocols",
    status: "Published",
    type: "Static Page",
  },
];

const ContentManagementTab = () => {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-800">Content Management</CardTitle>
            <CardDescription className="text-gray-500">
              Manage homepage banners, health tips, articles, and static content
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-[#007E85] text-white">
              <UploadCloud className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {contentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
              <Badge
                className={`mt-2 ${
                  item.status === "Published"
                    ? "bg-[#007E85]/10 text-[#007E85]"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status}
              </Badge>
            </div>
            <Button variant="outline" className="text-[#007E85] border-gray-300">
              <FileText className="h-4 w-4 mr-2" />
              {item.type === "Article" ? "Manage Article" : "Edit"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContentManagementTab;
