// ===============================
// ADMIN LOGIN
// ===============================


const loginForm =
document.getElementById("login-form");



loginForm.addEventListener("submit",function(e){


e.preventDefault();



let username =
document.getElementById("admin-username").value;



let password =
document.getElementById("admin-password").value;



// CHANGE THESE DETAILS

let adminUsername = "admin";

let adminPassword = "12345";




if(username === adminUsername && password === adminPassword){



localStorage.setItem(
"adminLogin",
"true"
);



window.location.href =
"admin.html";



}else{


document.getElementById("login-message").textContent =
"Wrong username or password";


}



});