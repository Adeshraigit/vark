import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Source {
  title: string;
  link: string;
  snippet?: string;
}

interface ResponseData {
  answer: string;
  sources?: Source[];
  followUpQuestions?: string[];
  varkStyle?: string;
}

const learningStyles = [
  { id: "visual", name: "👀 Visual" },
  { id: "auditory", name: "🎧 Auditory" },
  { id: "readWrite", name: "📖 Reading/Writing" },
  { id: "kinesthetic", name: "🖐️ Kinesthetic" },
];

const highlightKeywords = (text: string) => {
  const keywords = ["React", "JavaScript", "TypeScript", "API", "backend"]; // Customize these
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b(?![^(]*\\))`, "gi");

  return text.replace(regex, (match) => `**${match}**`); // Wrap in markdown bold (**bold**)
};

const Kinesthetic: React.FC = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const submitQuery = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setResponseData(null);
    setMessage(query);

    try {
      const res = await fetch("http://localhost:3005/kinesthetic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          returnFollowUpQuestions: true,
        }),
      });
      const data: ResponseData = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <section className="pt-32 pb-16 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Ask Your Kinesthetic Question</h2>
        <form onSubmit={(e) => { e.preventDefault(); submitQuery(message); }} className="space-y-6">
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {responseData && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Response</h3>
            <div className="prose max-w-none mb-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => <a {...props} style={{ color: 'blue' }} target="_blank" rel="noopener noreferrer" />,
                  // Ensure links are rendered in blue
                  strong: ({ children }) => <span>{children}</span>,
                  em: ({ children }) => <span>{children}</span>,
                }}
              >
                {highlightKeywords(responseData.answer)}
              </ReactMarkdown>
            </div>

            {responseData.followUpQuestions && responseData.followUpQuestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-2">Follow-Up Questions:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {responseData.followUpQuestions.map((q, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-indigo-600 hover:underline"
                      onClick={() => submitQuery(q)}
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Kinesthetic;
