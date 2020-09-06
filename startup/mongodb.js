const mongoose = require('mongoose');
const winston = require("winston");

module.exports = function () {
    mongoose.connect("mongodb://localhost/mongo-project", { 'useNewUrlParser': true, 'useFindAndModify': false, 'useCreateIndex': true, useUnifiedTopology: true})
        .then( () => winston.info("Connection Established...") );
}

// module.exports = function () {
//     mongoose.connect("mongodb+srv://hannanazmat753:XGPnWZStjUpFcc1C@cluster0.ygh3a.mongodb.net/lcapp?retryWrites=true&w=majority", { 'useNewUrlParser': true, 'useFindAndModify': false, 'useCreateIndex': true, useUnifiedTopology: true})
//         .then( () => winston.info("Connection Established...") );
// }

