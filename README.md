# Capstone 2 Swolely

I created this app because I love coding and weightlifting. I started working out 13 years ago and only weighed 100 pounds and could barely hold a bar and now I weigh 210 pounds and just broke personal records this past month squatting 4 plates benching 3 plates and deadlifting 450 pounds. I look amazing and feel amazing, I love going to the gym and maxing out machines, it's the same feeling I get from successfully creating an app. With Swolely you can document your journey through the time tested blog. Create your legacy and look back on it with confidence by creating posts and documenting customizable workout plans and diets and share them with your friends! Get SWOLE.

Swolely is a FULL stack application that uses:

### React 
Powerful front-end library for building the user interface. I chose React because it allows for efficient development of complex, interactive interfaces. It has component-based architecture allows us to create reusable code, making it easier to maintain and update my website.

### Node.js
A server-side runtime environment that I used to build our server. It has a large and active community, making it easy to find resources and support. It also allows us to use JavaScript on both the client and server-side, making it easier to write and maintain the codebase.

### Express
A Node.js framework that I used to build the RESTful API. It simplifies the process of building Swolely by by providing a set of powerful and flexible features and tools. It also integrates well with other Node.js modules, making it easy to use with the other technologies.

### PostgreSQL
A sturdy and powerful open-source relational database management system that I used to store and manage the data. I chose PostgreSQL because it is known for its reliability, performance, and scalability. It also supports advanced features like JSON data types, making it a good fit for our application.

# APIs Used
exerciseDB API\
https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
Youtube search and download API\
https://rapidapi.com/h0p3rwe/api/youtube-search-and-download

Overall, I chose these technologies because they are reliable, well-documented, and popular in the development community. They allowed me to build a scalable, efficient, and maintainable web application that meets my needs.

Setting up Backend Servers
---
Install package.json:\
npm install

Create your Virtual Environment:\
$ python3 -m venv venv

Start the Virtual Environment:\
$ source venv/bin/activate

Start your PSQL database:\
$ sudo service postgresql start

Create your Database in PSQL:\
$ psql\
`#` CREATE DATABASE swolely;

Seed Swolely and poulate it with the tables\
$ psql swolely < swolely.sql

Start Backend Server:\
$ nodemon server.js

Starting Frontend
---
Install Frontend package.json
$ npm install
$ npm start

Thank you for using Swolely! Stay Swole!
---

Authors
Github: @AlexanderSChen
Twitter: @kikikatme
LinkedIn: Alexander-Chen
