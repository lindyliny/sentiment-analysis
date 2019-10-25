/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCenter } from '../actions';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toMel = () => {
			this.props.setCenter(0);
		};
		this.toSyd = () => {
			this.props.setCenter(1);
		};
		this.toPer = () => {
			this.props.setCenter(2);
		};
		this.toBri = () => {
			this.props.setCenter(3);
		};
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light" id="main-nav">
				<div className="container">
					<a href="/" className="navbar-brand">Sentiment-analysis</a>
					<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to="/"><div className="nav-link">Home</div></Link>
							</li>
							<li className="nav-item">
								<Link to="/charts"><div className="nav-link">Charts</div></Link>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
                  Maps
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link to="/map"><div className="dropdown-item" onClick={this.toMel}>Melbourne</div></Link>
									<Link to="/map"><div className="dropdown-item" onClick={this.toSyd}>Sydney</div></Link>
									<Link to="/map"><div className="dropdown-item" onClick={this.toPer}>Perth</div></Link>
									<Link to="/map"><div className="dropdown-item" onClick={this.toBri}>Brisbane</div></Link>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default connect(null, { setCenter })(Header);
