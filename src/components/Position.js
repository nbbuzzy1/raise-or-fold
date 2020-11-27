import React from 'react';
import { connect } from 'react-redux';

import '../styles/_position.css';

const Position = ({ positionDisplay }) => {
	return (
		<div className="position-container">
			<div className="position-label">Position:</div>
			<div className="position-value">{positionDisplay}</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		positionDisplay: state.positionDisplay
	}
}

export default connect(
	mapStateToProps
)(Position)
