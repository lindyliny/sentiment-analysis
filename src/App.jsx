import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MapContainer from './components/commons/MapContainer';
import ChartContainer from './components/commons/ChartContainer';
import Home from './components/commons/Home';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/map" component={MapContainer} />
					<Route path="/charts" component={ChartContainer} />
				</div>
			</Router>
		);
	}
}

export default App;
