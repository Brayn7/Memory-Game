cardsModule.controller('cardsController', ['$scope', 'cardService', '$timeout', function($scope, cardService, $timeout) {
    let ctrl = this;
    ctrl.cards = {};
    $scope.getCards = function (data){
      let dataCp = data.cards;
        if (dataCp) {
            for (prop in dataCp) {
                dataCp[prop].flipped = false;
                dataCp[prop].id = prop;
                if (dataCp[prop].suit === "SPADES" || dataCp[prop].suit === "CLUBS") {
                    dataCp[prop].color = "black";
                } else {
                    dataCp[prop].color = "red";
                }
            }
        }
        console.log(data);
        ctrl.cards.data = dataCp;
    };

    cardService.success($scope.getCards);

    ctrl.cards.clickable = true;

    ctrl.cards.gameOver = false;

    ctrl.cards.up = [];

    ctrl.cards.turn = true;

    ctrl.cards.player1 = [];

    ctrl.cards.player2 = [];

    ctrl.cards.winner = "";

    ctrl.cards.shuffle = function (){
      if (ctrl.cards.gameOver){
         ctrl.cards.data.map(a => a.flipped = false);
         ctrl.cards.data = ctrl.cards.data.shuffle();
         ctrl.cards.resetUp();
         ctrl.cards.player1 = [];
         ctrl.cards.player2 = [];
         ctrl.cards.gameOver = false;
      }
    };

    ctrl.cards.changeTurn = function(){
      ctrl.cards.turn = !ctrl.cards.turn;
    };

    ctrl.cards.reveal = function(e) {
        if (ctrl.cards.clickable === true && !e.flipped) {
            e.flipped = true;
            ctrl.cards.getPair(ctrl.cards.up, e);
        }
    };

    ctrl.cards.getPair = function(up, card) {
        up.push({
            id: card.id,
            color: card.color,
            value: card.value
        });

        if (up.length === 2) {
            ctrl.cards.clickable = false;
            ctrl.cards.check(up);
        }
    };

    ctrl.cards.check = function(up) {
        if (up[0].color === up[1].color && up[0].value === up[1].value) {
            ctrl.cards.pushScore(ctrl.cards.turn, up);
            ctrl.cards.isTerminal();
            ctrl.cards.resetUp();
            ctrl.cards.clickable = true;
        } else {
            $timeout($scope.delay, 1000, true, up);   
        }
        ctrl.cards.changeTurn();
    };

    $scope.delay = function(up) {
        ctrl.cards.data[up[0].id].flipped = false;
        ctrl.cards.data[up[1].id].flipped = false;
        ctrl.cards.resetUp();
        ctrl.cards.clickable = true;
    };

   ctrl.cards.resetUp = function (){
      ctrl.cards.up = [];
    }

    ctrl.cards.pushScore = function (turn, up){
      if (turn === true){
         ctrl.cards.player1.push(up);
      } else {
         ctrl.cards.player2.push(up);
      }
    };

    ctrl.cards.isTerminal = function(){
      if (ctrl.cards.player1.length + ctrl.cards.player2.length === 24){
         ctrl.cards.gameOver = true;
         ctrl.cards.determineWinner();
      }
    };

    ctrl.cards.determineWinner = function(){
      if (ctrl.cards.player1.length > ctrl.cards.player2.length){
         ctrl.cards.winner = "Player 1 Wins";
      } else if (ctrl.cards.player1.length < ctrl.cards.player2.length) {
         ctrl.cards.winner = "Player 2 Wins";
      } else {
         ctrl.cards.winner = "Draw";
      }
    };

}]);


Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}