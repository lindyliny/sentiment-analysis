import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { changeFeature } from '../../actions';

mapboxgl.accessToken = 'pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ';

const timePeriods = ['T1', 'T2', 'T3', 'T4'];

class Map extends Component {
	componentDidMount() {
		let hoveredObId = null;
		let hoveredOwId = null;
		const { positive, aurinNegative } = this.props.data;

		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: this.props.map.center,
			zoom: 8,
		});
		this.map.addControl(new mapboxgl.NavigationControl());

		this.map.on('load', () => {
			this.map.addSource('positive', {
				type: 'geojson',
				data: positive,
			});
			this.map.addSource('aurinNegative', {
				type: 'geojson',
				data: aurinNegative,
			});


			this.map.addLayer({
				id: 'positive-fills',
				type: 'fill',
				source: 'positive',
				layout: {},
				paint: {
					'fill-color': ['step', ['get', 'density'], '#ffeda0', 1000, '#ffeda0', 2000, '#fed976', 10000, '#feb24c', 50000, '#fd8d3c', 100000, '#fc4e2a', 150000, '#e31a1c', 200000, '#bd0026'],
					'fill-opacity': ['case',
						['boolean', ['feature-state', 'hover'], false],
						0.8,
						0.4,
					],
				},
			});

			this.map.addLayer({
				id: 'positive-borders',
				type: 'line',
				source: 'positive',
				layout: {},
				paint: {
					'line-color': '#627BC1',
					'line-width': 2,
				},
			});

			this.map.addLayer({
				id: 'aurinNegative-fills',
				type: 'fill',
				source: 'aurinNegative',
				layout: {},
				paint: {
					'fill-color': ['step', ['get', 'density'], '#fcfbfd', 50000, '#efedf5', 100000, '#dadaeb', 150000, '#bcbddc', 200000, '#9e9ac8', 250000, '#807dba', 300000, '#6a51a3', 350000, '#4a1486'],
					'fill-opacity': ['case',
						['boolean', ['feature-state', 'hover'], false],
						0.8,
						0.6,
					],
				},
			});

			this.map.addLayer({
				id: 'aurinNegative-borders',
				type: 'line',
				source: 'aurinNegative',
				layout: {},
				paint: {
					'line-color': '#627BC1',
					'line-width': 2,
				},
			});

			this.renderAllPoints();

			if (this.props.feature.aurin === 'Obesity') {
				this.map.setLayoutProperty('aurinNegative-fills', 'visibility', 'none');
				this.map.setLayoutProperty('positive-fills', 'visibility', 'visible');
			} else {
				this.map.setLayoutProperty('positive-fills', 'visibility', 'none');
				this.map.setLayoutProperty('aurinNegative-fills', 'visibility', 'visible');
			}

			this.map.on('mousemove', 'positive-fills', (e) => {
				if (e.features.length > 0) {
					this.props.changeFeature(`${e.features[0].properties.name}(${this.props.feature.aurin}):${e.features[0].properties.density}`);
					if (hoveredObId) {
						this.map.setFeatureState({ source: 'positive', id: hoveredObId }, { hover: false });
					}
					hoveredObId = e.features[0].id;
					this.map.setFeatureState({ source: 'positive', id: hoveredObId }, { hover: true });
				}
			});


			this.map.on('mousemove', 'aurinNegative-fills', (e) => {
				if (e.features.length > 0) {
					this.props.changeFeature(`${e.features[0].properties.name}(${this.props.feature.aurin}):${e.features[0].properties.density}`);
					if (hoveredOwId) {
						this.map.setFeatureState({ source: 'aurinNegative', id: hoveredOwId }, { hover: false });
					}
					hoveredOwId = e.features[0].id;
					this.map.setFeatureState({ source: 'aurinNegative', id: hoveredOwId }, { hover: true });
				}
			});


			this.map.on('mouseleave', 'aurinNegative-fills', () => {
				if (hoveredOwId) {
					this.map.setFeatureState({ source: 'aurinNegative', id: hoveredOwId }, { hover: false });
				}
				hoveredOwId = null;
			});

			this.map.on('mouseleave', 'positive-fills', () => {
				if (hoveredObId) {
					this.map.setFeatureState({ source: 'positive', id: hoveredObId }, { hover: false });
				}
				hoveredObId = null;
			});
		});
	}

	componentDidUpdate() {
		if (this.props.feature.aurin === 'Positive') {
			this.map.setLayoutProperty('aurinNegative-fills', 'visibility', 'none');
			this.map.setLayoutProperty('positive-fills', 'visibility', 'visible');
		} else {
			this.map.setLayoutProperty('positive-fills', 'visibility', 'none');
			this.map.setLayoutProperty('aurinNegative-fills', 'visibility', 'visible');
		}

		const timeP = this.props.feature.time;
		if (timeP === 0) {
			timePeriods.forEach((time) => {
				const name = `Twr${time}`;
				this.setVis(name, 'none');
			});
		} else if (timeP === 6) {
			this.setAll(0);
		} else if (timeP === 12) {
			this.setAll(1);
		} else if (timeP === 18) {
			this.setAll(2);
		} else if (timeP === 24) {
			this.setAll(3);
		}
	}

	setVis(name, vis) {
		const clusters = `clusters-${name}`;
		const clusterCount = `cluster-count-${name}`;
		const unclusteredPoint = `unclustered-point-${name}`;
		this.map.setLayoutProperty(clusters, 'visibility', vis);
		this.map.setLayoutProperty(clusterCount, 'visibility', vis);
		this.map.setLayoutProperty(unclusteredPoint, 'visibility', vis);
	}

	setAll(num) {
		let count = 0;
		timePeriods.forEach((time) => {
			const name = `Twr${time}`;
			if (count === num) {
				this.setVis(name, 'visible');
			} else {
				this.setVis(name, 'none');
			}
			count += 1;
		});
	}

	renderPoints(data, name) {
		const clusters = `clusters-${name}`;
		const clusterCount = `cluster-count-${name}`;
		const unclusteredPoint = `unclustered-point-${name}`;

		// console.log(clusters,clusterCount,unclusteredPoint);

		this.map.addSource(name, {
			type: 'geojson',
			data,
			cluster: true,
			clusterMaxZoom: 14, // Max zoom to cluster points on
			clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
		});

		this.map.addLayer({
			id: clusters,
			type: 'circle',
			source: name,
			filter: ['has', 'point_count'],
			layout: {},
			paint: {
				'circle-color': [
					'step',
					['get', 'point_count'],
					'#51bbd6',
					100,
					'#f1f075',
					750,
					'#f28cb1',
				],
				'circle-radius': [
					'step',
					['get', 'point_count'],
					20,
					100,
					30,
					750,
					40,
				],
			},
		});
		this.map.addLayer({
			id: clusterCount,
			type: 'symbol',
			source: name,
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12,
			},
		});

		this.map.addLayer({
			id: unclusteredPoint,
			type: 'circle',
			source: name,
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#11b4da',
				'circle-radius': 6,
				'circle-stroke-width': 2,
				'circle-stroke-color': '#fff',
			},
		});

		// // When the mouse leaves the state-fill layer, update the feature state of the
		// // previously hovered feature.
		this.map.on('mouseleave', clusters, () => {
			this.map.getCanvas().style.cursor = '';
		});

		this.map.on('click', clusters, (e) => {
			const features = this.map.queryRenderedFeatures(e.point, { layers: [clusters] });
			const clusterId = features[0].properties.cluster_id;
			this.map.getSource(name).getClusterExpansionZoom(clusterId, (err, zoom) => {
				if (err) { return; }
				this.map.easeTo({
					center: features[0].geometry.coordinates,
					zoom,
				});
			});
		});

		this.map.on('click', unclusteredPoint, (e) => {
			if (e.features.length > 0) {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.message;
				const food = e.features[0].properties.foods;


				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new mapboxgl.Popup()
					.setLngLat(coordinates)
					.setHTML(`<div class="container text-dark"><strong>Food related topic(s): ${food}</strong>`
                  + `<p>${description}</p></div>`)
					.addTo(this.map);
			}
		});

		this.map.on('mouseenter', clusters, () => {
			this.map.getCanvas().style.cursor = 'pointer';
		});
	}

	renderAllPoints() {
		let timeCount = 0;
		const data = {
			type: 'FeatureCollection',
			features: [],
		};
		this.props.data.allPoints.forEach((time) => {
			time.forEach((city) => {
				data.features = [...city.features, ...data.features];
			});

			this.renderPoints(data, `Twr${timePeriods[timeCount]}`);
			timeCount += 1;
		});
	}

	render() {
		return (
			// eslint-disable-next-line no-return-assign
			<div ref={(el) => this.mapContainer = el} className="absolute top right left bottom" />
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.data,
		feature: state.feature,
		map: state.map,
	};
}

export default connect(mapStateToProps, { changeFeature })(Map);
