// =======================
// CYPRUS KING ENTERPRISES
// MAIN SCRIPT - PART 1
// PRODUCTS + ADMIN + PRODUCT PAGE
// =======================


// =======================
// DEFAULT PRODUCTS
// =======================

let defaultProducts = [

{
name:"Premium Fashion",
price:50,
category:"Fashion",
image:"fashion.jpg",
description:"Stylish clothing and accessories for modern customers."
},

{
name:"Smart Electronics",
price:100,
category:"Electronics",
image:"electronics.jpg",
description:"Quality gadgets and electronic solutions."
},

{
name:"Digital Services",
price:30,
category:"Digital",
image:"digital.jpg",
description:"Professional online digital services."
},

{
name:"Luxury Watch",
price:80,
category:"Fashion",
image:"watch.jpg",
description:"Premium watches with elegant design."
},

{
name:"Laptop",
price:500,
category:"Electronics",
image:"laptop.jpg",
description:"Powerful laptops for work and business."
}

];



// =======================
// PRODUCT STORAGE
// =======================


function getProducts(){

let savedProducts = localStorage.getItem("products");


if(savedProducts){

return JSON.parse(savedProducts);

}


localStorage.setItem(
"products",
JSON.stringify(defaultProducts)
);


return defaultProducts;

}



function saveProducts(products){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}




// =======================
// CART COUNT
// =======================


function getCart(){

return JSON.parse(
localStorage.getItem("cartItems")
) || [];

}



function updateCartCount(){

let count =
document.getElementById("cart-count");


if(count){

count.innerHTML =
getCart().length;

}

}


updateCartCount();




// =======================
// DISPLAY PRODUCTS
// =======================


let productContainer =
document.getElementById("product-container");



if(productContainer){


let products =
getProducts();



productContainer.innerHTML="";



products.forEach(function(product){


productContainer.innerHTML += `

<div class="product-card">


<img src="${product.image}">


<h3>${product.name}</h3>


<p>${product.category}</p>


<h4>$${product.price}</h4>


<button onclick="openProduct(
'${product.name}',
'${product.price}',
'${product.category}',
'${product.image}',
'${product.description}'
)">
View Product
</button>


</div>

`;


});


}




// =======================
// OPEN PRODUCT PAGE
// =======================


function openProduct(
name,
price,
category,
image,
description
){


localStorage.setItem(
"productName",
name
);


localStorage.setItem(
"productPrice",
price
);


localStorage.setItem(
"productCategory",
category
);


localStorage.setItem(
"productImage",
image
);


localStorage.setItem(
"productDescription",
description
);



window.location.href =
"product.html";


}




// =======================
// LOAD PRODUCT PAGE
// =======================


let productName =
document.getElementById("product-name");



if(productName){


productName.innerHTML =
localStorage.getItem("productName");


document.getElementById(
"product-price"
).innerHTML =
"$"+localStorage.getItem("productPrice");



document.getElementById(
"product-description"
).innerHTML =
localStorage.getItem("productDescription");



document.getElementById(
"product-image"
).src =
localStorage.getItem("productImage");


}



// =======================
// QUANTITY
// =======================


let quantity = 1;



function increaseQuantity(){

quantity++;


let q =
document.getElementById("quantity");


if(q){

q.innerHTML = quantity;

}

}




function decreaseQuantity(){

if(quantity > 1){

quantity--;

}


let q =
document.getElementById("quantity");


if(q){

q.innerHTML = quantity;

}

}




// =======================
// ADD PRODUCT FROM PRODUCT PAGE
// =======================


function addProductToCart(){


let cart =
getCart();



cart.push({

name:
localStorage.getItem("productName"),

price:
Number(localStorage.getItem("productPrice")),

image:
localStorage.getItem("productImage"),

quantity:quantity

});



localStorage.setItem(
"cartItems",
JSON.stringify(cart)
);



updateCartCount();


alert(
"Product added to cart!"
);


}

// =======================
// BUY NOW BUTTON
// =======================

function buyNow(){


let cart = getCart();



cart.push({

name:
localStorage.getItem("productName"),


price:
Number(localStorage.getItem("productPrice")),


image:
localStorage.getItem("productImage"),


quantity: quantity


});



localStorage.setItem(
"cartItems",
JSON.stringify(cart)
);



window.location.href =
"checkout.html";


}


// =======================
// CYPRUS KING ENTERPRISES
// MAIN SCRIPT - PART 2
// CART + CHECKOUT
// =======================


