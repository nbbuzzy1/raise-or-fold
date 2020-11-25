import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Position from './components/Position';
import Card from './components/Card';
import Actions from './components/Actions';
import Results from './components/Results';
import deck from './data/deck';
import positions from './data/positions';
import raisingHands from './data/raising-hands';

const App = () => {
	const [currentCorrect, setCurrentCorrect] = useState(0);
	const [longestCorrect, setLongestCorrect] = useState(0);
	const [positionIndex, setPositionIndex] = useState(Math.floor(Math.random() * 8));
	const [positionDisplay, setPositionDisplay] = useState(positions[positionIndex]);
	const [cardOne, setCardOne] = useState(null);
	const [cardTwo, setCardTwo] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState(null);

	const shuffleCardsAndPosition = () => {
		setStartingHand(deck.slice());
		setPositionIndex(Math.floor(Math.random() * 8));
		setPositionDisplay(positions[positionIndex]);
	}

	const setStartingHand = (startingDeck) => {
		const firstCard = startingDeck.splice(Math.floor(Math.random() * 52), 1)[0];
		const secondCard = startingDeck.splice(Math.floor(Math.random() * 51), 1)[0];

		setCardOne(firstCard);
		setCardTwo(secondCard);
	}

	useEffect(() => {
		shuffleCardsAndPosition();
	}, [])

	const setPokerHandForRaisingFormat = () => {
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
		setLongestCorrect(0);
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
