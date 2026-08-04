// ===============================
// LOAD DATA
// ===============================


let products =
JSON.parse(localStorage.getItem("products")) || [];



let orders =
JSON.parse(localStorage.getItem("orders")) || [];




// ===============================
// DASHBOARD
// ===============================

function loadDashboard(){

// Total Orders
const totalOrders =
document.getElementById("total-orders");

if(totalOrders){

totalOrders.textContent =
orders.length;

}


// Total Products
const totalProducts =
document.getElementById("total-products");

if(totalProducts){

totalProducts.textContent =
products.length;

}


// Total Sales
let sales = 0;

orders.forEach(order=>{

sales += Number(order.total) || 0;

});

const totalSales =
document.getElementById("total-sales");

if(totalSales){

totalSales.textContent =
"₵" + sales;

}


// Pending Orders
const pendingOrders =
orders.filter(order =>
order.status === "Pending"
).length;

const pendingElement =
document.getElementById("pending-orders");

if(pendingElement){

pendingElement.textContent =
pendingOrders;

}


// Delivered Orders
const deliveredOrders =
orders.filter(order =>
order.status === "Delivered"
).length;

const deliveredElement =
document.getElementById("delivered-orders");

if(deliveredElement){

deliveredElement.textContent =
deliveredOrders;

}


// Low Stock Products
const lowStock =
products.filter(product =>
product.stock <= 3
).length;

const lowStockElement =
document.getElementById("low-stock");

if(lowStockElement){

lowStockElement.textContent =
lowStock;

}
// Today's Sales

let todaySales = 0;

let today = new Date().toLocaleDateString();


orders.forEach(order=>{


let orderDate =
new Date(order.date).toLocaleDateString();


if(orderDate === today){

todaySales += Number(order.total) || 0;

}


});


const todaySalesElement =
document.getElementById("today-sales");


if(todaySalesElement){

todaySalesElement.textContent =
"₵" + todaySales;

}




// This Month Sales

let monthSales = 0;


let currentMonth =
new Date().getMonth();



orders.forEach(order=>{


let orderMonth =
new Date(order.date).getMonth();


if(orderMonth === currentMonth){

monthSales += Number(order.total) || 0;

}


});



const monthSalesElement =
document.getElementById("month-sales");


if(monthSalesElement){

monthSalesElement.textContent =
"₵" + monthSales;

}
// ===============================
// BEST SELLING PRODUCT
// ===============================


let productSales = {};



orders.forEach(order=>{


order.items.forEach(item=>{


if(productSales[item.name]){


productSales[item.name] += item.quantity;


}else{


productSales[item.name] = item.quantity;


}


});


});



let bestProduct = "None";

let highest = 0;


for(let product in productSales){


if(productSales[product] > highest){


highest = productSales[product];

bestProduct = product;


}

}



const bestProductElement =
document.getElementById("best-product");


if(bestProductElement){

bestProductElement.textContent =
bestProduct;

}
}

// ===============================
// RECENT ORDERS
// ===============================


function displayRecentOrders(){


const container =
document.getElementById("recent-orders-list");


if(!container) return;


let recent =
orders.slice(-5).reverse();



let html="";


if(recent.length===0){


container.innerHTML =
"<p>No recent orders.</p>";

return;


}



recent.forEach(order=>{


html += `

<div class="recent-order">


<h4>
${order.customerName}
</h4>


<p>
Total: ₵${order.total}
</p>


<p>
Status: ${order.status}
</p>


</div>


`;


});


container.innerHTML = html;


}



displayRecentOrders();


// START DASHBOARD

loadDashboard();
// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(){

const table =
document.getElementById("product-table");

if(!table) return;

let html = "";

products.forEach((product,index)=>{

html += `

<tr>

<td>

<img
src="${product.image || 'images/no-image.png'}"
width="60"
height="60"
style="object-fit:cover;border-radius:10px;">

</td>

<td>${product.name}</td>

<td>${product.category}</td>

<td>₵${product.price}</td>

<td>${product.stock}</td>

<td>

${
product.stock === 0

? "<span class='out-stock'>❌ Out of Stock</span>"

: product.stock <= 3

? "<span class='low-stock'>⚠️ Low Stock</span>"

: "<span class='available'>✅ Available</span>"

}

</td>

<td>

<button
class="edit-btn"
onclick="editProduct(${index})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="deleteProduct(${index})">

🗑️ Delete

</button>

</td>

</tr>

`;

});

table.innerHTML = html;

}

displayProducts();


// ===============================
// EDIT PRODUCT
// ===============================

function editProduct(index){

let product = products[index];

let name = prompt("Product Name", product.name);
if(name === null) return;

let category = prompt("Category", product.category);
if(category === null) return;

let price = prompt("Price", product.price);
if(price === null) return;

let stock = prompt("Stock", product.stock);
if(stock === null) return;

products[index] = {

...product,

name: name,

category: category,

price: Number(price),

stock: Number(stock)

};

localStorage.setItem(
"products",
JSON.stringify(products)
);

displayProducts();

loadDashboard();

alert("Product updated successfully!");

}


