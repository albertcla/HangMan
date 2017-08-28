$(document).ready(function () {
    /*Create and Show Elements*/
    /*Random Content*/
    science = ["Leonardo da Vinci", "Max Planck", "Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking", "Michio Kaku", "Neil deGrasse Tyson", "Carl Sagan", "Isaac Asimov"];
    var person = (function randomWord() {
        return science[Math.floor((Math.random() * 10))];
    })();

    var $default = {
        t0: 6,
        lives0: 10,
    };

    var $game = {
        randomWord: person,
        gameTime: $default.t0,
        countDown: function () {
            var $timerId = setInterval(function () {
                if ($game.gameTime !== 1) {
                    $game.gameTime--;
                    $game.showTime();
                    $game.storage.saveData();
                    $player.storage.saveData();
                } else {
                    clearTimeout($timerId);
                    $game.showTime();
                    $game.gameOver();
                }
            }, 1000);
        },
        showTime: function () {
            $('#countDown').html($game.gameTime + " s.");
        },
        check: function () {
            for (var i = 0; i < $game.randomWord.length; i++) {
                if ($game.randomWord[i] == $(this).attr('id') || $game.randomWord[i] == $(this).attr('id').toLowerCase()) {
                    $('span').eq(i).html($game.randomWord[i]);
                    $game.cLett++;
                    $game.setPercent();
                    $game.showPercent();
                }
            }
            if ($game.percent == 100) {
                $game.win = true;
                $game.gameWin();
            }
            if ($game.randomWord.indexOf($(this).attr('id')) !== -1 || $game.randomWord.indexOf($(this).attr('id').toLowerCase()) !== -1) {
                $(this).addClass('pass');
            } else {
                $(this).addClass('fail');
                $game.setLives();
            }
            $(this).prop('disabled', true);
        },
        checkInput: function(inputWord) {
            if (inputWord == $game.randomWord) {
                $game.win = true;
                $game.gameWin();
            } else if (inputWord !== "") {
                $game.setLives();
                $game.setLives();
            }
        },
        live: $default.lives0,
        setLives: function () {
            this.live--;
            this.showLives();
            if (this.live == 0) {
                $game.gameOver();
            };
        },
        showLives: function () {
            $('#lives').html(this.live);
        },
        cLett: 0,
        percent: 0,
        setPercent: function() {
            $game.percent = Math.round($game.cLett / ($game.randomWord.replace(" ", "").length) * 100);
        },
        showPercent: function () {
            $('#percent').html($game.percent + '%');
        },
        storage: {
            saveData: function () {
                localStorage.setItem("game", JSON.stringify($game));
            },
            getData: function () {
                var dJSON = localStorage.getItem("game");
                if (dJSON !== null) {
                    var gameJSON = JSON.parse(dJSON);
                    $game.randomWord = gameJSON.randomWord;
                    $game.gameTime = gameJSON.gameTime;
                    $game.live = gameJSON.live;
                    $game.win = gameJSON.win;
                    $game.cLett = gameJSON.cLett;
                    $game.percent = gameJSON.percent;
                } else {
                    $game.randomWord = person;
                    $game.gameTime = $default.t0;
                    $game.live = $default.lives0;
                    $game.win = false;
                    $game.cLett = 0;
                    $game.percent = 0;
                }
            }
        },
        win: false,
        gameWin: function () {
            $('#info').html("You WIN");
            $('.alphabet button').prop('disabled', true);
            $player.won++;
            $game.tryAgain();
        },
        gameOver: function () {
            $('#info').html("Game Over");
            $('.alphabet button').prop('disabled', true);
            $player.lose++;
            $('#hiddenWords').off('mouseenter');
            $('.alphabet').off('mouseenter');
            $('#words button').remove();
            $('#inputWord').remove();
            $game.tryAgain();
        },
        tryAgain: function () {
            $('body').append('<button id="restart" class="btn-big">Restart</button>');
            if ($game.win) {
                $('#restart').addClass('pass');
            } else {
                $('#restart').addClass('fail');
            }
            $('#restart').on('click', $game.reStart);
        },
        reStart: function () {
            $player.storage.saveData();
            localStorage.removeItem("game");
            location.reload();
        }
    };
    $game.storage.getData();

    /*Buttons Creation*/
    for (var i = 0; i < 26; i++) {
        $('.alphabet').eq(0).append($('<button></button>'));
        $('button').eq(i).html(String.fromCharCode(65 + i));
        $('button').eq(i).attr('id', String.fromCharCode(65 + i));
        $('button').eq(i).addClass("btn-tiny");
        $('button').eq(i).on('click', $game.check);
    }

    /*Hidden Chars Creation*/
    var lett = " _ ";
    var spac = " - ";
    for (var i in $game.randomWord) {
        $('#hiddenWords').append($('<span></span>'))
        if ($game.randomWord[i] !== " ") {
            $('span').eq(i).html(lett);
        } else {
            $('span').eq(i).html(spac);
        }
    }
    
    /*Hidden Buttons*/
    function resolveIt() {
        $('#hiddenWords').off('mouseenter');
        $('#words div:last-child').append('<button class="btn-big  pass">Resolve it!</button>');
        $('#words button').on('click', function () {
            $('#words button').remove();
            $('#words div:last-child').append('<input type="text" id="inputWord">');
            $('#inputWord').keydown(function (e) {
                if (e.which == 13) {
                    $('#hiddenWords').on('mouseenter', resolveIt);
                    $game.checkInput($('#inputWord').val());
                    $('#words button').remove();
                    $('#inputWord').remove();
                }
            });
            $('#words div:last-child').append('<button class="btn-big pass">Send!</button>');
            $('#words button').on('click', function () {
                $('#hiddenWords').on('mouseenter', resolveIt);
                $game.checkInput($('#inputWord').val());
                $('#words button').remove();
                $('#inputWord').remove();
            });
        });
    };
    $('#hiddenWords').on('mouseenter', resolveIt());
    $('.alphabet').on('mouseenter', function() {        
        $('#words button').remove();
        $('#inputWord').remove();
        $('#hiddenWords').on('mouseenter', resolveIt);
    });
    
    /*Player*/
    var $player = {
        name: "Player",
        newPlayer: function(newName) {
            $player.name = newName;
            $player.reStart();
        },
        won: 0,
        lose: 0,
        storage: {
            saveData: function () {
                localStorage.setItem("player", JSON.stringify($player));
            },
            getData: function () {
                var dJSON = localStorage.getItem("player");
                if (dJSON !== null) {
                    var playerJSON = JSON.parse(dJSON);
                    $player.name = playerJSON.name;
                    $player.won = playerJSON.won;
                    $player.lose = playerJSON.lose;
                } else {
                    $player.name = "Player";
                    $player.won = 0;
                    $player.lose = 0;
                }
            }
        },
        reStart: function () {
            $player.won = 0;
            $player.lose = 0;
            $game.reStart();
        }
    };
    $player.storage.getData();
    
    /*NavBar*/
    $('nav ul li:first-child').html("Jugador: " + $player.name);
    $('nav ul li').eq(1).html("Partidas Ganadas: " + $player.won);
    $('nav ul li').eq(2).html("Partidas Perdidas: " + $player.lose);
    
    /*LogIn Form*/
    $('h2').after('<div class="popUp"></div>');
    $('.popUp').eq(0).append('<div class="popUp-content"></div>');
    $('.popUp-content').eq(0).append('<div class="popUp-container"></div>');
    $('.popUp-container').eq(0).append('<span class="close">&times;</span>');
    $('.popUp-container').eq(0).append('<label for="namePlayer">Name:</label>');
    $('.popUp-container').eq(0).append('<input type="text" id="namePlayer">');
    $('.popUp-container').eq(0).append('<button class="inputSend"><i class="fa fa-share-square-o" aria-hidden="true"></i></button>');
    $('.inputSend').eq(0).click(function() {
        $player.newPlayer($('#namePlayer').val());
        $('.popUp').eq(0).attr('style','display:none');
    });
    $('.inputSend').eq(0).keypress(function(key) {
        if (key.which == 13) {
            $player.newPlayer($('#namePlayer').val());
            $('.popUp').eq(0).attr('style','display:none');
        }
    });
    $('nav ul li:first-child').click(function() {
        $('.popUp').eq(0).attr('style', 'display:block');
    });
    $('span.close').click(function() {
        $('.popUp').eq(0).attr('style','display:none');
    });
    $('window').click(function(event) {
        if (event.target == $('.popUp').eq(0)) {
            $('.popUp').eq(0).attr('style','display:none');
        }
    });

    /*Game*/
    $game.showLives();
    $game.showPercent();
    $game.countDown();
    $game.showTime();
});