const allProductUrl = "http://localhost:3000/api/product/all";
const allCartUrl = "http://localhost:3000/api/cart/all";
const addCartUrl = "http://localhost:3000/api/cart/add";
const removeCartUrl = "http://localhost:3000/api/cart/remove";
const clearCartUrl = "http://localhost:3000/api/cart/clear";
const logoutUrl = "http://localhost:3000/api/user/logout";
const loginUrl = "login.html";
const successUrl = "success.html";

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

allProducts = [];
popularLaptops = [];
modernLaptops = [];
cartItems = []
cartTotal = "";
const token = sessionStorage.getItem('e-commerce-token');
const loggedInEmail = sessionStorage.getItem('e-commerce-user-email');
const loggedInName = sessionStorage.getItem('e-commerce-user-name');

if (loggedInEmail) {
  $('#oEmail').val(loggedInEmail)
}
if (loggedInName) {
  $('#oName').val(loggedInName)
}

if (token) {
  $('#loginBtn').hide();
  $('#logoutBtn').show();
  $('#cartBtn').show();
} else {
  $('#loginBtn').show();
  $('#logoutBtn').hide();
  $('#cartBtn').hide();
}

/**
 * Fetch ALl Products
 */
var xhr = new XMLHttpRequest();
xhr.open('GET', allProductUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Request was successful
    var response = xhr.responseText;
    allProducts = JSON.parse(response);
    popularLaptops = allProducts.filter(item => item.category === 'popular');
    modernLaptops = allProducts.filter(item => item.category === 'modern');

    $.each(popularLaptops, function (index, obj) {
      $("#category-1").append(`
          <div class="box">
                <span class="price"> ₹${obj.price} </span>
                <img src="${obj.imagePath}" alt=" ">
                <h3>${obj.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <a class="btn c-pointer" onclick="addToCart(${obj.productId})">Add to Cart</a>
            </div>
          `);
    });

    $.each(popularLaptops, function (index, obj) {
      $("#category-2").append(`
          <div class="box">
                <img src="${obj.imagePath}" alt="">
                <div class="content">
                    <h3>${obj.name}</h3>
                    <a class="btn c-pointer" onclick="addToCart(${obj.productId})">Add to Cart</a>
                </div>
            </div>
          `);
    });
  } else {
    console.log(response);
  }
};
xhr.send();


function logout() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', logoutUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      sessionStorage.removeItem('e-commerce-token');
      sessionStorage.removeItem('e-commerce-user-name');
      sessionStorage.removeItem('e-commerce-user-email');
      window.location.href = loginUrl;
    } else {
      showToast(xhr.responseText || 'Error');
    }
  };

  // Execute
  xhr.send();
}


/**
 * Cart Functions
 */
