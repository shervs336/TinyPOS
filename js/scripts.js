// Initialize Firebase
var config = {
	apiKey: "AIzaSyBfE91E9wdT5dO-Cx7yySPG_fT-gnzz3Yw",
	authDomain: "tinypos-734e5.firebaseapp.com",
	databaseURL: "https://tinypos-734e5.firebaseio.com",
	storageBucket: "tinypos-734e5.appspot.com",
	messagingSenderId: "43833340225"
};

firebase.initializeApp(config);

var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {
	var auth = $firebaseAuth();
		
	var ref = firebase.database().ref();
	
	$scope.data = $firebaseObject(ref);
	
	$scope.firebaseUser = null;
	$scope.error = null;
	
	/*
	auth.$signInAnonymously().then(function(firebaseUser){
		$scope.firebaseUser = firebaseUser;
	}).catch(function(error){
		$scope.error = error;
	});
	*/
	
	$scope.add = function(item, qty, price){
		var stock = $firebaseArray(ref);
		
		var data = {
			"item": item, 
			"qty": qty,
			"price": price
		}
		
		document.querySelector('[ng-model="itemDescription"]').value = "";
		document.querySelector('[ng-model="itemStock"]').value = "";
		document.querySelector('[ng-model="itemPrice"]').value = "";
		
		stock.$add(data).then(function(ref){
			var id = ref.key;
			console.log("added record with id " + id);
		});
		
	}

});