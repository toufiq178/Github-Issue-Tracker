

document.getElementById("sign-in-btn").addEventListener("click" , function () {
    

    const usernameInput = document.getElementById("username-input");
    const usernameValue = usernameInput.value 

    const passwordInput = document.getElementById("password-input");
    const passwordValue = passwordInput.value 

    
    if (usernameValue === "admin" && passwordValue === "admin123") {
        
        
        window.location.assign('./home.html');

    } else{


        alert("Invalid")
    }
    
})