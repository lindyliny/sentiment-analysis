import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import homeBg from '../../img/home-bg.jpg';
import './style.css';

// Home page component
class Home extends React.Component {
	// render
	render() {
		return (
			<div>
				<Header />
				<header id="home-section" style={{ backgroundImage: `url(${homeBg})` }}>
					<div className="dark-overlay">
						<div className="home-inner container">
							<div className="jumbotron text-white bg-transparent text-center">
								<h1 className="display-2">Real Sentiment Analysis Website</h1>
								<p className="lead">We apply a website to analysis sentiments of tweets in different cities in Australia.</p>
								<p />
								<p className="lead">
									<Link to="/map">
										<button type="button" className="btn btn-primary btn-lg">Learn more</button>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}


export default connect(null, null)(Home);
