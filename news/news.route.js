const express = require("express");
const { getNews, markAsRead, markAsFavorite, getAllFavoriteArticles, getAllReadArticles, searchNewsByKeywords } = require("./news.controller");
const authMiddleware = require("../middleware");
const router = express.Router()

router.get("/", authMiddleware ,getNews);
router.get("/:id/read", authMiddleware ,markAsRead);
router.get("/:id/favorite", authMiddleware ,markAsFavorite);
router.get("/read", authMiddleware, getAllReadArticles);
router.get("/favorites", authMiddleware, getAllFavoriteArticles);
router.get("/search/:keyword", authMiddleware, searchNewsByKeywords);

module.exports = router