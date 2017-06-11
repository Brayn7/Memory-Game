cardsModule.service('cardService', ["$http", function ($http) {
   return $http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
}]);

