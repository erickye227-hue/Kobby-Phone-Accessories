// ===============================
// LOAD CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

// ===============================
// ELEMENTS
// ===============================

const checkoutTotal = document.getElementById("checkout-total");

const orderSummary = document.getElementById("order-summary");

const checkoutForm = document.getElementById("checkout-form");



// ===============================
// DISPLAY ORDER SUMMARY
// ===============================

let total = 0;


if(orderSummary){


    if(cart.length === 0){


        orderSummary.innerHTML = `
            <p>Your cart is empty.</p>
        `;


    }else{


        let summaryHTML = "";


        cart.forEach(item => {


            let itemTotal = item.price * item.quantity;


            total += itemTotal;


            summaryHTML += `

            <div class="summary-item">

                <p>
                ${item.name} 
                x ${item.quantity}
                </p>

                <strong>
                ₵${itemTotal}
                </strong>

            </div>

            `;


        });



        orderSummary.innerHTML = summaryHTML;


    }

}



// ===============================
// DISPLAY TOTAL
// ===============================

if(checkoutTotal){

    checkoutTotal.textContent =
    "Total: ₵" + total;

}




// ===============================
// PLACE ORDER
// ===============================

if(checkoutForm){


checkoutForm.addEventListener("submit", function(e){


    e.preventDefault();



    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }



    let name =
    document.getElementById("customer-name").value;



    let phone =
    document.getElementById("customer-phone").value;



    let address =
    document.getElementById("customer-address").value;




    let message = 
`Hello Kobby, I want to place an order.

Customer Name:
${name}

Phone:
${phone}

Address:
${address}


Order Details:
`;



cart.forEach(item=>{


message +=
`
${item.name} x ${item.quantity}
`;


});

// ===============================
// UPDATE PRODUCT STOCK
// ===============================


let products =
JSON.parse(localStorage.getItem("products")) || [];



cart.forEach(item=>{


let product =
products.find(
p => p.name === item.name
);



if(product){


product.stock =
product.stock - item.quantity;


}


});



localStorage.setItem(
"products",
JSON.stringify(products)
);


message +=
`

Total:
₵${total}
`;



let whatsappURL =
"https://wa.me/233546337995?text="
+
encodeURIComponent(message);

// ===============================
// SAVE ORDER
// ===============================


let orders = JSON.parse(
    localStorage.getItem("orders")
) || [];



let newOrder = {

    customerName: name,

    phone: phone,

    address: address,

    items: cart,

    total: total,

    status: "Pending",

    date: new Date().toLocaleString()

};



orders.push(newOrder);



localStorage.setItem(
    "orders",
    JSON.stringify(orders)
);

// Open WhatsApp message
window.open(
    whatsappURL,
    "_blank"
);


// Clear cart after order
localStorage.removeItem("cart");


// Go to success page
window.location.href = "success.html";

});

}