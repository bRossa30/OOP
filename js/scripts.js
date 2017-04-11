$(function() {

	var n = 0; //number of board

	function randomString() {
		var chars = "0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ",
			str = '';

		for (i=0; i<10 ; i++) {
			str += chars[Math.floor(Math.random()*chars.length)];
		}
		return str;
	}

	// object Column
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

	//object Card
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

	//object Board
	function Board(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.item = n;
		this.$element =  createBoard();

		function createBoard() {
			var $board = $('<div>').addClass('board active').attr('data-item', self.item),
				$boardTitle = $('<h1>').text(self.name),
				$boardAddColumn = $('<button>').addClass('create-column').text('Dodaj kolumnę'),
				$boardColumnContainer = $('<div>').addClass('column-container');

			$boardAddColumn.on('click', function() {
				self.addColumn(new Column(prompt("Podaj nazwę kolumny")));
			});
				
			$board.append($boardTitle)
				.append($boardAddColumn)
				.append($boardColumnContainer);

			return $board;
		};

	};

	Board.prototype = {

		addColumn: function(column) {
			this.$element.children('.column-container').append(column.$element);
			initSortable();
		}

	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	};

	//object BoarListElement in board-navigation
	function BoardListElem(name) {
		var self = this;
		this.name = name;
		this.item = n;
		this.$element = createListItem();

		function createListItem() {
			var $li = $('<li>').addClass('active').attr('data-li_item', self.item);
				$liDescription = $('<p>').text(self.name);
				$liDelete = $('<button>').addClass('btn-delete').text('x');

			$li.append($liDescription)
				.append($liDelete);

			return $li;
		}

		$liDelete.on('click', function() {
			self.removeListElem();
		});

		this.$element.on('click', function() {
			addActiveClassLi(self.item);
			addActiveClassBoard(self.item);
			removeActiveClassLi(self.item);
			removeActiveClassBoard(self.item);
		});
	};

	BoardListElem.prototype.removeListElem = function() {
		var x = this.$element.attr('data-li_item');
		console.log(x);
		this.$element.remove();
		$('.board-container').children('[data-item=' + x + ']' ).remove();
		removeActiveClassLi(x);
		removeActiveClassBoard(x);
		$('.board-container').children(":first").addClass('active');
		$('.board-list').children(":first").addClass('active');
	};

	//class active switching
	function removeActiveClassLi(x) {
		$('.board-list').children('[data-li_item!=' + x + ']').removeClass('active');
	};

	function removeActiveClassBoard(x) {
		$('.board-container').children('[data-item!=' + x + ']').removeClass('active');
	};

	function addActiveClassLi(x) {
		$('.board-list').children('[data-li_item=' + x + ']').addClass('active');
	};

	function addActiveClassBoard(x) {
		$('.board-container').children('[data-item=' + x + ']').addClass('active');
	};

	//creating new Board
	function createBoardItem(name) {
		n++;
		
		var	board = new Board(name),
			liElem = new BoardListElem(name);

		$('.board-container').prepend(board.$element);
		$('.board-list').prepend(liElem.$element);

		removeActiveClassLi(n);
		removeActiveClassBoard(n);

		return board;
	}

	$('.create-board').on('click', function() {
		var name = prompt('Podaj nazwę tablicy');

		createBoardItem(name);
	});

	//show and hide board navigation
	$('i.fa-chevron-right').on('click', function() {
		$('.navigation').animate({width: "100%"});
		$('.board-container').css({width: "calc(100% - 300px)"});
		$(this).after($('i.fa-chevron-left'));
	});

	$('i.fa-chevron-left').on('click', function() {
		$('.navigation').animate({width: "25px"}).children('ul');
		$('.board-container').css({width: "calc(100% - 25px)"});
		$(this).after($('i.fa-chevron-right'));
	});

	//initialize default board
	var board = createBoardItem('Tablica Kanban');

	var	toDoColumn = new Column('Do zrobienia'),
		doingColumn = new Column('W trakcie'),
		doneColumn = new Column('Skończone');

	board.addColumn(toDoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var card1 = new Card('Nowe zadanie'),
		card2 = new Card('Stworzyć tablicę Kanban');

	toDoColumn.addCard(card1);
	doingColumn.addCard(card2);

	//show and hide tbn-delete-description
	$('.btn-delete').on('mouseover', function() {
		$(this).next('.btn-delete-description').removeClass('hidden');
	});

	$('.btn-delete').on('mouseout', function() {
		$('.btn-delete-description').addClass('hidden');
	});

})