// ===============================
// DELETE PRODUCT
// ===============================

function deleteProduct(index){

if(!confirm("Delete this product?")) return;

products.splice(index,1);

localStorage.setItem(
"products",
JSON.stringify(products)
);

displayProducts();

loadDashboard();

alert("Product deleted successfully!");

}
// ===============================
// DISPLAY ORDERS
// ===============================

function displayOrders(){

const table =
document.getElementById("orders-table");

if(!table) return;

if(orders.length === 0){

table.innerHTML = `

<tr>

<td colspan="7">
No orders found.
</td>

</tr>

`;

return;

}

let html = "";

orders.forEach((order,index)=>{

let items = "";

order.items.forEach(item=>{

items += `${item.name} x ${item.quantity}<br>`;

});

html += `

<tr>

<td>${order.customerName}</td>

<td>${order.phone}</td>

<td>${items}</td>

<td>₵${order.total}</td>

<td>${order.date}</td>

<td>

<select
class="status-select"
onchange="updateOrderStatus(${index},this.value)">

<option value="Pending"
${order.status==="Pending"?"selected":""}>
Pending
</option>

<option value="Processing"
${order.status==="Processing"?"selected":""}>
Processing
</option>

<option value="Delivered"
${order.status==="Delivered"?"selected":""}>
Delivered
</option>

<option value="Cancelled"
${order.status==="Cancelled"?"selected":""}>
Cancelled
</option>

</select>

</td>

<td>

<button
class="edit-btn"
onclick="viewOrder(${index})">

👁️ View

</button>

<button
class="delete-btn"
onclick="deleteOrder(${index})">

🗑️ Delete

</button>

</td>

</tr>

`;

});

table.innerHTML = html;

}

displayOrders();


// ===============================
// UPDATE ORDER STATUS
// ===============================

function updateOrderStatus(index,status){

orders[index].status = status;

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

displayOrders();

alert("Order status updated.");

}


// ===============================
// DELETE ORDER
// ===============================

function deleteOrder(index){

if(!confirm("Delete this order?")) return;

orders.splice(index,1);

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

displayOrders();

loadDashboard();

alert("Order deleted successfully.");

}
// ===============================
// VIEW ORDER DETAILS
// ===============================

function viewOrder(index){

const order = orders[index];

let items = "";

order.items.forEach(item=>{

items += `

<tr>

<td>${item.name}</td>

<td>${item.quantity}</td>

<td>₵${item.price}</td>

<td>₵${item.price * item.quantity}</td>

</tr>

`;

});

document.getElementById("order-details").innerHTML = `

<h2>Order Details</h2>

<h3>Customer Information</h3>

<p><strong>Name:</strong> ${order.customerName}</p>

<p><strong>Phone:</strong> ${order.phone}</p>

<p><strong>Address:</strong> ${order.address}</p>

<hr>

<h3>Products Ordered</h3>

<table style="width:100%; border-collapse:collapse;">

<tr>

<th>Product</th>

<th>Qty</th>

<th>Price</th>

<th>Total</th>

</tr>

${items}

</table>

<hr>

<p><strong>Order Total:</strong> ₵${order.total}</p>

<p><strong>Status:</strong> ${order.status}</p>

<p><strong>Date:</strong> ${order.date}</p>


<br>


<button 
class="print-btn"
onclick="printReceipt(${index})">

🧾 Print Receipt

</button>

`;

document.getElementById("order-modal").style.display = "flex";

}


// ===============================
// CLOSE MODAL
// ===============================

function closeOrderModal(){

document.getElementById("order-modal").style.display = "none";

}
// ===============================
// PRINT RECEIPT
// ===============================

