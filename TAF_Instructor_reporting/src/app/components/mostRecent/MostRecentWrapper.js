import React, {
	PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
	AnimatedView,
	StatsCard,
	EarningGraph,
	Notifications,
	WorkProgress,
	ClassTestLog,
	ModuleList,
	RequirementsWrapper,
} from '../../components';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import '../../style/chartist.css';
import HeatMap from 'react-heatmap-grid';
import $ from 'jquery';
import Collapsible from 'react-collapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class MostRecentWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			key: 1,
			heatData:null,
			data: {
				labels: ['Topic 9', 'Topic 7', 'Topic 4', 'Topic 1'],
				series: [
					[-12, -10, -7, -5],
					[3, 5, 8, 10]
				]
			},
			options : {
				seriesBarDistance: 0,
				reverseData: true,
				horizontalBars: true,
				axisX: {
				 offset: 70,
				 onlyInteger: true,
				labelInterpolationFnc: function(value) {
					return Math.abs(value) ;
					}
				},
				height: '350px'
			}
		};
	}


	render() {
		return (
			<div>
					<div
						className="row"
						style={{marginBottom: '5px'}}>
					
						<h2 className="testhistory-title">Test Results:</h2>
						<div className="col-md-2 topcard-left">
						 <div className="sm-st-info"><div>Class Name</div><span className="testname">Class 3</span></div>
						</div>
						<div className="col-md-3 topcard">
							<div className="sm-st-info"><div>Test Name</div><span className="right-align-2">FC - Module 06</span></div>
						</div>
						<div className="col-md-1 topcard">
							 <div className="sm-st-info"><div>Date Completed</div><span className="right-align-3">04/11/2018</span></div>
						</div>
						<div className="col-md-1 topcard">
							 <div className="sm-st-info"><div># Finished</div><span className="right-align-4">10</span></div>
						</div>
							 <div className="col-md-1 topcard">
							 <div className="sm-st-info"><div># Incomplete</div><span className="right-align-5">4</span></div>
						</div>
							 <div className="col-md-1 topcard">
							 <div className="sm-st-info"><div># Not Start</div><span className="right-align-6">1</span></div>
						</div>
							 <div className="col-md-1 topcard">
							 <div className="sm-st-info"><div>Average %</div><span className="right-align-7">50%</span></div>
						</div>
							 <div className="col-md-1 topcard-right">
							 <div className="sm-st-info"><div>Pass %</div><span className="right-align-8">53%</span></div>
						</div>
					</div>

					<div className="row">
					<Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i>Topics</div> </div>}>
			 
						<div className="col-md-10 horizontalbar-div">
						 <ChartistGraph className={'ct-octave'} data={this.state.data} options={this.state.options} type={'Bar'} redraw={'true'} responsive={'true'}/>
					 
					
						</div>
					</Collapsible>     
					</div>

					<div className="row collapsible-row">
						<div className="col-md-12">
							<Collapsible trigger={<span className='collapsible-icon'><i className='fa fa-caret-right-collpase'></i>Trainee</span>}>
							<div className="collapsible-paragraph">
								 <WorkProgress />
							</div>
							</Collapsible>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
							<RequirementsWrapper />
						</div>     
					</div>
			</div>
		);

	}
}


export default MostRecentWrapper;