function GetAllCartItems() {
  $('#cartSection').empty();
  $('#cartSection').append(`<div class="cart-close"><i class="fa-solid fa-xmark c-pointer" onclick="showCart()"></i></div>`);
  $('#cartSection').append(`<div class="no-items">No Items in Cart</div>`);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', allCartUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const userToken = sessionStorage.getItem('e-commerce-token');
  const userEmail = sessionStorage.getItem('e-commerce-user-email');
  if (userToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
  }
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      var response = xhr.responseText;

      cartItems = JSON.parse(response || "[]") || [];
      $('#cartSection').empty();
      $('#cartSection').append(`<div class="cart-close"><i class="fa-solid fa-xmark c-pointer" onclick="showCart()"></i></div>`);
      $.each(cartItems, function (index, obj) {
        $("#cartSection").append(`
        <div class="cart-item">
            <span class="fas fa-times" onclick="removeFromCart(${index})"></span>
            <img src="${obj.imagePath}" alt="" loading="lazy">
            <div class="content">
                <h3>${obj.name}</h3>
                <div class="price">₹${obj.price}</div>
            </div>
        </div>
            `);
      });
      cartTotal = cartItems.map(item => parseFloat(item.price.replaceAll(',', ''))).reduce((partialSum, a) => partialSum + a, 0);
      if (cartItems.length) {
        $('#cartSection').append(`<h3 class="total"> Sub Total = ₹${cartTotal}/-</h3>`);
        $('#cartSection').append(`<a href="#order" class="btn">checkout now</a>`);
      } else {
        $('#cartSection').append(`<div class="no-items">No Items in Cart</div>`);
      }

    } else {
      showToast(xhr.responseText || 'Error');
      cartItems = [];
      $('#cartSection').empty();
      $('#cartSection').append(`<div class="cart-close"><i class="fa-solid fa-xmark c-pointer" onclick="showCart()"></i></div>`);
      $('#cartSection').append(`<div class="no-items">No Items in Cart</div>`);
    }
  };

  // Execute
  xhr.send(JSON.stringify({
    email: userEmail
  }));
}
function addToCart(productId) {
  const product = allProducts.find(item => item.productId == productId);

  console.log(product);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', addCartUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const userToken = sessionStorage.getItem('e-commerce-token');
  const userEmail = sessionStorage.getItem('e-commerce-user-email');
  if (userToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
  }
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      var response = xhr.responseText;
      showToast('Added to cart', 'fa-solid fa-circle-check text-success')
      GetAllCartItems();
    } else {
      showToast(xhr.responseText || 'Error');
    }
  };

  // Execute
  xhr.send(JSON.stringify({
    ...product,
    email: userEmail
  }));
}
function showCart() {
  if ($('#cartSection').hasClass('active')) {
    $('#cartSection').removeClass('active');
  } else {
    GetAllCartItems();
    $('#cartSection').addClass('active');
  }
}
function removeFromCart(index) {
  const itemToRemove = cartItems[index] || null;
  if (!itemToRemove) {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', removeCartUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const userToken = sessionStorage.getItem('e-commerce-token');
  const userEmail = sessionStorage.getItem('e-commerce-user-email');
  if (userToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
  }
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      var response = xhr.responseText;

      GetAllCartItems();
    } else {
      showToast(xhr.responseText || 'Error');
    }
  };

  // Execute
  xhr.send(JSON.stringify({
    email: userEmail,
    productId: itemToRemove.productId
  }));
}
function clearAllCartItems(navigateToSuccess) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', clearCartUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const userToken = sessionStorage.getItem('e-commerce-token');
  const userEmail = sessionStorage.getItem('e-commerce-user-email');
  if (userToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
  }
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      var response = xhr.responseText;
      cartItems = [];
      $('#cartSection').empty();
      $('#cartSection').append(`<div class="cart-close"><i class="fa-solid fa-xmark c-pointer" onclick="showCart()"></i></div>`);
      $('#cartSection').append(`<div class="no-items">No Items in Cart</div>`);
      if (navigateToSuccess) {
        window.location.replace(successUrl)
      }
    } else {
      showToast(xhr.responseText || 'Error');
    }
  };

  // Execute
  xhr.send(JSON.stringify({
    email: userEmail
  }));
}


function OrderConfirm() {
  if (!cartItems || !cartItems.length) {
    showToast('Please add items to the cart');
    $('#cartSection').addClass('active');
    return;
  }

  if (!$('#oName').val()) {
    showToast('Please enter Name');
    return;
  }
  if (!$('#oNumber').val()) {
    showToast('Please enter Number');
    return;
  }
  if (!$('#oEmail').val()) {
    showToast('Please enter Email');
    return;
  }
  if (!$('#oAddress').val()) {
    showToast('Please enter Address');
    return;
  }
  if (!$('#oPin').val()) {
    showToast('Please enter Pin code');
    return;
  }

  // TO DO PENDING: Save order under logged in name in BE

  clearAllCartItems(true);
}

menu.onclick = () => {

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('#scroll-top').classList.add('active');
  } else {
    document.querySelector('#scroll-top').classList.remove('active');
  }

}




/**
 * 
 * @param {Toast message} message 
 */
function showToast(message, css = 'fa-solid fa-circle-exclamation') {
  const toastContainer = document.getElementById('toast-container');
  $("#toast-message").text(message);
  $("#toast-icon").removeClass();
  $("#toast-icon").addClass(css);

  // toastContainer.appendChild(toast);

  setTimeout(() => {
    toastContainer.style.opacity = '1';
    toastContainer.style.display = 'flex';
  }, 10);

  setTimeout(() => {
    toastContainer.style.opacity = '0';
    toastContainer.style.display = 'none';
    setTimeout(() => {
      toastContainer.empty();
    }, 300);
  }, 3000); // 3000 milliseconds (3 seconds) for the toast to disappear
}
