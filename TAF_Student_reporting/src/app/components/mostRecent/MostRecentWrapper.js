import React, {
	PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import Collapsible from 'react-collapsible';
import RequirementsNotMet from './RequirementsNotMet';
import ScoreTable from './ScoreTable';
import TopicsGraph from './TopicsGraph';
import TestResult from './TestResult';

const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};

class MostRecentWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}


	render() {
		return (
			<div>
				<TestResult testName={this.props.rawData.testName} totalPass={this.props.totalPass} correctness={this.props.correctness} totalScore={this.props.totalScore} />

	          	<div className="row" >
		            <div className="col-md-12">
		            <Collapsible
		                open
		                trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i><span style={headingStyle} >Topics: </span> </div> </div>}
		            >
		            <div className="col-md-7 horizontalbar-div"  >
		              <TopicsGraph data={this.props.data}/>
		            </div>
		            <div className="col-md-4 horizontalbar-div">
		              <ScoreTable />
		            </div>

		            </Collapsible>
		          </div>
		        </div>
		      	<RequirementsNotMet requirementsNotMetObject={this.props.requirementsNotMetObject} />
			</div>
		);

	}
}
MostRecentWrapper.propTypes = {
  rawData: PropTypes.object,
  totalPass: PropTypes.number,
  correctness: PropTypes.array,
  totalScore: PropTypes.number,
  requirementsNotMetObject: PropTypes.object,
  data: PropTypes.object
};

export default MostRecentWrapper;
