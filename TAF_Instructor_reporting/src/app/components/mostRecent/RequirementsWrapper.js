import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import RequirementsNotMet from './RequirementsNotMet'
import TraineeNotMet from './TraineeNotMet'


class RequirementsWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			byTopic: true
		};
		this.clickFunction = this.clickFunction.bind(this);
	}


	render() {
		if(this.state.byTopic === true) {
			return (

				<Collapsible trigger={
							<div className='collapsible-icon-second'>
								<div className='bycollapse-title'>
									<i className='fa fa-caret-right-collpase'></i>Requirements Not Met
								</div>
							</div>}>
				<div style={{'marginLeft' : '50px'}}>
					<div className='bycollapse-button' onClick={this.clickFunction} ><span>By Topic</span></div>
					<div className='bycollapse-button-trainee' onClick={this.clickFunction}><span>By Trainee</span></div>
				</div>
				<div className="collapsible-paragraph">
				 	<RequirementsNotMet />
				</div>
				</Collapsible>
			);
		}
		else {
			return (
				<Collapsible trigger={
							<div className='collapsible-icon-second'>
								<div className='bycollapse-title'>
									<i className='fa fa-caret-right-collpase'></i>Requirements Not Met
								</div>
							</div>}>
				<div style={{'marginLeft' : '50px'}}>
					<div className='bycollapse-button-trainee' onClick={this.clickFunction} ><span>By Topic</span></div>
					<div className='bycollapse-button' onClick={this.clickFunction}><span>By Trainee</span></div>
				</div>
				<div className="collapsible-paragraph">
				 	<TraineeNotMet />
				</div>
				</Collapsible>
				);
		}

	}

	clickFunction() {
		this.setState({
			byTopic: !this.state.byTopic
		});
	}
}


export default RequirementsWrapper;
