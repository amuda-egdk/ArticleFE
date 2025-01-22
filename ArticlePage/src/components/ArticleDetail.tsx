import { useEffect, useState } from "react";
import { Article } from "../types/article";
import { getArticle } from "../api/articles";
import { ArrowLeft } from "lucide-react";

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
}

export function ArticleDetail({ articleId, onBack }: ArticleDetailProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticle(articleId);
      setArticle(data);
    } catch (err) {
      setError("Failed to load article details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center gap-4">
        <div className="text-red-600 text-lg mb-4 font-bold">{error}</div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to articles
        </button>

        <button
          onClick={fetchArticle}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft
            size={20}
            className="transform group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to articles</span>
        </button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-6 p-1">
                {article.title}
              </h1>
              <span className="font-medium">{article.summary}</span>
            </header>

            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                {article.fullText?.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
