import React, { Component } from 'react';
import { connect } from 'react-redux';

class Legend extends Component {
	render() {
		const { layers, colors } = this.props.feature.active;

		return (
			<div className="map-overlay text-dark container" id="legend">
				<div>
					{layers.map((item, index) => (
						<span key={item.id || index}>
							<div>
								<span
									className="legend-key"
									style={{ backgroundColor: colors[index] }}
								/>
								<span>
									{item}
								</span>
							</div>
						</span>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		feature: state.feature,
	};
}

export default connect(mapStateToProps)(Legend);
