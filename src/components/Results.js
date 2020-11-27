import React from 'react';
import { connect } from 'react-redux';

import '../styles/_results.css';

const Results = ({ currentCorrect, longestCorrect, result }) => {
	return (
		<div className="results-container">
			{result && <p className={result === 'Correct!' ? 'green' : 'red'}>{result}</p>}
			{currentCorrect && <p>Current Win Streak: {currentCorrect}</p>}
			{longestCorrect && <p>Longest Win Streak: {longestCorrect}</p>}
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