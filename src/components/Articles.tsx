import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ReadArticleSection = () => {
  const articles = [
    {
      id: "1",
      category: "CORONAVIRUS",
      title: "12 Coronavirus Myths and Facts That You Should Be Aware Of",
      author: "Dr. Diana Borgio",
      image: "/images/article1.jpg",
    },
    {
      id: "2",
      category: "VITAMINS AND SUPPLEMENTS",
      title: "Eating Right to Build Immunity Against Cold and Viral Infections",
      author: "Dr. Diana Borgio",
      image: "/images/article2.jpg",
    },
  ];

  return (
    <section className="bg-white border-t border-gray-200 py-16 px-4">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Read top articles from<br /> health experts
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Health articles that keep you informed about good health practices and achieve your goals.
          </p>
          <Link to="/articles">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md">
              See all articles
            </Button>
          </Link>
        </div>

        {/* Right Side - Articles */}
        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:opacity-90 transition"
              />
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                  {article.category}
                </p>
                <h3 className="text-sm font-medium text-gray-900 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500">Dr. {article.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadArticleSection;
