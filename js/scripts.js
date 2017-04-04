$(function(){
	function Phone(name, brand, price, color, diagonal, system) {
		this.name = name;
	this.brand = brand;
	this.price = price;
	this.color = color;
	this.diagonal = diagonal;
	this.system = system;
};

Phone.prototype.printInfo = function() {
	console.log("Ten telefon jest marki " + this.brand + ", kosztuje " + this.price + ", jego kolor to " + this.color + ", ma przekątną " +
	this.diagonal + " cala oraz system operacyjny " + this.system + "." );
};

Phone.prototype.addTable = function() {
	$('.container').append($('<table id="' + this.name + '"><td>Model</td><td>'+ this.name + '</td>'));
	$('#' + this.name + ' tr:last').after($('<tr><td>Cena</td><td>'+ this.price + '</td></tr>'));
	$('#' + this.name + ' tr:last').after($('<tr><td>Kolor</td><td>'+ this.color + '</td></tr>'));
	$('#' + this.name + ' tr:last').after($('<tr><td>Przekątna</td><td>'+ this.diagonal + '</td></tr>'));
	$('#' + this.name + ' tr:last').after($('<tr><td>System</td><td>'+ this.system + '</td></tr>'));
						
};

var samsungS6 = new Phone('Samsung-Galaxy-S6', 'Samsung', 1999, 'czarny', 5.1, "Android"  ),
	iphone6s = new Phone('iPhone-6s', 'Apple', 2839, 'różowy', 4.6 , "iOS"),
	onePlusOne = new Phone('OnePlus-One', 'OnePlus', 1299, 'czarny', 5.5, "Android");

samsungS6.printInfo();
iphone6s.printInfo();
onePlusOne.printInfo();
samsungS6.addTable();
iphone6s.addTable();
onePlusOne.addTable();
});
