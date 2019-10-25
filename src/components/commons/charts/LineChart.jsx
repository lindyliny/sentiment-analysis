import React from 'react';
import { Line } from 'react-chartjs-2';

export default class TimeBarChart extends React.Component {
	// render
	render() {
		const years = ['2014', '2015', '2019'];
		const { index } = this.props;
		const data = {
			labels: ['Timeblock1 0-3', 'Timeblock2 3-6', 'Timeblock3 6-9', 'Timeblock4 9-12', 'Timeblock5 12-15', 'Timeblock6 15-18', 'Timeblock7 18-21', 'Timeblock8 21-0'],
			datasets: [
				{
					label: 'Melbourne',
					fill: false,
					lineTension: 0.1,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(255,99,132,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(255,99,132,1)',
					pointHoverBorderColor: 'rgba(255,99,132,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					borderColor: 'rgba(255,99,132,1)',
					data: this.props.data[index][0],
				},
				{
					label: 'Sydney',
					fill: false,
					lineTension: 0.1,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(66,134,244,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(66,134,244,1)',
					pointHoverBorderColor: 'rgb(66,134,244,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					borderColor: 'rgb(66,134,244,1)',
					data: this.props.data[index][1],
				},
				{
					label: 'Perth',
					fill: false,
					lineTension: 0.1,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(255, 206, 86 ,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(255, 206, 86 ,1)',
					pointHoverBorderColor: 'rgb(255, 206, 86 ,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					borderColor: 'rgb(255, 206, 86 ,1)',
					data: this.props.data[index][2],
				},
				{
					label: 'Brisbane',
					fill: false,
					lineTension: 0.1,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(67, 242, 96 ,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(67, 242, 96 ,1)',
					pointHoverBorderColor: 'rgb(67, 242, 96 ,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					borderColor: 'rgb(67, 242, 96 ,1)',
					data: this.props.data[index][3],
				},
			],
		};
		return (
			<div className="mb-3">
				<div className="display-4 text-dark text-center my-3">
Percentage of tweets in different time periods (
					{years[index]}
）
				</div>
				<Line data={data} />
			</div>
		);
	}
}
