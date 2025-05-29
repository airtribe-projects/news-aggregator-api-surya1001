const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const User = require("../user/user.schema")

// In-memory cache for news articles, user article status
const newsCache = []


const getNews = async (req, res) => {
    try {
        const userId = req.user.userId;
        const getUser = await User.findById(userId);
        const categories = getUser?.preferences?.categories || ['techonology','sports'];
        const language = getUser?.preferences?.languages || ['hi'];
        const results = [];

        for (const category of categories) {
            const res = await newsapi.v2.sources({
                category,
                language: language,
                country: ['us','in']
            })
            if(res?.sources) results.push(...res.sources);
        }
        
        return res.json(results)
    } catch (err) {
        console.log("Error in fetching news ", err);
        return res.status(500).json({message: "Something went wrong while fetching news "})
    }
}

const markAsRead = async (req, res) => {
    await User.findByIdAndUpdate(req.user.userId, { $addToSet: { readArticles: req.params.id } });
    res.json({ message: "Marked as read" });
};
  
const markAsFavorite = async (req, res) => {
    await User.findByIdAndUpdate(req.user.userId, { $addToSet: { favoriteArticles: req.params.id } });
    res.json({ message: "Marked as favorite" });
};

const getAllReadArticles = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json(user.readArticles || []);
};

const getAllFavoriteArticles = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json(user.favoriteArticles || []);
};

const searchNewsByKeywords = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const response = await newsapi.v2.everything({
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
      });
  
      res.json(response.articles || []);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ message: "Search failed" });
    }
};
  
  
module.exports = {
    getNews,
    markAsRead,
    markAsFavorite,
    getAllReadArticles,
    getAllFavoriteArticles,
    searchNewsByKeywords
}