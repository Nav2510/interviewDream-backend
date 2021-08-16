# InterviewDream-backend

Graphql apis for interviewDream project. This project is build using node and express framework. Graphql and Apollo Server is used for creating apis.

## Database

Project fetch data from [Mongodb cloud server](https://cloud.mongodb.com/). All the CRUD operations are performed using [Mongoose ODM](https://mongoosejs.com/).

## Setting up Mongodb cloud for nodemon

Database can be connected by setting up mongodb locally or using [Mongodb cloud](https://cloud.mongodb.com/)

1. Create a `nodemon.json` file in root folder.
2. Add below code <br/>
<pre><code>{
  "env": {
    "PORT": YOUR_PREFERRED_PORT_VALUE,
    "MONGO_ATLAS_URI": YOUR_MONGOATLAS_URI
    } 
}</code></pre>

3. Update `YOUR_PREFERRED_PORT_VALUE` and `YOUR_MONGOATLAS_URI`
4. script `start:dev`

## Runnning dev server

Development server can be run using `start:dev` command in cli. Please make sure you have setup nodemon.json file locally.
