import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/cartDB').then(() => console.log('MongoDB connected'));

const CartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const CartItem = new mongoose.model("CartItem", CartItemSchema);

app.post('/cart', async (req, res) => {
  const item = new CartItem(req.body);
  await item.save();
  res.status(201).send(item);
});

app.get('/cart', async (req, res) => {
  const items = await CartItem.find();
  res.send(items);
});


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
