import React from 'react';

import '../styles/_card.css';

const Card = ({ cardValue }) => {
	return <img src={`./images/${cardValue}`} alt={cardValue} />;
}

export default Card;