// =======================
// DISPLAY CART PAGE
// =======================


let cartBox =
document.getElementById("cart-items");


let cartTotal =
document.getElementById("cart-total");



if(cartBox){


let cart =
getCart();


let total = 0;


cartBox.innerHTML = "";



cart.forEach(function(item,index){



if(!item.quantity){

item.quantity = 1;

}



cartBox.innerHTML += `


<div class="product-card">


<img src="${item.image}">


<h3>${item.name}</h3>


<p>
Price: $${item.price}
</p>


<button onclick="changeQuantity(${index},-1)">
-
</button>


<span>
${item.quantity}
</span>


<button onclick="changeQuantity(${index},1)">
+
</button>



<p>
Total: $${item.price * item.quantity}
</p>



<button onclick="removeFromCart(${index})">

Remove

</button>


</div>


`;



total +=
Number(item.price) *
Number(item.quantity);



});



if(cartTotal){

cartTotal.innerHTML =
"Total: $" + total;

}


}




// =======================
// CHANGE CART QUANTITY
// =======================


function changeQuantity(index,change){


let cart =
getCart();



cart[index].quantity =
Number(cart[index].quantity) + change;



if(cart[index].quantity < 1){

cart[index].quantity = 1;

}



localStorage.setItem(
"cartItems",
JSON.stringify(cart)
);



location.reload();


}




// =======================
// REMOVE CART ITEM
// =======================


function removeFromCart(index){


let cart =
getCart();



cart.splice(index,1);



localStorage.setItem(
"cartItems",
JSON.stringify(cart)
);



location.reload();


}




// =======================
// SEARCH PRODUCTS
// =======================


function searchProducts(){


let input =
document.getElementById("search-input")
.value
.toLowerCase();



let cards =
document.querySelectorAll(".product-card");



cards.forEach(function(card){


let name =
card.querySelector("h3")
.innerHTML
.toLowerCase();



if(name.includes(input)){


card.style.display =
"block";


}

else{


card.style.display =
"none";


}


});


}




// =======================
// CATEGORY FILTER
// =======================


function filterProducts(category){


let cards =
document.querySelectorAll(".product-card");



cards.forEach(function(card){


let cat =
card.querySelector("p")
.innerHTML;



if(
category=="All" ||
cat==category
){


card.style.display =
"block";


}

else{


card.style.display =
"none";


}


});


}





// =======================
// CHECKOUT DISPLAY
// =======================


let checkoutBox =
document.getElementById("checkout-items");


let checkoutTotal =
document.getElementById("checkout-total");



if(checkoutBox){


let cart =
getCart();



let total = 0;



checkoutBox.innerHTML = "";



cart.forEach(function(item){



checkoutBox.innerHTML += `


<div class="product-card">


<img src="${item.image}">


<h3>${item.name}</h3>


<p>
Quantity: ${item.quantity}
</p>


<p>
Price: $${item.price}
</p>


<p>
Total:
$${item.price * item.quantity}
</p>


</div>


`;



total +=
item.price * item.quantity;



});



if(checkoutTotal){

checkoutTotal.innerHTML =
"Total: $" + total;

}


}





// =======================
// CHECKOUT FORM
// =======================


let checkoutForm =
document.getElementById("checkout-form");



if(checkoutForm){


checkoutForm.addEventListener(
"submit",
function(e){


e.preventDefault();



let name =
document.getElementById(
"customer-name"
).value;



let phone =
document.getElementById(
"customer-phone"
).value;



let address =
document.getElementById(
"customer-address"
).value;



let cart =
getCart();



let total = 0;



cart.forEach(function(item){

total += item.price * item.quantity;

});




// Save customer details for receipt

localStorage.setItem(

"customerInfo",

`
Name: ${name}
Phone: ${phone}
Address: ${address}
`

);





// CREATE ORDER


let orders =
JSON.parse(
localStorage.getItem("orders")
)
|| [];



let newOrder = {

customerName:name,

phone:phone,

address:address,

products:cart,

total:total,

status:"Pending",

date:
new Date().toLocaleString()

};




orders.push(newOrder);




localStorage.setItem(

"orders",

JSON.stringify(orders)

);





window.location.href =
"receipt.html";



});


}

// =======================
// CYPRUS KING ENTERPRISES
// MAIN SCRIPT - PART 3
// RECEIPT + WHATSAPP + ADMIN
// =======================



// =======================
// RECEIPT PAGE
// =======================


let receiptItems =
document.getElementById("receipt-items");


