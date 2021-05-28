const express = require('express');
const bodyparser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler.js');
const { notFoundHandler } = require('./middlewares/404Handler.js');
const { connectDB }= require('./database/db.js')
const app = express();
app.use(bodyparser.json());
const productRouter = require('./router/products.router.js');
const cartRouter = require('./router/cart.router');
const wishlistRouter = require('./router/wishlist.router.js')

connectDB();

app.use("/products", productRouter);
app.use("/cartitems",cartRouter);
app.use("/wishlist",wishlistRouter);



app.get("/", (req, res) => {
  res.json({message: "Hello World"});
});





app.use(notFoundHandler)
app.use(errorHandler)
const PORT = 3000 
app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});