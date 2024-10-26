const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Shopping Cart Operations

// Cart data
let cart = [
  // { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  // { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Q1 Add an Item to the Cart
function addItemToCart(cart, item) {
  cart.push(item);
  return cart;
}

app.get('/cart/add', (request, response) => {
  const productId = parseInt(request.query.productId);
  const name = request.query.name;
  const price = parseFloat(request.query.price);
  const quantity = parseInt(request.query.quantity);
  const item = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart = addItemToCart(cart, item);
  response.json({ cartItems: cart });
});

// Q2 Edit Quantity of an Item in the Cart
function updateCartQty(cart, id, qty) {
  cart.forEach((item) => {
    if (item.productId === id) {
      item.quantity = qty;
    }
  });
  return cart;
}

app.get('/cart/edit', (request, response) => {
  const productId = parseInt(request.query.productId);
  const quantity = parseInt(request.query.quantity);
  cart = updateCartQty(cart, productId, quantity);
  response.json({ cartItems: cart });
});

// Q3 Delete an Item from the Cart
function deleteCartById(cart, id) {
  return cart.filter((item) => item.productId != id);
}

app.get('/cart/delete', (request, response) => {
  const productId = parseInt(request.query.productId);
  cart = deleteCartById(cart, productId);
  response.json({ cartItems: cart });
});

// Q4 Read Items in the Cart
app.get('/cart', (request, response) => {
  response.json({ cartItems: cart });
});

// Q5 Calculate Total Quantity of Items in the Cart
function getTotalQty(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

app.get('/cart/total-quantity', (request, response) => {
  const qty = getTotalQty(cart);
  response.json({ totalQuantity: qty });
});

// Q6 Calculate Total Price of Items in the Cart
function getTotalPrice(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

app.get('/cart/total-price', (request, response) => {
  const totalPrice = getTotalPrice(cart);
  response.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
