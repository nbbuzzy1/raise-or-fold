import React from 'react';
import { connect } from 'react-redux';

import '../styles/_actions.css';
import raisingHands from '../data/raising-hands';
import {
	increaseCurrentCorrect, increaseLongestCorrect, resetCurrentCorrect,
	resetLongestCorrect, displayCorrect, displayWrong, displayNothing
} from '../actions/card';

const setPokerHandForRaisingFormat = (cardOne, cardTwo) => {
	if (cardOne[0] === cardTwo[0]) { //pair
		return `${cardOne[0]}${cardTwo[0]}`;
	} else {
		//Are the cards suited or offsuit?
		return cardOne[1] === cardTwo[1] ? `${cardOne[0]}${cardTwo[0]}s`
			: `${cardOne[0]}${cardTwo[0]}o`
	}
}

const shuffleCardsAndPosition = () => {
	store.dispatch(shuffleCards());
	store.dispatch(setPosition());
	console.log(store.getState())
}

const reverseHand = (pokerHand) => {
	return `${pokerHand[1]}${pokerHand[0]}${pokerHand[2]}`;
}

const isRaisingHand = (comparisonHand, positionIndex) => {
	const shouldRaise = raisingHands[positionIndex].find((pokerHand) => {
		//We want to check for both AJo and JAo
		const raisingHandReverse = reverseHand(pokerHand);
		return pokerHand === comparisonHand || raisingHandReverse === comparisonHand;
	});

	return shouldRaise !== undefined;
}

const increaseCurrentCorrectAndCheckLongest = (currentCorrect, longestCorrect, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayNothing) => {
	displayResult(displayCorrect, displayNothing);

	increaseCurrentCorrect();
	if (currentCorrect > longestCorrect) {
		increaseLongestCorrect();
	}
}

const handleWrongChoice = (displayWrong, displayNothing) => {
	displayWrong();
	setTimeout(() => displayNothing(), 2000);
}

const raise = ({ firstCard, secondCard, currentCorrect, longestCorrect, positionIndex, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayWrong, displayNothing }) => {
	const comparisonHand = setPokerHandForRaisingFormat(firstCard, secondCard);

	isRaisingHand(comparisonHand, positionIndex) ? increaseCurrentCorrectAndCheckLongest(currentCorrect, longestCorrect, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayNothing)
		: handleWrongChoice(displayWrong, displayNothing);
	//shuffleCardsAndPosition()
}

const fold = ({ firstCard, secondCard, currentCorrect, longestCorrect, positionIndex, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayWrong, displayNothing }) => {
	const comparisonHand = setPokerHandForRaisingFormat(firstCard, secondCard);

	isRaisingHand(comparisonHand, positionIndex) ? handleWrongChoice(displayWrong, displayNothing)
		: increaseCurrentCorrectAndCheckLongest(currentCorrect, longestCorrect, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayNothing);
	//shuffleCardsAndPosition()
}

const reset = (resetCurrentCorrect, resetLongestCorrect) => {
	resetCurrentCorrect();
	resetLongestCorrect();
	//shuffleCardsAndPosition()
}

const displayResult = (displayCorrect, displayNothing) => {
	displayCorrect();
	setTimeout(() => displayNothing(), 2000);
}

const Actions = ({ firstCard, secondCard, currentCorrect, longestCorrect, positionIndex,
	increaseCurrentCorrect, increaseLongestCorrect, resetCurrentCorrect, resetLongestCorrect,
	displayCorrect, displayWrong, displayNothing }) => {
	const raiseFoldParams = { firstCard, secondCard, currentCorrect, longestCorrect, positionIndex, increaseCurrentCorrect, increaseLongestCorrect, displayCorrect, displayWrong, displayNothing }
	return (
		<div className="actions-container">
			<div className="raise-fold-container">
				<button className="button" type="button" onClick={() => raise(raiseFoldParams)}>Raise</button>
				<button className="button" type="button" onClick={() => fold(raiseFoldParams)}>Fold</button>
			</div>
			<button className="button" type="button" onClick={() => reset(resetCurrentCorrect, resetLongestCorrect)}>Start Over</button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		firstCard: state.firstCard,
		secondCard: state.secondCard,
		currentCorrect: state.currentCorrect,
		longestCorrect: state.longestCorrect,
		positionIndex: state.positionIndex
	}
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
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Actions)