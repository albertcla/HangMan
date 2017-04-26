document.addEventListener("DOMContentLoaded", function () {

    /*Generacion de contenido aleatorio*/
    science = ["Leonardo da Vinci", "Max Planck", "Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking", "Michio Kaku", "Neil deGrasse Tyson", "Carl Sagan", "Isaac Asimov"];
    var person = (function randomWord() {
        return science[Math.floor((Math.random() * 10))];
    })();

    /*Creacion de botones*/
    for (var i = 0; i < 26; i++) {
        document.getElementsByClassName("alphabet")[0].appendChild(document.createElement("button"));
        document.getElementsByTagName("button")[i].innerHTML = String.fromCharCode(65 + i);
        document.getElementsByTagName("button")[i].id = String.fromCharCode(65 + i);
        document.getElementsByTagName("button")[i].addEventListener("click", check);
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
    document.getElementById("lives").innerHTML = live;
    function livesDown() {
        --live;
        document.getElementById("lives").innerHTML = live;
        if (live == 0) {
            document.getElementById("state").innerHTML = "Game Over";
            restart();
        }
    };  
    
    /*Try Again*/
    function restart () {
        var x = document.createElement("button");
        var t = document.createTextNode("Restart");
        x.appendChild(t);
        x.id = "restart";
        document.body.appendChild(x);
        document.getElementById("restart").addEventListener("click", function() {
            location.reload();
        })
    };
    
    /*Check*/
    function check() {
        for (var i = 0; i < person.length; i++) {
            if (person[i] == this.id || person[i] == this.id.toLowerCase()) {
                document.getElementsByTagName('span')[i].innerHTML = person[i];
            }
        }
        if (person.indexOf(this.id) !== -1 || person.indexOf(this.id.toLowerCase()) !== -1) {
            this.className = "pass";
        } else {
            this.className = "fail";
            livesDown();
        }
        this.disabled = true;
    };
});