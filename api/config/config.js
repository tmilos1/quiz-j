module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/quiz',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 8999,
    QUIZ_HOST: process.env.QUIZ_HOST ? process.env.QUIZ_HOST : 'http://localhost:3001'
}
