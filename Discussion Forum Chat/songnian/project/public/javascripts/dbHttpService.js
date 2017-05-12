(function () {

    var dbListService = function ($http) {
        var getList = function () {
            return $http.get('/chat/get-data')
                .then(function (response) {
                    return response.data; // this data is also a array
                }, function (err) {
                    console.log("Database encounters err " + err);
                })
        };
        return {
            getList: getList
        }
    };
    angular
        .module('chatApp')
        .factory('dbListService', dbListService);
}());