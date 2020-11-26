import React, { useState, useEffect, componentDidMount } from 'react';

import store from './store';
import { shuffleCards, setPosition } from './actions/card';
import Header from './components/Header';
import Position from './components/Position';
import Card from './components/Card';
import Actions from './components/Actions';
import Results from './components/Results';
import raisingHands from './data/raising-hands';

const App = () => {
	const shuffleCardsAndPosition = () => {
		store.dispatch(shuffleCards());
		store.dispatch(setPosition());
		console.log(store.getState())
	}

	const setPokerHandForRaisingFormat = (cardOne, cardTwo) => {
		if (cardOne[0] === cardTwo[0]) { //pair
			return `${cardOne[0]}${cardTwo[0]}`;
		} else {
			//Are the cards suited or offsuit?
			return cardOne[1] === cardTwo[1] ? `${cardOne[0]}${cardTwo[0]}s`
				: `${cardOne[0]}${cardTwo[0]}o`
		}
	}

	const reverseHand = (pokerHand) => {
		return `${pokerHand[1]}${pokerHand[0]}${pokerHand[2]}`;
	}

	const isRaisingHand = (comparisonHand) => {
		const shouldRaise = raisingHands[positionIndex].find((pokerHand) => {
			//We want to check for both AJo and JAo
			const raisingHandReverse = reverseHand(pokerHand);
			return pokerHand === comparisonHand || raisingHandReverse === comparisonHand;
		});

		return shouldRaise !== undefined;
	}

	const increaseCurrentCorrectAndCheckLongest = () => {
		displayResult(true);
		const newCurrentValue = currentCorrect + 1;
		setCurrentCorrect(newCurrentValue);

		if (newCurrentValue > longestCorrect) {
			setLongestCorrect(newCurrentValue);
		}
	}

	const handleWrongChoice = () => {
		displayResult(false);
		setCurrentCorrect(0);
	}

	const displayResult = (wasCorrectChoice) => {
		wasCorrectChoice ? setResult('Correct!') : setResult('Wrong!');
		setShowResult(true);
		setTimeout(() => setShowResult(false), 2000);
	}

	const raise = () => {
		const comparisonHand = setPokerHandForRaisingFormat(cardOne, cardTwo);

		isRaisingHand(comparisonHand) ? increaseCurrentCorrectAndCheckLongest() : handleWrongChoice();
		shuffleCardsAndPosition()
	}

	const fold = () => {
		const comparisonHand = setPokerHandForRaisingFormat(cardOne, cardTwo);

		isRaisingHand(comparisonHand) ? handleWrongChoice() : increaseCurrentCorrectAndCheckLongest();
		shuffleCardsAndPosition()
	}

	const reset = () => {
		setCurrentCorrect(0);
		shuffleCardsAndPosition()
	}

	return (
		<React.Fragment>
			<Header />
			<Position position={positionDisplay} />
			<Card cardValue={cardOne} />
			<Card cardValue={cardTwo} />
			<Actions raise={raise} fold={fold} reset={reset} />
			<Results currentCorrect={currentCorrect} longestCorrect={longestCorrect} result={result} showResult={showResult} />
		</React.Fragment>
	);
}

export default App;
