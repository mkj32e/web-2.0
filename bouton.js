
document.addEventListener("DOMContentLoaded", function() {
    const bouton = document.getElementById("btn");

    
    if (bouton) {
        bouton.addEventListener("click", function() {
            window.location.href = "js.js";
        });
    }
});
