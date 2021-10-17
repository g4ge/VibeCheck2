# VibeCheck

## Running the User App

### React (User)

_Notes: `.env` file that contains AWS credentials (for S3 image storing) and API routes is not pushed due to privacy concerns._

1. run `cd user/react-vc-user` to go to the project directory.
2. run `npm install` to install the modules listed as dependencies in `package.json`.
3. run `npm start` and open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Node, Express, Sequelize and Rest API

1. run `cd user/express` to go to the project directory.
2. run `npm install` to install the modules listed as dependencies in `package.json`.
3. run `node server.js` to start the server.

## Running the Admin App

### React (Admin)

1. run `cd admin/react-vc-admin` to go to the project directory.
2. run `npm install` to install the modules listed as dependencies in `package.json`.
3. create a `.env` file in the current directory and add `PORT=8080` in this file.
4. run `npm start` and open [http://localhost:8080](http://localhost:8080) to view the app in the browser.

### Node, Express, Sequelize and GraphQL

1. run `cd admin/express` to go to the project directory.
2. run `npm install` to install the modules listed as dependencies in `package.json`.
3. run `node server.js` to start the server.
