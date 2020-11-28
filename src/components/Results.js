import React from 'react';
import { connect } from 'react-redux';

import '../styles/_results.css';

const Results = ({ currentCorrect, longestCorrect, result }) => {
	return (
		<div className="results-container">
			<p className={result === 'Correct!' ? 'green' : 'red'}>{result}</p>
			{currentCorrect !== 0 && <p>Current Win Streak: {currentCorrect}</p>}
			{longestCorrect !== 0 && <p>Longest Win Streak: {longestCorrect}</p>}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		result: state.result,
		currentCorrect: state.currentCorrect,
		longestCorrect: state.longestCorrect
	}
}

export default connect(
	mapStateToProps
)(Results)