const express= require('express');
const mongoose= require('mongoose');
const app= express();
const connectDB = async ()=> {
mongoose.connect('mongodb://localhost:27017/Thesis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
const productSchema = new mongoose.Schema({});
const Product = mongoose.model('Product', productSchema);
const data = await Product.find({});
console.warn(data);
}
 connectDB();


app.listen(3000);
