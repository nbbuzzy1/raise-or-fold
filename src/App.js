import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import Position from './components/Position';
import Card from './components/Card';
import Actions from './components/Actions';
import Results from './components/Results';

const App = ({ cardOne, cardTwo }) => {
	return (
		<React.Fragment>
			<Header />
			<Position />
			<Card cardValue={cardOne} />
			<Card cardValue={cardTwo} />
			<Actions />
			<Results />
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		cardOne: state.firstCard,
		cardTwo: state.secondCard
	}
}

export default connect(
	mapStateToProps
)(App)
