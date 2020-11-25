import React from 'react';

import '../styles/_results.css';

const Position = ({ currentCorrect, longestCorrect, showResult, result }) => {
	return (
		<div className="results-container">
			{showResult && <p className={result === 'Correct!' ? 'green' : 'red'}>{result}</p>}
			{currentCorrect !== 0 && <p>Current Win Streak: {currentCorrect}</p>}
			{longestCorrect !== 0 && <p>Longest Win Streak: {longestCorrect}</p>}
		</div>
	)
}

export default Position;