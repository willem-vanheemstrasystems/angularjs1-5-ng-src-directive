var myApp = angular
    .module("myModule", [])
    .controller("myController", function($scope) {
        var country = {
            name: "USA",
            capital: "Washington, D.C.",
            flag: "img/usa-flag.png"
        };
        // Attach the model (a complex object) to the scope
        $scope.country = country;
    });
