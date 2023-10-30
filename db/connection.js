import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:lm2oD8JAP6LNq5R8@cluster0.w01n3a5.mongodb.net/').then(() => {
    console.log("connection established to the DB");
}).catch((err) => {
    console.log(`error occured while connecting to the DB: ${err}`);
})

// module.exports = mongoose
export default mongoose