document.addEventListener("DOMContentLoaded", function() {
    const bouton = document.getElementById("btn");
    
    if (bouton) {
        bouton.addEventListener("click", function() {
            let pseudo = document.getElementById('inputa').value;
            if (pseudo.trim() !== '') {
                window.location.href = "jeu.html?pseudo=" + encodeURIComponent(pseudo);
            } else {
                alert("Entre ton pseudo !");
            }
        });
    }
});
