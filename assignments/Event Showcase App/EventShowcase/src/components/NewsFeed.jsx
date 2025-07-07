import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../api/newsApi";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchTopHeadlines()
      .then(data => {
        console.log(data); // Debug
        setArticles(data.articles || []);
      })
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
