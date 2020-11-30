import React from 'react';
import { connect } from 'react-redux';

import '../styles/_actions.css';
import raisingHands from '../data/raising-hands';
import {
	increaseCurrentCorrect, increaseLongestCorrect, resetCurrentCorrect,
	resetLongestCorrect, displayCorrect, displayWrong, displayNothing, shuffleCards, setPosition
} from '../actions/card';

class Actions extends React.Component {
	componentDidMount() {
		this.shuffleCardsAndPosition();
	}

	shuffleCardsAndPosition() {
		this.props.shuffleCards();
		this.props.setPosition();
	}

	increaseCurrentCorrectAndCheckLongest() {
		this.displayResult(true);
		this.props.increaseCurrentCorrect();
		if (this.props.currentCorrect + 1 > this.props.longestCorrect) this.props.increaseLongestCorrect();
	}

	handleWrongChoice() {
		this.displayResult(false);
		this.props.resetCurrentCorrect();
	}

	reverseHand(pokerHand) {
		return `${pokerHand[1]}${pokerHand[0]}${pokerHand[2]}`;
	}

	isRaisingHand(comparisonHand) {
		const shouldRaise = raisingHands[this.props.positionIndex].find((pokerHand) => {
			//We want to check for both AJo and JAo
			const raisingHandReverse = this.reverseHand(pokerHand);
			return pokerHand === comparisonHand || raisingHandReverse === comparisonHand;
		});

		return shouldRaise !== undefined;
	}

	setPokerHandForRaisingFormat(cardOne, cardTwo) {
		if (cardOne[0] === cardTwo[0]) { //pair
			return `${cardOne[0]}${cardTwo[0]}`;
		} else {
			//Are the cards suited or offsuit?
			return cardOne[1] === cardTwo[1] ? `${cardOne[0]}${cardTwo[0]}s`
				: `${cardOne[0]}${cardTwo[0]}o`
		}
	}

	raise = () => {
		const comparisonHand = this.setPokerHandForRaisingFormat(this.props.firstCard, this.props.secondCard);

		this.isRaisingHand(comparisonHand) ? this.increaseCurrentCorrectAndCheckLongest() : this.handleWrongChoice();
		this.shuffleCardsAndPosition();
	}

	fold = () => {
		const comparisonHand = this.setPokerHandForRaisingFormat(this.props.firstCard, this.props.secondCard);

		this.isRaisingHand(comparisonHand) ? this.handleWrongChoice() : this.increaseCurrentCorrectAndCheckLongest();
		this.shuffleCardsAndPosition();
	}

	reset = () => {
		this.props.resetCurrentCorrect();
		this.props.resetLongestCorrect();
		this.shuffleCardsAndPosition();
	}

	displayResult(isCorrect) {
		isCorrect ? this.props.displayCorrect() : this.props.displayWrong();
		setTimeout(() => this.props.displayNothing(), 2000);
	}

	render() {
		return (
			<div className="actions-container">
				<div className="raise-fold-container">
					<button className="button" type="button" onClick={this.raise}>Raise</button>
					<button className="button" type="button" onClick={this.fold}>Fold</button>
				</div>
				<button className="button" type="button" onClick={this.reset}>Start Over</button>
			</div>
		)
	}
}

const mapStateToProps = ({ firstCard, secondCard, currentCorrect, longestCorrect, positionIndex }) => {
	return { firstCard, secondCard, currentCorrect, longestCorrect, positionIndex }
}

const mapDispatchToProps = dispatch => {
	return {
		increaseCurrentCorrect: () => dispatch(increaseCurrentCorrect()),
		increaseLongestCorrect: () => dispatch(increaseLongestCorrect()),
		resetCurrentCorrect: () => dispatch(resetCurrentCorrect()),
		resetLongestCorrect: () => dispatch(resetLongestCorrect()),
		displayCorrect: () => dispatch(displayCorrect()),
		displayWrong: () => dispatch(displayWrong()),
		displayNothing: () => dispatch(displayNothing()),
		shuffleCards: () => dispatch(shuffleCards()),
		setPosition: () => dispatch(setPosition())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Actions)