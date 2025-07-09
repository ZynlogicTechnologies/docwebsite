import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, X } from "lucide-react";

const contentItems = [
  { id: "1", title: "Heart Health Tips", author: "Dr. Sarah Johnson", publishDate: "2025-06-01", status: "Published", category: "Health Tips" },
  { id: "2", title: "Managing Diabetes", author: "Dr. Michael Chen", publishDate: "2025-05-15", status: "Draft", category: "Chronic Conditions" },
  { id: "3", title: "Pediatric Care Guide", author: "Dr. Priya Sharma", publishDate: "2025-04-20", status: "Published", category: "Pediatrics" },
  { id: "4", title: "Orthopedic Recovery", author: "Dr. David Patel", publishDate: "2025-07-01", status: "Scheduled", category: "Orthopedics" },
  { id: "5", title: "Skin Care Basics", author: "Dr. Emily Gupta", publishDate: "2025-06-25", status: "Published", category: "Dermatology" },
];

const ContentManagementTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishDate: "",
    status: "Draft",
    category: "",
  });
  const [contentList, setContentList] = useState(contentItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    const newContent = {
      id: String(contentList.length + 1),
      title: formData.title,
      author: formData.author,
      publishDate: formData.publishDate || new Date().toISOString().split("T")[0],
      status: formData.status,
      category: formData.category,
    };
    setContentList([...contentList, newContent]);
    setFormData({ title: "", author: "", publishDate: "", status: "Draft", category: "" });
    setIsModalOpen(false);
  };

  const handleEditContent = (id) => {
    const content = contentList.find((item) => item.id === id);
    if (content) {
      setFormData({
        title: content.title,
        author: content.author,
        publishDate: content.publishDate,
        status: content.status,
        category: content.category,
      });
      setIsModalOpen(true);
    }
  };

  const handleDeleteContent = (id) => {
    setContentList(contentList.filter((item) => item.id !== id));
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="border-[#007E85]/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#007E85] text-lg sm:text-xl">Content Management</CardTitle>
              <CardDescription className="text-gray-900/70 text-sm">Manage articles and announcements</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-48 md:w-64">
                <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  className="pl-8 sm:pl-10 w-full border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <Button
                className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setIsModalOpen(true)}
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add Content
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-[#007E85]/20"
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-[#007E85] text-white text-xs sm:text-sm">
                    {item.author.split(" ")[1]?.[0] || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-sm text-gray-900">{item.author}</p>
                  <p className="text-xs text-gray-900/70">Published: {item.publishDate}</p>
                  <p className="text-xs text-gray-900/70">Category: {item.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
                <div className="text-right">
                  <Badge className="bg-[#007E85]/10 text-[#007E85] text-xs">{item.status}</Badge>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleEditContent(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-600/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleDeleteContent(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add/Edit Content Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#007E85]">Add New Content</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddContent} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Heart Health Tips"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Author</label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Dr. Sarah Johnson"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Publish Date</label>
                <Input
                  name="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-xs sm:text-sm"
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Category</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Health Tips"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-3"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagementTab;