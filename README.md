[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19656664&assignment_repo_type=AssignmentRepo)

npm i
npm start

POST /register
POST /login

Preferences
GET /preferences to retrieve the logged-in user's preferences.
PUT /preferences to allow users to update their news preferences (e.g., categories, languages).

News
GET /news to fetch news articles for the logged-in user based on their preferences.
POST /news/:id/read: Mark a news article as read.
POST /news/:id/favorite: Mark a news article as a favorite.
GET /news/read: Retrieve all read news articles.
GET /news/favorites: Retrieve all favorite news articles.
GET /news/search/:keyword Search Functionality
