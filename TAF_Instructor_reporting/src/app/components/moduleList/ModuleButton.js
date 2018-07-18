import React      from 'react';
import PropTypes  from 'prop-types';

class ModuleButton extends React.Component {

	constructor(props) {
		super(props);
		this.clickFunction = this.clickFunction.bind(this);

	}

	render() {
		return (
		<div className="topmodule" style={{backgroundColor: this.props.currentModule === this.props.name ? '#427d90' : 'gray'}} >
			 <div className="sm-st-info" onClick = 
			 {this.clickFunction} >
			 	<span>{this.props.name}</span>
			 </div>
		</div>
		);
	}

	clickFunction() {
		this.props.selectModule(this.props.name);
	}

}



ModuleButton.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	currentModule: PropTypes.string,
	selectModule: PropTypes.func
};

export default ModuleButton;