const mongoose = require("mongoose");

const connectdb = () => {
    mongoose.connect("mongodb+srv://tlane11:ruxheB-bysvo7-taxfiz@cluster0.5c9dkqz.mongodb.net/?retryWrites=true&w=majority"
)
    .then(() => {console.log(`Database Connected, Receiving Data`)})
    .catch(console.error);
}
module.exports = connectdb;