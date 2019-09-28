NodeJS express MongoDb example
==================================

This is a simple experimental example of how to match MongoDb, express and cors for the implementation of a NodeJs Rest API.

- This project requires a version of NodeJS with support for async-await

Getting Started
---------------

```sh
# clone the project
git clone https://github.com/lexican/NodeJs-RESTAPI.git 
cd NodeJs-RESTAPI 

# Install dependencies
npm install
#ensure your mongodb server is up and running
mongoose.connect('mongodb://localhost:27017/issues', {useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
  console.log("Connected successfully");
});
# Run the server
node server

# End points
#return all issues in json format
http://localhost:4000/

#return issue where id=id 
http://localhost:4000/issues/:id

#create issue
http://localhost:4000/issues/add

#update issue
http://localhost:4000/issues/update/:id

#delete issue
http://localhost:4000/issues/delete/:id

```

Please remember to export the Issue schema

```js
models.js
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const Issue = new mongoose.Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    severity: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "open"
    }
});
module.exports = mongoose.model('Issue', Issue);
```

License
-------

MIT