function printReceipt(index){


let order = orders[index];

let receiptNumber = 
"REC-" + Date.now();

let receiptWindow = window.open(
"",
"_blank",
"width=700,height=800"
);



let items = "";


order.items.forEach(item=>{


items += `

<tr>

<td>
${item.name}
</td>


<td>
${item.quantity}
</td>


<td>
₵${item.price}
</td>


<td>
₵${item.price * item.quantity}
</td>


</tr>

`;

});



receiptWindow.document.write(`

<html>

<head>

<title>
Kobby's Receipt
</title>


<style>

body{

font-family:Arial, Helvetica, sans-serif;

padding:40px;

color:#333;

}


.header{

text-align:center;

border-bottom:2px solid #e67e22;

padding-bottom:20px;

}



.header h1{

color:#e67e22;

margin-bottom:5px;

}



.customer{

margin-top:25px;

}


table{

width:100%;

border-collapse:collapse;

margin-top:25px;

}


/* PRINT SETTINGS */

@media print{


.print-button{

display:none;

}


body{

padding:20px;

}


}

</style>



th{

background:#e67e22;

color:white;

}



th,td{

border:1px solid #ddd;

padding:12px;

text-align:center;

}



.total{

font-size:22px;

font-weight:bold;

text-align:right;

margin-top:25px;

}



.footer{

text-align:center;

margin-top:40px;

font-style:italic;

}



button{

background:#27ae60;

color:white;

padding:12px 25px;

border:none;

border-radius:20px;

cursor:pointer;

}



</style>


</head>


<body>


<div class="header">


<h1>
Kobby's Phone Accessories & Repair
</h1>


<p>
Quality Accessories • Reliable Service
</p>


</div>




<div class="customer">


<h3>
Customer Details
</h3>


<p>
<strong>Name:</strong>
${order.customerName}
</p>


<p>
<strong>Phone:</strong>
${order.phone}
</p>


<p>
<strong>Address:</strong>
${order.address}
</p>


<p>
<strong>Date:</strong>
${order.date}
</p>

<p>
<strong>Receipt No:</strong>
${receiptNumber}
</p>

</div>



<h3>
Order Items
</h3>


<table>


<tr>

<th>
Product
</th>

<th>
Quantity
</th>

<th>
Price
</th>

<th>
Total
</th>

</tr>


${items}


</table>



<p class="total">

Total Paid:
₵${order.total}

</p>


<p>

<strong>Status:</strong>
${order.status}

</p>



<div class="footer">

<p>
Thank you for shopping with us.
</p>


<button 
class="print-button"
onclick="window.print()">

🖨️ Print Receipt

</button>


</div>



</body>


</html>


`);


}
// ===============================
// PRODUCT SEARCH
// ===============================

const productSearch =
document.getElementById("product-search");

if(productSearch){

productSearch.addEventListener("input",function(){

const text = this.value.toLowerCase();

const filteredProducts = products.filter(product=>{

return product.name.toLowerCase().includes(text) ||

product.category.toLowerCase().includes(text);

});

displayFilteredProducts(filteredProducts);

});

}


function displayFilteredProducts(filteredProducts){

const table =
document.getElementById("product-table");

let html = "";

filteredProducts.forEach((product,index)=>{

html += `

<tr>

<td>

<img
src="${product.image || "images/no-image.png"}"
width="60"
height="60"
style="object-fit:cover;border-radius:10px;">

</td>

<td>${product.name}</td>

<td>${product.category}</td>

<td>₵${product.price}</td>

<td>${product.stock}</td>

<td>

${
product.stock===0
? "<span class='out-stock'>❌ Out of Stock</span>"
: product.stock<=3
? "<span class='low-stock'>⚠️ Low Stock</span>"
: "<span class='available'>✅ Available</span>"
}

</td>

<td>

<button
class="edit-btn"
onclick="editProduct(${products.indexOf(product)})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="deleteProduct(${products.indexOf(product)})">

🗑️ Delete

</button>

</td>

</tr>

`;

});

table.innerHTML = html;

}
// ===============================
// ORDER SEARCH & FILTER
// ===============================

const orderSearch =
document.getElementById("order-search");

const orderFilter =
document.getElementById("order-status-filter");


function filterOrders(){

let searchText = "";

let status = "All";

if(orderSearch){

searchText = orderSearch.value.toLowerCase();

}

if(orderFilter){

status = orderFilter.value;

}

const filteredOrders = orders.filter(order=>{

const matchesSearch =

order.customerName.toLowerCase().includes(searchText) ||

order.phone.toLowerCase().includes(searchText);

const matchesStatus =

status==="All" ||

order.status===status;

return matchesSearch && matchesStatus;

});

displayFilteredOrders(filteredOrders);

}


if(orderSearch){

orderSearch.addEventListener("input",filterOrders);

}


if(orderFilter){

orderFilter.addEventListener("change",filterOrders);

}
function displayFilteredOrders(filteredOrders){

const table =
document.getElementById("orders-table");

if(filteredOrders.length===0){

table.innerHTML=`

<tr>

<td colspan="7">

No matching orders found.

</td>

</tr>

`;

return;

}

let html="";

filteredOrders.forEach((order,index)=>{

let items="";

order.items.forEach(item=>{

items+=`${item.name} x ${item.quantity}<br>`;

});

html+=`

<tr>

<td>${order.customerName}</td>

<td>${order.phone}</td>

<td>${items}</td>

<td>₵${order.total}</td>

<td>${order.date}</td>

<td>${order.status}</td>

<td>

<button
class="edit-btn"
onclick="viewOrder(${orders.indexOf(order)})">

👁️ View

</button>

<button
class="delete-btn"
onclick="deleteOrder(${orders.indexOf(order)})">

🗑️ Delete

</button>

</td>

</tr>

`;

});

table.innerHTML=html;

}