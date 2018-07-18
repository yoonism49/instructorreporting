import React from 'react';
import PropTypes from 'prop-types';
const tableHeadFontStyle = {
  'fontWeight': 'bold'
}
class ScoreTable extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
              <table className="table table-hover table-topic">
                <thead>
                  <tr>
                    <td><span style={tableHeadFontStyle}>Class Avg</span></td>
                    <td><span style={tableHeadFontStyle}># Questions</span></td>
                    <td><span style={tableHeadFontStyle}># Points</span></td>
                    <td><span style={tableHeadFontStyle}>Weight</span></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                  </tr>
                </tbody>
            </table>
      );
  }
}






ScoreTable.propTypes = {
    scoreData: PropTypes.arrayOf(
    PropTypes.shape({
      classAverage: PropTypes.number,
      questions: PropTypes.number,
      points: PropTypes.number,
      weight: PropTypes.number
    })
  )
};

export default ScoreTable;