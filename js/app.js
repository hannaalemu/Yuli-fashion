'use strict';

//spanElement = the current cart item count HTML element at the top right
var spanElement = document.getElementById('itemCount');

// Cart constructor.
var Cart = function (items) {
  this.items = items;
};
var cart = new Cart([]);

// create a new CartItem and add it to this.items
Cart.prototype.addItem = function (itemName, quantity) {
  var isInCart = false;
  // if cart is not empty check if item already in cart
  if (cart.items.length) {
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productName === itemName) {
        isInCart = true;
        var updatedQuantity = parseInt(cart.items[i].quantity) + parseInt(quantity);
        cart.items[i].quantity = updatedQuantity;
        break;
      }
    }
  }

  // if item not in cart create it
  if (!isInCart) {
    // find the right product by itemName
    for (let i = 0; i < Product.allProducts.length; i++) {
      if (Product.allProducts[i].name === itemName) {
        var tempItem = new CartItem(Product.allProducts[i], quantity);
        this.items.push(tempItem);
      }
    }
  }
  this.saveToLocalStorage();
};

Cart.prototype.removeItem = function (productName) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].productName === productName) {
      this.items.splice(i, 1);
    }
  }
  this.saveToLocalStorage();
};

Cart.prototype.saveToLocalStorage = function () {
  // TODO: Fill in this instance method to save the contents of the cart to localStorage
  var cartItemList = JSON.stringify(this.items);
  localStorage.setItem('cartData', cartItemList);

  // Whenever localStorage is updated the below updates the cart item count in the top right
  if (isNaN(this.items.length) || this.items.length === 0){
    spanElement.textContent = '( ' + 0 + ' )';
  } else {
    var itemCount = 0;
    for (var i = 0; i < cartItemList.length; i++){
      cartItemList = JSON.parse(localStorage.getItem('cartData'));
      itemCount += parseInt(cartItemList[i].quantity);
      spanElement.textContent = `(${itemCount})`;
    }
  }
};

Cart.prototype.loadFromLocalStorage = function () {
  var cartItemList = JSON.parse(localStorage.getItem('cartData'));
  var itemCount = 0;

  if (cartItemList) {
    cart.items = cartItemList;
    for(var i = 0; i < cart.items.length; i++){
      itemCount += parseInt(cart.items[i].quantity);
    }
    spanElement.textContent = `( ${itemCount} )`;
  } else {
    spanElement.textContent = '( ' + 0 + ' )';
  }
};

var CartItem = function (product, quantity) {
  this.productName = product.name;
  this.quantity = quantity;
  this.filePath = product.filePath;
};

// Product contructor.
var Product = function (filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag');
  new Product('assets/banana.jpg', 'Banana');
  new Product('assets/bathroom.jpg', 'Bathroom');
  new Product('assets/boots.jpg', 'Boots');
  new Product('assets/breakfast.jpg', 'Breakfast');
  new Product('assets/bubblegum.jpg', 'Bubblegum');
  new Product('assets/chair.jpg', 'Chair');
  new Product('assets/cthulhu.jpg', 'Cthulhu');
  new Product('assets/dog-duck.jpg', 'Dog-Duck');
  new Product('assets/dragon.jpg', 'Dragon');
  new Product('assets/pen.jpg', 'Pen');
  new Product('assets/pet-sweep.jpg', 'Pet Sweep');
  new Product('assets/scissors.jpg', 'Scissors');
  new Product('assets/shark.jpg', 'Shark');
  new Product('assets/sweep.png', 'Sweep');
  new Product('assets/tauntaun.jpg', 'Taun-Taun');
  new Product('assets/unicorn.jpg', 'Unicorn');
  new Product('assets/usb.gif', 'USB');
  new Product('assets/water-can.jpg', 'Water Can');
  new Product('assets/wine-glass.jpg', 'Wine Glass');
}

// Initialize the app by creating the big list of products with images and names
cart.loadFromLocalStorage();
generateCatalog();
