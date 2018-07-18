import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';


class RequirementsNotMet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (

			 	<ul className="requirements-list">
			 		<li ><b>Overview </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation(11) </li>
	  			 			<ul>
	  			 				Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
	  			 			</ul>
				 		<li>- Needs Minor Remediation(8) </li>
				 			<ul>
				 				Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
				 			</ul>
						<li style={{color:'red'}}>- Critical Question Errors(1)</li>
							<ul>
								Timmothy Alberton
							</ul>
			 		</ul>
			 		<li ><b>Topic 02 </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation(11) </li>
	  			 			<ul>
	  			 				Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
	  			 			</ul>
				 		<li>- Needs Minor Remediation(8) </li>
				 			<ul>
				 				Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
				 			</ul>
						<li style={{color:'red'}}>- Critical Question Errors(1)</li>
							<ul>
								Timmothy Alberton
							</ul>
			 		</ul>
			 	</ul>
		);
	}

}



RequirementsNotMet.propTypes = {
	byTopic: PropTypes.bool,
	dataByTopic: PropTypes.arrayOf(
		PropTypes.shape({
			topic: PropTypes.string,
			major: PropTypes.arrayOf(PropTypes.string),
			minor: PropTypes.arrayOf(PropTypes.string),
			critical: PropTypes.arrayOf(PropTypes.string)
		})
	) 
};

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