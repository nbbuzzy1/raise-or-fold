import React from 'react';

import '../styles/_position.css';

const Position = ({ position }) => {
	return (
		<div className="position-container">
			<div className="position-label">Position:</div>
			<div className="position-value">{position}</div>
		</div>
	)
}

export default Position;
