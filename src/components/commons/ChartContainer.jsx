import React from 'react';
import { connect } from 'react-redux';
import LineChart from './charts/LineChart';
import Header from './Header';
import { changeChart, changeYear } from '../actions';

const years = ['2014', '2015', '2019'];

class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.changeYear = (e) => {
			this.props.changeYear(e.target.value);
		};
	}

	calLineChart() {
		const chartsData = this.props.chart.chartsData.collections;
		const barChart = [];
		let count = 0;
		const list = [
			'Timeblock1 0-3',
			'Timeblock2 3-6',
			'Timeblock3 6-9',
			'Timeblock4 9-12',
			'Timeblock5 12-15',
			'Timeblock6 15-18',
			'Timeblock7 18-21',
			'Timeblock8 21-0',
		];
		chartsData.forEach((year) => {
			barChart.push([]);
			year.cities.forEach((city) => {
				const dataD = [];
				const { timeblocks } = city;
				for (let i = 0; i < list.length; i += 1) {
					dataD.push((timeblocks[list[i]] * 100) / city.tweetnum);
				}
				barChart[count].push(dataD);
			});
			count += 1;
		});
		return barChart;
	}

	renderChart() {
		let yearIndex = 0;
		if (this.props.chart.year === '2014') {
			yearIndex = 0;
		} else if (this.props.chart.year === '2015') {
			yearIndex = 1;
		} else if (this.props.chart.year === '2019') {
			yearIndex = 2;
		}

		return <LineChart data={this.calLineChart()} index={yearIndex} />;
	}

	render() {
		return (
			<div>
				<Header />
				<div className="container mt-100">
					<div className="input-group mt-2">
						<button
							className="btn btn-outline-secondary dropdown-toggle"
							type="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							{this.props.chart.year}
						</button>
						<div className="dropdown-menu">
							<button
								type="button"
								className="dropdown-item"
								value={years[0]}
								onClick={this.changeYear}
							>
								{years[0]}
							</button>
							<button
								type="button"
								className="dropdown-item"
								value={years[1]}
								onClick={this.changeYear}
							>
								{years[1]}
							</button>
							<button
								type="button"
								className="dropdown-item"
								value={years[2]}
								onClick={this.changeYear}
							>
								{years[2]}
							</button>
						</div>
					</div>
					{this.renderChart()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		chart: state.chart,
	};
}

export default connect(
	mapStateToProps,
	{ changeChart, changeYear },
)(MapContainer);
