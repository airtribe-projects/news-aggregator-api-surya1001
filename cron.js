const cron = require('node-cron');
const User = require("./user/user.schema")

cron.schedule('*/10 * * * *', async () => {
  console.log('Updating news cache...');
  const users = await User.find({});

  for (const user of users) {
    const categories = user.preferences?.categories || ['technology'];
    const language = user.preferences?.languages || ['en'];
    const cacheKey = `${user._id}-${categories.join(',')}-${language.join(',')}`;

    const results = [];
    for (const category of categories) {
      const response = await newsapi.v2.sources({
        category,
        language: language[0],
        country: 'us',
      });
      if (response?.sources) results.push(...response.sources);
    }

    newsCache.set(cacheKey, results);
  }
});
