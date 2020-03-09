class Deck {
	constructor() {
		this.cards = this.createDeck();
	}

	createDeck() {
		let color = ["red", "green", "black", "blue"];
		let suit = ["heart", "club", "spade", "diamond"];
		let rank = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		let rankName = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2];
		let suitIndex = 0;
		let rankIndex = 0;
		let Deck = [];

		for (let i = 0; i < 52; i++) {
			let card = {};

			card.suit = suit[suitIndex];
			card.rank = rank[rankIndex];
			card.color = color[suitIndex];
			card.identifier = i;
			card.rankName = rankName[rankIndex];

			Deck.push(card);

			rankIndex++;
			if (rankIndex >= rank.length) {
				rankIndex = 0;
			}

			if ((i + 1) % 13 === 0) {
				suitIndex++;
			}
		}

		return Deck;
	}

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	show() {
		let str = "";
		this.cards.forEach(e => {
			str += "<span style='color: " + e.color + "'>" + e.name + "</span>  ";
		});
		return str;
	}

	dealCard(NumOfCards) {
		return this.cards.splice(0, NumOfCards);
	}

	copyCard(index) {
		return this.cards[index];
	}
}

export default Deck;
