export const shuffleCards = () => ({ type: 'SHUFFLE_CARDS' });
export const setPosition = () => ({ type: 'SET_POSITION' });
export const increaseCurrentCorrect = () => ({ type: 'INCREASE_CURRENT_CORRECT' });
export const increaseLongestCorrect = () => ({ type: 'INCREASE_LONGEST_CORRECT' });
export const resetCurrentCorrect = () => ({ type: 'RESET_CURRENT_CORRECT' });
export const resetLongestCorrect = () => ({ type: 'RESET_LONGEST_CORRECT' });
export const displayCorrect = () => ({ type: 'UPDATE_RESULT', payload: 'Correct!' });
export const displayWrong = () => ({ type: 'UPDATE_RESULT', payload: 'Wrong!' });
export const displayNothing = () => ({ type: 'UPDATE_RESULT', payload: '' });