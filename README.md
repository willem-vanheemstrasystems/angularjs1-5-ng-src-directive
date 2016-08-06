# angularjs1-5-ng-src-directive
AngularJS 1.5 ngSrc Directive

Based on 'ng-src directive' at https://www.youtube.com/watch?v=YY_-BB_lZDI&index=4&list=PL6n9fhu94yhWKHkcL7RJmmXyxkuFB3KSl

#Use of ng-src directive

See official documentation of 'API Reference / ng / directive components in ng / ngSrc' at https://docs.angularjs.org/api/ng/directive/ngSrc

#Using a binding expression with the image src attribute, results in a 404 error.

For example, the script;

```javascript
var myApp = angular
    .module("myModule", [])
    .controller("myController", function($scope) {
        var country = {
            name: "USA",
            capital: "Washington, D.C.",
            flag: "/img/usa-flag.png"
        };
        // Attach the model (a complex object) to the scope
        $scope.country = country;
    });
```

And the HTML;

```javascript
<!DOCTYPE html>
<html lang="en" data-ng-app="myModule">
<head>
    <meta charset="UTF-8">
    <title>My Angular App</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <div data-ng-controller="myController">
        <div>
            Name: {{ country.name }}
        </div>
        <div>
            Capital: {{ country.capital }}
        </div>
        <div>
            <img src="img/usa-flag.png" style="height:82px; width:152px;">
        </div>
    </div>
</body>
</html>
```

Works fine!

Modifying the HTML to the following:

```javascript
<!DOCTYPE html>
<html lang="en" data-ng-app="myModule">
<head>
    <meta charset="UTF-8">
    <title>My Angular App</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <div data-ng-controller="myController">
        <div>
            Name: {{ country.name }}
        </div>
        <div>
            Capital: {{ country.capital }}
        </div>
        <div>
            <img src="{{ country.flag }}"
                alt="{{ country.name + 'Flag' }}"
                style="height:82px; width:152px;">
        </div>
    </div>
</body>
</html>
```

This will return the following error, even though the flag shows:

***Failed to load resource: the server responded with a status of 404 (Not Found)***

This is because, as stated above, it uses a binding expression with the image src attribute.

It uses the ```{{ country.flag }}``` as the path to load the image from, which is not a valid path. 
The reason we do see the image is because a second request, at which time the expression is evaluated, is made to load the image, which succeeds.

YOU CAN USE THE SOFTWARE PROGRAM 'FIDDLER' TO TEST THIS OCCURENCE
Get Fiddler from http://www.telerik.com

The first time it tries to load GET /angularjs1-5-ng-src-directive/%7B%7B%20country.flag%20%7D%7D HTTP/1.1 which fails
The second time it tries to load GET /angularjs1-5-ng-src-directive/img/usa-flag.png which succeeds

#To fix the 404 error use the ng-src directive

```ng-src``` attribute ensures that a request is issued only AFTER angular has evaluated the binding expression.

Change ***src***

```javascript
            <img src="{{ country.flag }}"
                alt="{{ country.name + 'Flag' }}"
                style="height:82px; width:152px;">
```

to ***ng-src***

```javascript
            <img ng-src="{{ country.flag }}"
                alt="{{ country.name + 'Flag' }}"
                style="height:82px; width:152px;">
```

It now loads correctly GET /angularjs1-5-ng-src-directive/img/usa-flag.png first time round and succeeds without an error



