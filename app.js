const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

const app = express();

mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then((result) => {
    console.log('Mogno atlas connected!!');
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Mongodb connection failed with error: ${error}`);
  });
