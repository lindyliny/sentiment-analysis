import React from 'react';
import Map from './map/Map';
import Legend from './map/Legend';
import Feature from './map/Feature';
import Header from './Header';

class MapContainer extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<Map />
				<Feature />
			</div>
		);
	}
}


export default MapContainer;
