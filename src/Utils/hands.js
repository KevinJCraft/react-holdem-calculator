class Hand {
	constructor() {
		this.cards = [];
		this.value = 0;
		this.wins = 0;
		this.handsPlayed = 0;
		this.ties = 0;
		this.pairs = [];
		this.trips = [];
		this.quads = [];
	}

	resetResults() {
		this.wins = 0;
		this.handsPlayed = 0;
		this.ties = 0;
	}

	getWinPercentage() {
		if(this.handsPlayed === 0) return 0
		return ((this.wins / this.handsPlayed)*100).toFixed(2);
	}
	getTiePercentage() {
		if(this.handsPlayed === 0) return 0
		return ((this.ties / this.handsPlayed)*100).toFixed(2);
	}

	swapCards(i, j) {
		this.cards[i] = this.cards.splice(j, 1, this.cards[i])[0];
	}

	moveCardToIndex(card, index = 0) {
		this.cards.splice(
			index,
			0,
			this.cards.splice(this.cards.indexOf(card), 1)[0]
		);
	}

	sort() {
		this.cards.sort((a, b) => {
			return b.rank - a.rank;
		});
	}

	resetGroupings() {
		this.pairs = [];
		this.trips = [];
		this.quads = [];
	}

	groupingsByRank() {
		let index = 0;
		for (let i = 14; i >= 2; i--) {
			let cards = this.cards.filter(card => card.rank === i);
			if (cards.length === 2 && this.pairs.length < 2) {
				this.pairs[index] = cards;
				index++;
			} else if (cards.length === 3 && this.trips.length < 1) {
				this.trips[0] = cards;
			} else if (cards.length === 4) {
				this.quads[0] = cards;
			}
		}
	}

	addDummyAce() {
		if (this.cards[0].rank === 14) {
			this.cards.push({ rank: 1, suit: this.cards[0].suit });
		}
	}

	removeDummyAce() {
		this.cards.pop();
	}

	calcValue(handRankValue) {
		let multiplier = 100;
		let cardCount = 1;
		this.value = handRankValue;

		this.cards.forEach(e => {
			if (cardCount <= 5) {
				this.value += e.rank * multiplier;
				multiplier /= 100;
				cardCount++;
			}
		});
	}

	sortBySuit(suit) {
		this.cards.sort((a, b) => {
			if (a.suit === suit && b.suit === suit) {
				return 0;
			} else if (a.suit === suit) {
				return -1;
			} else {
				return 1;
			}
		});
	}

	evaluate() {
		this.resetGroupings();
		this.sort();
		this.groupingsByRank();

		if (this.isStraightFlush()) {
			this.calcValue(80000);
		} else if (this.isQuads()) {
			this.calcValue(70000);
		} else if (this.isFullHouse()) {
			this.calcValue(60000);
		} else if (this.isFlush()) {
			this.calcValue(50000);
		} else if (this.isStraight()) {
		} else if (this.isTrips()) {
			this.calcValue(30000);
		} else if (this.isTwoPair()) {
			this.calcValue(20000);
		} else if (this.isPair()) {
			this.calcValue(10000);
		} else {
			this.calcValue(0);
		}
	}

	isPair() {
		if (this.pairs.length === 1) {
			this.pairs[0].forEach(card => this.moveCardToIndex(card));
			return true;
		}
	}

	isTwoPair() {
		if (this.pairs.length === 2) {
			this.pairs[1].forEach(card => this.moveCardToIndex(card));
			this.pairs[0].forEach(card => this.moveCardToIndex(card));
			return true;
		}
	}

	isTrips() {
		if (this.trips.length === 1) {
			this.trips[0].forEach(card => this.moveCardToIndex(card));
			return true;
		}
	}

	isStraight() {
		for (let i = 0; i < this.cards.length - 3; i++) {
			let straightLength = 1;

			for (let j = i + 1; j < this.cards.length; j++) {
				if (this.cards[i].rank === this.cards[j].rank) {
					// do nothing
				} else if (this.cards[i].rank - this.cards[j].rank === 1) {
					straightLength++;

					if (straightLength === 5) {
						this.value = 40000 + (this.cards[j].rank + 4 * 100);
						return true;
					}

					if (
						straightLength === 4 &&
						this.cards[j].rank === 2 &&
						this.cards[0].rank === 14
					) {
						this.value = 40500;
						return true;
					}
					i = j;
				} else {
					j = this.cards.length;
					straightLength = 1;
				}
			}
		}
	}

	// isStraight() {
	//     let tempHand = new Hand;
	//     tempHand.cards = this.copyHand();
	//     for( let i = 1; i<tempHand.cards.length; i++) {
	//         if(tempHand.cards[i].rank === tempHand.cards[i-1].rank ) {
	//             tempHand.cards.splice( i, 1);
	//             i--;
	//         }
	//     }
	//     tempHand.addDummyAce();

	//     while( tempHand.cards.length > 4 ) {
	//         if( tempHand.cards[0].rank - tempHand.cards[4].rank === 4 ) {
	//             tempHand.cards.forEach( card => this.moveCardToIndex(card));
	//             return true;
	//         } else {
	//             tempHand.cards.shift();
	//         }
	//     }

	// }

	isFlush() {
		let allSuits = ["spade", "heart", "diamond", "club"];
		let flush = false;

		allSuits.forEach(suit => {
			if (this.cards.filter(card => card.suit === suit).length > 4) {
				this.sortBySuit(suit);
				flush = true;
			}
		});

		return flush;
	}

	isFullHouse() {
		if (this.trips.length === 1 && this.pairs.length > 0) {
			this.pairs[0].forEach(card => this.moveCardToIndex(card));
			this.trips[0].forEach(card => this.moveCardToIndex(card));
			return true;
		}
	}

	isQuads() {
		if (this.quads.length === 1) {
			this.quads[0].forEach(card => this.moveCardToIndex(card));
			return true;
		}
	}

	isStraightFlush() {
		if (this.isFlush()) {
			let flushSuit = this.cards[1].suit;
			let tempHand = new Hand();
			tempHand.cards = this.cards.filter(e => e.suit === flushSuit);

			while (tempHand.cards.length > 4) {
				if (tempHand.cards[0].rank - tempHand.cards[4].rank === 4) {
					tempHand.cards.forEach(card => this.moveCardToIndex(card));
					return true;
				} else {
					tempHand.cards.shift();
				}
			}
		}
	}
}

export default Hand;
