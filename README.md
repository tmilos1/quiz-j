
# APP Structure

We have three main parts of application:
- api
- admin
- web

Requirements: Node.js version 14

## API

npm install 

Configure env settings:
MONGO_URL - mongodb connection string, eg. 'mongodb://localhost:27017/quiz'
APP_PORT - exposed API port, eg. 8999
QUIZ_HOST - where are quizzess hosted, eg. 'https://jdemotest123.com/quiz 

API create links for quiz participants, so they could be invited by sending link.
If the final link is https://jdemotest123.com/quiz/q/12323232 we set for QUIZ_HOST
'https://jdemotest123.com/quiz'

Server is locally started with:
node index.js

or for production deployment using pm2

Test with: 
curl -i -X GET "localhost:8999/quizzes" -H "Content-Type: application/json"


## Admin

yarn install 

Create .env.development and .env.production files, and configure env settings:
REACT_APP_API_URL="http://localhost:8999"
REACT_APP_SUBDOMAIN="/quiz/setup "

REACT_APP_API_URL - Api server url
REACT_APP_SUBDOMAIN - subfolder in which the application is available, eg. for
https://jdemotest123.com/quiz/setup we put /quiz/setup.

yarn start

yarn build - to have an optimized production build, available from build folder

## Web

yarn install 

Create .env.development and .env.production files, and configure env settings:
REACT_APP_API_URL="http://localhost:8999"
REACT_APP_SUBDOMAIN="/quiz"

REACT_APP_API_URL - Api server url
REACT_APP_SUBDOMAIN - subfolder in which the application is available, eg. for
https://jdemotest123.com/quiz/q/12323232 we put /quiz.

yarn start

yarn build - to have an optimized production build, available from build folder
