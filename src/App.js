import React from 'react';

import './App.css';
import Header from './components/Header';
import Position from './components/Position';
import Card from './components/Card';
import deck from './data/deck';
import positions from './data/positions';

const App = () => {
	const setUpStartingHand = (startingDeck) => {
		const cardOne = startingDeck.splice([Math.floor(Math.random() * 52)], 1)[0];
		const cardTwo = startingDeck.splice([Math.floor(Math.random() * 51)], 1)[0];

		return [cardOne, cardTwo]
	}

	const setPosition = () => positions[Math.floor(Math.random() * 8)];

	const pokerHand = setUpStartingHand(deck);
	const position = setPosition();
	console.log(position);

	return (
		<React.Fragment>
			<Header />
			<Position position={position} />
			<Card cardValue={pokerHand[0]} />
			<Card cardValue={pokerHand[1]} />
		</React.Fragment>
	);
}

export default App;
