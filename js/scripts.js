$(function() {

	function Button(text) {
		this.text = text || 'Hello';
	};

	Button.prototype.create = function() {
		var self = this;
		this.$element = $('<button>');
		this.$element.text(this.text);
		$('.container').append(this.$element);
		this.$element.on('click', function() {
			alert(self.text);
		});
	};

	Button.prototype.createBtn = function() {
		var self = this;
		this.$element.off('click');
		this.$element.on('dblclick', function() {
			self.$element = $('<button>');
			self.$element.text('A kuku');
			$('.container').append(self.$element);
		});
	}

	var btn1 = new Button('Jestem pierwszy'),
		btn2 = new Button()
		btn3 = new Button('Naciśnij mnie dwukrotnie');

	btn1.create();
	btn2.create();
	btn3.create();
	btn3.createBtn();

});