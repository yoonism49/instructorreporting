import React from 'react';
import PropTypes from 'prop-types';
import * as Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import ctPointLabels from './ChartistUtils.js';

const tableHeadFontStyle = {
  'fontWeight': 'bold'
}
const hrStyle = {
  'marginLeft' : '5px'
}
const graphLabelResults = {
  'marginLeft': '50%',
  'fontWeight': 'bold',
  'fontSize': '1.05em'
}

const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};

const graphLabelName = {
  'marginLeft' : '5px',
  'fontWeight' : 'bold',
  'fontSize' : '1.05em'
}
class TopicsGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        options : {
          fullWidth: true,
          chartPadding: {
          right: 50
        },
        seriesBarDistance: 0,
        reverseData: true,
        horizontalBars: true,
        axisX: {
          onlyInteger: true,
          high: 100,
          low: 0,
          labelInterpolationFnc: function(value,index) {
              // console.log(index);
              return value + '%';
          },
        },
        plugins: [ ctPointLabels()],

        height: '300px'
      }
    };
  }


  render() {
    return (
        <div>
              <span style={graphLabelName} > Name </span>
              <span style={graphLabelResults} >Results </span>
              <hr style={hrStyle} />
              <ChartistGraph className={'ct-octave'} 
                data={this.props.data} options={this.state.options} 
                type={'Bar'} redraw={'true'} responsive={'true'} 
              />
        </div>
      );
  }
}


TopicsGraph.propTypes = {
  name: PropTypes.string,
  result: PropTypes.string,
  data: PropTypes.object
}

TopicsGraph.defaultProps = {
    data: {
    labels: [],
    series: [[0,0,0,0,0,0]]
    } 
}

export default TopicsGraph;