import React from 'react';
import PropTypes from 'prop-types';
const tableHeadFontStyle = {
  'fontWeight': 'bold'
}
class TestResult extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
          <div
            className="row"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test Results:</h2>
            <div className="col-md-3 topcard-left">
              <div className="sm-st-info"><div>Test Name</div><span className="testname"><center>{this.props.testName}</center></span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Score</div><span className="right-align-3">{this.props.totalPass}/{this.props.correctness.length}</span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div >Test %</div><span className="right-align-4">{this.props.totalScore} %</span></div>
            </div>
               <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Result</div><span className="right-align-3">{this.props.totalScore>60?'PASS':'FAIL'}</span></div>
            </div>
               <div className="col-md-2 topcard-right">
               <div className="sm-st-info"><div>Class Rank</div><span className="right-align-3">2/15</span></div>
            </div>

        </div>
      );
  }
}






TestResult.propTypes = {
  testName: PropTypes.string,
  totalPass: PropTypes.number,
  correctness: PropTypes.array,
  totalScore: PropTypes.number,
  rank: PropTypes.number,
  total: PropTypes.number
};

export default TestResult;