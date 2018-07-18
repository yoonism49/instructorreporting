import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};

class RequirementsNotMet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		      <div className="row">
		            <div className="col-md-12">
		              <Collapsible
		                  open
		                  trigger={<div className='collapsible-icon-second'><div  className='bycollapse-title'>
		                  <i className='fa fa-caret-right-collpase'></i> <span style={headingStyle} > Requirements Not Met: </span></div> </div>}
		              >
		                <div className="collapsible-paragraph ">
		                    {/*rows*/}
		                     <p><span className="topicTitle"><h4><strong>Needs Major Remediation:</strong></h4></span></p>
		                     <p><span className="topicDescription" style={{'marginLeft':'3em'}}>{this.props.requirementsNotMetObject['Major'].length > 0 ? '-' + this.props.requirementsNotMetObject['Major'] : null }</span></p>
		                     <p><span className="topicTitle"><h4><strong>Needs Minor Remediation:</strong></h4></span></p>
		                     <p><span className="topicDescription" style={{'marginLeft':'3em'}}> {this.props.requirementsNotMetObject['Minor'].length > 0 ? '-' + this.props.requirementsNotMetObject['Minor'] : null }</span></p>
		                     <p><span className="topicTitle"><h4><strong>Critical Question Errors:</strong></h4></span></p>
		                     <p><span className="topicDescription" style={{'marginLeft':'3em'}}>{this.props.requirementsNotMetObject['Critical'].length > 0 ? '-' + this.props.requirementsNotMetObject['Critical'] : null }</span></p>
		                </div>
		              </Collapsible>
		            </div>
		      </div>
		);
	}

}



RequirementsNotMet.propTypes = {
	requirementsNotMetObject: PropTypes.object
};
RequirementsNotMet.defaultProps = {
	requirementsNotMetObject: {
      'Major' : [],
      'Minor' : [],
      'Critical' : []
    }
}

export default RequirementsNotMet;

/*

			 <p><span>Topic 01</span></p>
			 <p><span className="topicTitle">Major Requirements(11)</span></p>
			 <p><span className="topicDescription">Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Minor Requirements(8)</span></p>
			 <p><span className="topicDescription">Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Critical Errors(1)</span></p>
			 <p><span className="topicDescription">Timmothy Alberton</span></p>
			 <p><span>Topic 02</span></p>
			 <p><span className="topicTitle">Major Requirements(11)</span></p>
			 <p><span className="topicDescription">Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Minor Requirements(8)</span></p>
			 <p><span className="topicDescription">Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Critical Errors(1)</span></p>
			 <p><span className="topicDescription">Timmothy Alberton</span></p>
			 */