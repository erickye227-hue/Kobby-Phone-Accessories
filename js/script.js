// ===============================
// LOAD CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];



// ===============================
// LOAD PRODUCTS
// ===============================

let products = JSON.parse(localStorage.getItem("products")) || [

{
    name:"iPhone Charger",
    price:120,
    category:"Charger",
    stock:10,
    image:"images/charger.webp"
},


{
    name:"Power Bank",
    price:180,
    category:"Power",
    stock:10,
    image:"images/powerbank.webp"
},


{
    name:"Earpods",
    price:250,
    category:"Audio",
    stock:10,
    image:"images/earpods.webp"
},


{
    name:"Pendrive",
    price:80,
    category:"Storage",
    stock:10,
    image:"images/pendrive.webp"
},


{
    name:"Memory Card",
    price:60,
    category:"Storage",
    stock:10,
    image:"images/memorycard.webp"
},


{
    name:"Phone Protector",
    price:25,
    category:"Protection",
    stock:10,
    image:"images/screen-protector.webp"
}


];



// Save products

localStorage.setItem(
    "products",
    JSON.stringify(products)
);





// ===============================
// DISPLAY STORE PRODUCTS
// ===============================


function displayStoreProducts(searchText = ""){


const productList =
document.getElementById("product-list");


if(!productList) return;



let filteredProducts = products.filter(product => {


return product.name.toLowerCase()
.includes(searchText.toLowerCase())

||

product.category.toLowerCase()
.includes(searchText.toLowerCase());


});



let html = "";



filteredProducts.forEach(product => {


html += `


<div class="product-card">


<span class="product-badge">
NEW
</span>



<img 
src="${product.image || 'images/no-image.png'}"
alt="${product.name}"
>



<h3>
${product.name}
</h3>



<p class="category">
${product.category}
</p>



<p class="price">
₵${product.price}
</p>



<p class="stock">
Stock: ${product.stock}
</p>



${
product.stock > 0

?

`

<button onclick="addToCart('${product.name}',${product.price})">
Add to Cart
</button>

`

:

`

<button disabled class="out-stock">
Out of Stock
</button>

`

}



</div>


`;



});





if(filteredProducts.length === 0){


html =
"<p>No products found.</p>";


}



productList.innerHTML = html;


}





// Load products on store

displayStoreProducts();




// ===============================
// PRODUCT SEARCH
// ===============================


const searchInput =
document.getElementById("product-search");



if(searchInput){


searchInput.addEventListener("input",function(){


displayStoreProducts(this.value);


});


}
// ===============================
// UPDATE CART COUNT
// ===============================


function updateCartCount(){


const cartCountElements =
document.querySelectorAll("#cart-count");



cartCountElements.forEach(element=>{


element.textContent =
cart.reduce(
(total,item)=> total + item.quantity,
0
);


});


}





// ===============================
// SAVE CART
// ===============================


function saveCart(){


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


updateCartCount();


}





// ===============================
// ADD TO CART
// ===============================


function addToCart(name, price){



let existingProduct =
cart.find(
item => item.name === name
);




// CHECK STOCK

let product =
products.find(
item => item.name === name
);



if(product){


let currentQuantity =
existingProduct
?
existingProduct.quantity
:
0;



if(currentQuantity >= product.stock){


alert(
"Sorry, only " + product.stock + " available."
);


return;


}


}




// ADD PRODUCT TO CART

if(existingProduct){


existingProduct.quantity++;


}else{


cart.push({


name:name,

price:price,

quantity:1


});


}




// SAVE CART

saveCart();



// UPDATE CART NUMBER

updateCartCount();



}


// LOAD CART COUNT

updateCartCount();
// ===============================
// DISPLAY CART
// ===============================


const cartItemsDiv =
document.getElementById("cart-items");


const cartTotalDiv =
document.getElementById("cart-total");



const checkoutBtn =
document.getElementById("checkout-btn");





function displayCart(){



if(!cartItemsDiv) return;




if(cart.length === 0){



cartItemsDiv.innerHTML =
"<p>Your cart is empty.</p>";



if(checkoutBtn){

checkoutBtn.style.display="none";

}



if(cartTotalDiv){

cartTotalDiv.textContent =
"Total: ₵0";

}



return;


}





let html = "";

let total = 0;




cart.forEach((item,index)=>{


let itemTotal =
item.price * item.quantity;



total += itemTotal;




html += `


<div class="cart-item">


<div>


<h3>
${item.name}
</h3>


<p>
₵${item.price} x ${item.quantity}
</p>


</div>





<div>


<button onclick="decreaseQuantity(${index})">
-
</button>



<span>
${item.quantity}
</span>



<button onclick="increaseQuantity(${index})">
+
</button>




<button onclick="removeFromCart(${index})">
Remove
</button>



</div>



</div>


`;



});




cartItemsDiv.innerHTML = html;



if(cartTotalDiv){


cartTotalDiv.textContent =
"Total: ₵" + total;


}




if(checkoutBtn){


checkoutBtn.style.display =
"inline-block";


}



}





// ===============================
// INCREASE QUANTITY
// ===============================


function increaseQuantity(index){


let item = cart[index];



let product =
products.find(
p => p.name === item.name
);




if(product && item.quantity >= product.stock){


alert(
"Only " + product.stock + " available."
);


return;


}



item.quantity++;



saveCart();


displayCart();



}





// ===============================
// DECREASE QUANTITY
// ===============================


function decreaseQuantity(index){



if(cart[index].quantity > 1){



cart[index].quantity--;



}else{


cart.splice(index,1);


}




saveCart();


displayCart();



}






// ===============================
// REMOVE ITEM
// ===============================


function removeFromCart(index){



cart.splice(index,1);



saveCart();


displayCart();



}



// LOAD CART

displayCart();
// ===============================
// FINAL PAGE LOADING
// ===============================


// Update cart number everywhere

updateCartCount();



// Display products on store page

displayStoreProducts();



// Display cart on cart page

displayCart();



// ===============================
// DEBUG CHECK
// ===============================

console.log("Kobby Store Loaded");

console.log(
"Products:",
products
);

console.log(
"Cart:",
cart
);