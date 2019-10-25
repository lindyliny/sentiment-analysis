import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'material-date-range-picker';
import { changeAurin } from '../../actions';

class Feature extends Component {
	constructor(props) {
		super(props);
		this.toNegative = () => {
			this.props.changeAurin('Negative');
		};
		this.toPositive = () => {
			this.props.changeAurin('Positive');
		};
		this.state = {
			fromDate: null,
			toDate: null
		};
	}

	render() {
		const { name, aurin, time } = this.props.feature;
		return (
			<div className="map-overlay2 text-dark" id="features">
				<div className="row mt-2">
					<div className="input-group">
						<div className="input-group-append">
							<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{aurin}</button>
							<div className="dropdown-menu">
								<button type="button" className="dropdown-item " onClick={this.toPositive}>Positive</button>
								<button type="button" className="dropdown-item" onClick={this.toNegative}>Negative</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-2">
					<div className="input-group range-picker">
						<DateRangePicker
							fromDate={this.state.fromDate}
							toDate={this.state.toDate}
							onChange={value => {
								this.setState(value)
							}}
							closeDialogOnSelection
						/>
					</div>
				</div>

				<div className="row mt-2">
					<div className="input-group">
						<span className="input-group-text">
							{' '}
							{name}
						</span>
					</div>
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

export default connect(mapStateToProps, { changeAurin })(Feature);
