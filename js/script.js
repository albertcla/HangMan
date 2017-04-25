document.addEventListener("DOMContentLoaded", function () {

    /*Generacion de contenido aleatorio*/
    science = ["Leonardo da Vinci", "Max Planck", "Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking", "Michio Kaku", "Neil deGrasse Tyson", "Carl Sagan", "Isaac Asimov"];
    var person = (function randomWord() {
        return science[Math.floor((Math.random() * 10))];
    })();

    /*Creacion de botones*/
    for (var i = 0; i < 26; i++) {
        document.getElementsByClassName("alphabet")[0].appendChild(document.createElement("a"));
        document.getElementsByTagName("a")[i].innerHTML = String.fromCharCode(65 + i);
        document.getElementsByTagName("a")[i].id = String.fromCharCode(65 + i);
        document.getElementsByTagName("a")[i].addEventListener("click", check);
    }
    
    /*Creacion de caracteres ocultos*/
    var lett = " _ ";
    var spac = " - ";
    for (var i in person) {
        document.getElementById("words").appendChild(document.createElement("span"));
        if (person[i] !== " ") {
            document.getElementsByTagName("span")[i].innerHTML = lett;
        } else {
            document.getElementsByTagName("span")[i].innerHTML = spac;
        }
    }

    /*Vidas*/
    var live = 10;
    function livesDown() {
        live--;
    };
    document.getElementById("lives").innerHTML = live;
    
    /*Check*/
    function check() {
        if (this.id == "A") {
            alert("OK");
        } else {
            alert("MAL");
        }
    };
});