if(receiptItems){


let cart = getCart();

let total = 0;


receiptItems.innerHTML = "";


cart.forEach(function(item){


receiptItems.innerHTML += `

<div class="receipt-item">

<img src="${item.image}">

<h3>${item.name}</h3>

<p>
Quantity: ${item.quantity}
</p>

<p>
Amount: $${item.price * item.quantity}
</p>

</div>

`;


total += Number(item.price) * Number(item.quantity);


});



let receiptTotal =
document.getElementById("receipt-total");


if(receiptTotal){

receiptTotal.innerHTML =
"Total Paid: $" + total;

}



let receiptNumber =
document.getElementById("receipt-number");


if(receiptNumber){

receiptNumber.innerHTML =
"Receipt No: CK" + Math.floor(Math.random()*100000);

}



let receiptDate =
document.getElementById("receipt-date");


if(receiptDate){

receiptDate.innerHTML =
"Date: " + new Date().toLocaleString();

}



let customer =
document.getElementById("customer-info");


if(customer){

customer.innerHTML =
localStorage.getItem("customerInfo") || "";

}


}




// =======================
// DOWNLOAD RECEIPT
// =======================


function downloadReceipt(){


let receipt =
document.querySelector(".receipt");


if(!receipt){

alert("Receipt not found");

return;

}



let blob =
new Blob(

[
receipt.innerText
],

{
type:"text/plain"
}

);



let link =
document.createElement("a");



link.href =
URL.createObjectURL(blob);



link.download =
"Cyprus-King-Receipt.txt";



link.click();


}




// =======================
// WHATSAPP ORDER
// =======================


function sendWhatsApp(){


let cart =
getCart();



let message =
"Hello Cyprus King Enterprises\n\nOrder Details:\n";



cart.forEach(function(item){


message +=

item.name +
" x" +
item.quantity +
" - $" +
(item.price * item.quantity)
+
"\n";


});



window.open(

"https://wa.me/2347045365298?text=" +
encodeURIComponent(message)

);


}





// =======================
// LOAD ADMIN PRODUCT LIST
// =======================


function loadAdminProducts(){


let adminBox =
document.getElementById("admin-products");



if(!adminBox){

return;

}



let products =
JSON.parse(localStorage.getItem("products"))
|| JSON.parse(localStorage.getItem("savedProducts"))
|| [];


adminBox.innerHTML = "";



if(products.length === 0){

adminBox.innerHTML =
"<p>No products added yet</p>";

return;

}



products.forEach(function(product,index){



adminBox.innerHTML += `


<div class="product-card">


<img src="${product.image}">


<h3>${product.name}</h3>


<p>${product.category}</p>


<h4>$${product.price}</h4>


<button onclick="deleteProduct(${index})">

Delete

</button>


</div>


`;



});


}





document.addEventListener(
"DOMContentLoaded",
function(){

loadAdminProducts();

});



document.addEventListener(
"DOMContentLoaded",
function(){

loadAdminProducts();

}
);






// =======================
// ADD NEW PRODUCT
// =======================


function addNewProduct(){


let name =
document.getElementById("product-name").value;


let price =
document.getElementById("product-price").value;


let category =
document.getElementById("product-category").value;


let imageFile =
document.getElementById("product-image").files[0];



if(
name=="" ||
price=="" ||
category=="" ||
!imageFile
){


alert("Please fill all fields");


return;


}



let products =
getProducts();



let reader = new FileReader();



reader.onload = function(e){



products.push({


name:name,


price:Number(price),


category:category,


image:e.target.result,


description:
"Quality product from Cyprus King Enterprises."


});



saveProducts(products);



alert("Product Added Successfully");



location.reload();


};



reader.readAsDataURL(imageFile);



}





// =======================
// DELETE PRODUCT
// =======================


function deleteProduct(index){



let products =
getProducts();



products.splice(index,1);



saveProducts(products);



location.reload();


}

// =======================
// ADMIN LOGIN
// =======================


function adminLogin(){


let username =
document.getElementById("admin-user").value;


let password =
document.getElementById("admin-pass").value;



if(
username==="admin" &&
password==="12345"
){


localStorage.setItem(
"adminLogin",
"true"
);



window.location.href="admin.html";


}

else{


alert("Wrong username or password");


}


}

// =======================
// ADMIN LOGOUT
// =======================


function adminLogout(){


localStorage.removeItem(
"adminLogin"
);



window.location.href =
"login.html";


}