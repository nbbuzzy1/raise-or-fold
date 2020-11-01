import React from 'react';

import '../styles/_results.css';

const Position = ({ currentCorrect, longestCorrect }) => {
	return (
		<div className="results-container">
			{currentCorrect !== 0 && <p>Current Win Streak: {currentCorrect}</p>}
			{longestCorrect !== 0 && <p>Longest Win Streak: {longestCorrect}</p>}
		</div>
	)
}

export default Position;