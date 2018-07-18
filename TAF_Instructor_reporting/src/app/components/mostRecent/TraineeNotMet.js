import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';


class TraineeNotMet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (

			 	<ul className="requirements-list">
			 		<li ><b>Sailor A:</b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Requirements(2) </li>
	  			 			<ul>
	  			 				Topic 1, Topic 2
	  			 			</ul>
				 		<li>- Minor Requirements(3) </li>
				 			<ul>
				 				Topic 4, Topic 8, Topic 9
				 			</ul>
						<li style={{color:'red'}}>- Critical Errors(3)</li>
							<ul>
								Topic 3 - Question 2, Topic 4 - Question 3, Question 4
							</ul>
			 		</ul>
			 		<li ><b>Sailor B:</b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Requirements(2) </li>
	  			 			<ul>
	  			 				Topic 1, Topic 2
	  			 			</ul>
				 		<li>- Minor Requirements(3) </li>
				 			<ul>
				 				Topic 4, Topic 8, Topic 9
				 			</ul>
						<li style={{color:'red'}}>- Critical Errors(3)</li>
							<ul>
								Topic 3 - Question 2, Topic 4 - Question 3, Question 4
							</ul>
			 		</ul>
			 	</ul>
		);
	}

}



TraineeNotMet.propTypes = {
	dataByTopic: PropTypes.arrayOf(
		PropTypes.shape({
			topic: PropTypes.string,
			major: PropTypes.arrayOf(PropTypes.string),
			minor: PropTypes.arrayOf(PropTypes.string),
			critical: PropTypes.arrayOf(PropTypes.string)
		})
	) 
};

export default TraineeNotMet;

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