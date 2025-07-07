const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchEventNews = async () => {
  const response = await fetch(`${NEWS_API_URL}/everything?q=event&apiKey=${NEWS_API_KEY}`);
  const data = await response.json();
  return data.articles;
};

