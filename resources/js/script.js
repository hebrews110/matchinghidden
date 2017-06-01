/*hidden picture reveal*/
//Definitions: Variables are here to solve scope issues
//If they only exist in one function, they can't be used in another
//Why is there a need for MatchGame?
//Count counts down to the end of the game
//Two is for tracking how many cards are flipped at once
//$game is the card layout/game div
//Cards is the ordered array of strings. The second number in the array shows the matches

  var MatchGame = {};
  var count;
  var two = 0;
  var $game = $('#game');
  var cards = [['0+1', 1], ['1+0', 1], ['1+1', 2], ['2+0', 2], ['2+1', 3], ['0+3', 3], ['1+3', 4], ['4+0', 4], ['1+4',5], ['5+0',5], ['1+5', 6], ['0+6', 6], ['6+1', 7], ['0+7', 7], ['7+1', 8], ['0+8', 8]];
  var picture = ['swingride.jpg', 'sandcastle.jpg', 'socks.jpg', 'bubble.jpg'];
  var p = 0;
  var string = picture[p];

$(document).ready(function() {

//Shuffle the array
//Takes the array and has them shuffled.
//Input keeps you from having to make a new array.
//Runs the loop 8 times (one time for each item in array) and counts down to zero
//Math line gives a random number between 0 and array.length (8)
//Originally created a new array and used push to add the value of that index in the first array to the second "shuffled" array
//And then originally cut one array item off at place N in the array. This way it won't repeat that value.

cards.shuffle = function() {
    var input = this;

    for (var i = cards.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = cards[randomIndex][0];
		    var itemAtSecond = cards[randomIndex][1];

        input[randomIndex][0] = input[i][0];
		    input[randomIndex][1] = input[i][1];
        input[i][0] = itemAtIndex;
		    input[i][1] = itemAtSecond;
    }
    return input;
}
//end of shuffle function

cards.shuffle();
//calls the function


//When they click on Play it shuffles the cards and puts the values in
  $("#start").click(function() {
      $('.directions').css('display', 'none');
         document.getElementById('game').style.backgroundImage = "url('" + string + "')";
      MatchGame.makeCards(cards, $game);
        count = cards.length;
   })
   //end of click function
    });
//end of document ready


//Method makeCards take the shuffled array, cards and the game board div
//empty clears out dummy cards in html
//data line creates an empty array called flippedCards and associated it with the game board data
//Took out different colors of flipped cards from original game so they couldn't tell the matches because of matching colors

//for loop assigns the data for each card in the div
//value is the number stored in the array at that index
//color is the color in the array for the value of the number so that the number 1s match color for instance
//flipped stores true or false for if the card is flipped over or not

MatchGame.makeCards = function(cards, $game) {
  $game.empty();
  $game.data('flippedCards', []);

for (var i=0; i<cards.length; i++) {
   $card_html = $('<div class="card"></div>');
    var data = {
    value: cards[i][0],
    answer: cards[i][1],
    flipped: false
  };
  //ends data

//data function (. means function) associates the data with the card
//adds the card onto the game baard, happens for each card

  $card_html.data(data);
  $game.append($card_html);
  };
  //ends for loop

//This function runs when a card is clicked.
//If you click a card, it checks for two cards flipped and does nothing if there are two
//If there aren't two cards flip, it will flip a card.

$(".card").click(function() {
  if (two === 2) {
 return;
 } else {
 MatchGame.flipCard($(this), $('#game'));
 }
  });
};
//end of makeCards function


//Start of flipCard function to turn cards over
//if the card is flipped, do nothing
//runs change the color of the card and writes the value and calls the card flipped
//In makecards flipCards is defined, but it can't be used in flipCards because it's out of its scope so it's redefined here
//adds the card to the flipped cards array

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')) {
    return;
  }
  $card.css('background-color', '#bed998')
      .data('flipped', true);
  $card.html('<span>' + $card.data('value') + "</span>");
var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  //if checks if there are two cards flipped over
  //if so, two equals 2
  //if checks if the two cards have equal values
  //If they are equal, count of how many cards are left goes down by 2
  //variable gives place for CSS changes for correctly matched cards
  //css function applies it to the two flipped matched cards

if (flippedCards.length === 2) {
    two = 2;
    if (flippedCards[0].data('answer') === flippedCards[1].data('answer')) {
      count = count - 2;
    /*  var matchCss = {
        display: 'none',
        background: 'none',
        border: 'none'
      };*/
      window.setTimeout(function(){
      flippedCards[0].css('background-color', 'transparent');
      flippedCards[1].css('background-color', 'transparent');
      two = 0;
    }, 1000);
    //if checks if those were the last two cards checked over
    //if no more cards unflipped, plays cheering, flashes background colors, asks if you want to play again
      if (count === 0) {
        var audio = new Audio('chime.mp3');
        audio.play();

      //var x = document.getElementById("myAudio").autoplay;
      $('.card').css('border','0 solid transparent');
      $('span').css('color', 'transparent');
      window.setTimeout(function(){
        $('#endScreen').css('display', 'block');
      }, 5000);
  } //end of if count = 0
} // closes if the values match

 //begins section on if the two cards aren't a match
    //creates variables for the two cards
    //Delays the flip back over so you can study the cards
    //applies css changes if not a match to make them look unflipped, sets to false for unflipped
    //two count is set back to zero
    else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
       two = 0;
      }, 1000);
      //This number is how long it's flipped over. Ends timer.
    }
    //This ends else turning cards back over to unflipped
    $game.data('flippedCards', []);
  } //Sets the array of two flipped cards back to empty to start looking for the next pair
};
//end flip card function

//Click on Play Again and the endScreen goes away and reshuffles the cards
$("#again").click(function() {
    $('#endScreen').css('display', 'none');
    p = p+1;
    if (p===4) {
      p=0;
    };
    string = picture[p];
    cards.shuffle();
   document.getElementById('game').style.backgroundImage = "url('" + string + "')";
    MatchGame.makeCards(cards, $game);
      count = cards.length;
 })
