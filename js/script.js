$(document).ready(function(){

    /*Random Content*/
    science = ["Leonardo da Vinci", "Max Planck", "Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking", "Michio Kaku", "Neil deGrasse Tyson", "Carl Sagan", "Isaac Asimov"];
    var person = (function randomWord() {
        return science[Math.floor((Math.random() * 10))];
    })();

    /*Buttons Creation*/
    for (var i = 0; i < 26; i++) {
        $('.alphabet').eq(0).append($('<button></button>'));
        $('button').eq(i).html(String.fromCharCode(65 + i));
        $('button').eq(i).attr('id',String.fromCharCode(65 + i));
        $('button').eq(i).on('click', check);
    }
    
    /*Hidden Chars Creation*/
    var lett = " _ ";
    var spac = " - ";
    for (var i in person) {
        $('#words').append($('<span></span>'))
        if (person[i] !== " ") {
            $('span').eq(i).html(lett);
        } else {
            $('span').eq(i).html(spac);
        }
    }

    /*Lives*/
    var live = 10;
    $('#lives').html(live);
    function livesDown() {
        --live;
        $('#lives').html(live);
        if (live == 0) {
            $('#state').html("Game Over");
            $('.alphabet button').prop('disabled', true);
            restart();
        }
    };  
    
    /*Try Again*/
    function restart () {
        $('body').append('<button id="restart">Restart</button>');
        $('#restart').on('click', function() {
            location.reload();
        });
    };
    
    /*Check*/
    function check() {
        for (var i = 0; i < person.length; i++) {
            if (person[i] == this.id || person[i] == this.id.toLowerCase()) {
                /*document.getElementsByTagName('span')[i].innerHTML = person[i];*/
                $('span').eq(i).html(person[i]);
            }
        }
        if (person.indexOf(this.id) !== -1 || person.indexOf(this.id.toLowerCase()) !== -1) {
            /*this.className = "pass";*/
            $(this).addClass('pass');
        } else {
            /*this.className = "fail";*/
            $(this).addClass('fail');
            livesDown();
        }
        /*this.disabled = true;*/
        $(this).prop('disabled', true);
    };
});