# Start-Challenge-Prototype

The backend follows Model View Controller architecture where data
schemas are present in the Models folder and API endpoints are in the
controller folder.

Express is used to create routes and call the respective controller
functions for a given api url.

MongoDB Atlas is used to store data about challenges, questions, and answers.
Mongoose is used as a middleware to interact with the MongoDB Atlas.

The frontend uses React Query to retrieve and modify the data using the
backend API endpoints. The resulting data is then rendered using React
and Tailwind CSS. Page routing is handled using React Router.
