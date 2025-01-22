import { Article } from "../types/article";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
          {article.summary}
        </p>
      </div>
    </div>
  );
}
