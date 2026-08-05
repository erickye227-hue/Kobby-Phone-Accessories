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
console.log("Username:", username);
console.log("Password typed:", password);
console.log("Saved password:", localStorage.getItem("adminPassword"));



// ADMIN ACCOUNT

let adminAccount = {

username: "Eric",

password:
localStorage.getItem("adminPassword") || "EricStore@2026"

};

if(
username === adminAccount.username &&
password === adminAccount.password
){


localStorage.setItem(
"adminLogin",
"true"
);



localStorage.setItem(
"adminName",
username
);

window.location.href =
"admin.html";



}else{


document.getElementById("login-message").textContent =
"Wrong username or password";


}



});