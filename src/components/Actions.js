import React from 'react';

import '../styles/_actions.css';

const Actions = ({ raise, fold, reset }) => {
	return (
		<div className="actions-container">
			<div className="raise-fold-container">
				<button className="button" type="button" onClick={raise}>Raise</button>
				<button className="button" type="button" onClick={fold}>Fold</button>
			</div>
			<button className="button" type="button" onClick={reset}>Start Over</button>
		</div>
	)
}

export default Actions;