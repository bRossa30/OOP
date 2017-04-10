$(function() {

	function randomString() {
		var chars = "0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ",
			str = '';

		for (i=0; i<10 ; i++) {
			str += chars[Math.floor(Math.random()*chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column'), 
				$columnTitleContainer = $('<div>').addClass('column-title-container'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnDeleteDescription = $('<div>').addClass('btn-delete-description hidden').text('Usuń'),
				$columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

			$columnDelete.on('click', function() {
				self.removeColumn();
			});

			$columnAddCard.on('click', function() {
				self.addCard(new Card(prompt("Podaj nazwę karty"), prompt('Podaj kolor karty')));
			});

			$columnTitleContainer.append($columnTitle)
				.append($columnDelete)
				.append($columnDeleteDescription);
			

			$column.append($columnTitleContainer)
				.append($columnAddCard)
				.append($columnCardList);


			return $column;
		};
	};

	Column.prototype = {
		addCard: function(card) { 
			this.$element.children('ul').append(card.$element);
		},

		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description, color) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.color = color;
		this.$element = createCard();


		function createCard() {
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<textarea>').addClass("card-description").val(self.description),
				$cardDelete = $('<button>').addClass('btn-delete').text('x'),
				$cardDeleteDescription = $('<div>').addClass('btn-delete-description hidden').text('Usuń');


			$cardDelete.on('click', function() {
				self.removeCard();
			});

			$card.append($cardDescription)
				.append($cardDelete)
				.append($cardDeleteDescription);

			$card.css('background-color', self.color);
			$cardDescription.css('background-color', self.color);
			return $card;
		};

	};

	Card.prototype.removeCard = function() {
		this.$element.remove();
	}

	function Board(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element =  createBoard();

		function createBoard() {
			var $board = $('<div>').addClass('board'),
				$boardTitle = $('<h1>').text(self.name),
				$boardDelete = $('<button>').addClass('btn-delete btn-delete-board').text('x'),
				$boardAddColumn = $('<button>').addClass('create-column').text('Dodaj kolumnę'),
				$boardColumnContainer = $('<div>').addClass('column-container');


			$boardDelete.on('click', function() {
				self.removeBoard();
			});

			$boardAddColumn.on('click', function() {
				self.addColumn(new Column(prompt("Podaj nazwę kolumny")));
			});

			$board.append($boardDelete)
				.append($boardTitle)
				.append($boardAddColumn)
				.append($boardColumnContainer);

			return $board;
		};
	};

	Board.prototype = {
		removeBoard: function() {
			this.$element.remove();
		},

		addColumn: function(column) {
			this.$element.children('.column-container').append(column.$element);
			initSortable();
		}

	};

	$('.create-board').on('click', function() {
		var board = new Board(prompt('Podaj nazwę tablicy'));
		$('.create-board').before(board.$element);
	});

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	};

	var board = new Board('Tablica Kanban'),
		toDoColumn = new Column('Do zrobienia'),
		doingColumn = new Column('W trakcie'),
		doneColumn = new Column('Skończone');

	$('.create-board').before(board.$element);
	board.addColumn(toDoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var card1 = new Card('Nowe zadanie'),
		card2 = new Card('Stworzyć tablicę Kanban');

	toDoColumn.addCard(card1);
	doingColumn.addCard(card2);

	$('.btn-delete').on('mouseover', function() {
		$(this).next('.btn-delete-description').removeClass('hidden');
	});

	$('.btn-delete').on('mouseout', function() {
		$('.btn-delete-description').addClass('hidden');
	});

})
