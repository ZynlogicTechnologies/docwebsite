import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const ArticlesPage = () => {
  const allArticles = [
    {
      id: "1",
      title: "Healthy Heart Tips",
      summary: "Learn how to maintain a healthy heart with simple lifestyle changes.",
      author: "Dr. Emily Stone",
      date: "July 05, 2025",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Understanding Diabetes",
      summary: "A comprehensive guide to managing diabetes effectively.",
      author: "Dr. Rajesh Kumar",
      date: "July 03, 2025",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Mental Health Awareness",
      summary: "Tips to improve your mental well-being in daily life.",
      author: "Dr. Aisha Patel",
      date: "July 01, 2025",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Nutrition for Kids",
      summary: "Essential nutrients for growing children.",
      author: "Dr. Sameer Desai",
      date: "June 28, 2025",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            All Health Articles
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader className="p-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <CardTitle className="text-gray-800 text-lg">{article.title}</CardTitle>
                  <CardDescription className="text-gray-600">{article.summary}</CardDescription>
                  <div className="text-sm text-gray-500">
                    By {article.author} | {article.date}
                  </div>
                  <Link to={`/article/${article.id}`} className="block">
                    <Button className="w-full bg-[#007E85] hover:bg-[#006670] text-white">
                      <Heart className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/">
              <Button variant="outline" className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;