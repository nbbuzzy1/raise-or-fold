import deck from '../data/deck';
import positions from '../data/positions';

const randomPosition = () => Math.floor(Math.random() * 8);
const initialPositionIndex = randomPosition();

const initialState = {
	firstCard: null,
	secondCard: null,
	currentCorrect: 0,
	longestCorrect: 0,
	positionIndex: initialPositionIndex,
	positionDisplay: positions[initialPositionIndex],
}

const shuffleCards = () => {
	const startingDeck = deck.slice();
	const firstCard = startingDeck.splice(Math.floor(Math.random() * 52), 1)[0];
	const secondCard = startingDeck.splice(Math.floor(Math.random() * 51), 1)[0];
	return [firstCard, secondCard];
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHUFFLE_CARDS':
			const [firstCard, secondCard] = shuffleCards();
			return { ...state, firstCard, secondCard };
		case 'SET_POSITION':
			const positionIndex = randomPosition();
			return { ...state, positionIndex, positionDisplay: positions[positionIndex] };
		case 'INCREASE_CURRENT_CORRECT':
			return { ...state, currentCorrect: state.currentCorrect++ };
		case 'INCREASE_LONGEST_CORRECT':
			return { ...state, longestCorrect: state.longestCorrect++ };
		case 'RESET_CURRENT_CORRECT':
			return { ...state, currentCorrect: 0 };
		case 'RESET_LONGEST_CORRECT':
			return { ...state, longestCorrect: 0 };
		default:
			return state;
	}
}