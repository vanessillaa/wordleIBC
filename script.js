var nom, cognom, email, telefon;

// Finestres formulari
document.getElementById("submit").addEventListener("click", function(){
    // Comprovar nom
    if (document.getElementById("nom").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del nom en blanc",
            icon: "warning"
        });
    // Comprovar cognom
    } else if (document.getElementById("cognom").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del cognom en blanc",
            icon: "warning"
        });
    // Comprovar correu
    } else if (document.getElementById("email").value == ""){ 
        Swal.fire({
            text: "Si us plau, no deixis el camp del correu en blanc",
            icon: "warning"
        });
    // Comprovar contingut correu
    } else if (!/^\S+@\S+\.\S+$/.test(document.getElementById("email").value)){ 
        Swal.fire({
            text: "La direcció de correu és incorrecte",
            icon: "warning"
        });
    // Comprovar telefon
    } else if (document.getElementById("telefon").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del telèfon en blanc",
            icon: "warning"
        });
    // Comprovar contingut telefon
    } else if (document.getElementById("telefon").value.length != 9 || document.getElementById("telefon").value.isNaN){
        Swal.fire({
            text: "El format del telèfon no és correcte",
            icon: "warning"
        });
    // Si els camps són correctes
    } else {
        document.getElementById("form").style.display = "none";
    }
})

document.getElementById("informacio").addEventListener("click", function(){
    Swal.fire({
        title: "Com jugar al WordleIBC?",
        html: 
            "Endevina el <b>WORDLE</b> en 6 intents. <br><br> Has d'introduir paraules de 5 lletres <ins>que existeixin</ins> i fer clic a ENTER (⏎). <br><br> Després de cada intent, el color de les lletres canviarà per indicar l'evolució de la partida. <br><br> No es tenen en compte els accents a l'hora d'introduir paraules. <br><br> Es poden repetir lletres. <br><br> Exemples: <br><br> <img src='exemple.png' alt='Exemple wordle' style='width:300px;'>  ",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      })
})
