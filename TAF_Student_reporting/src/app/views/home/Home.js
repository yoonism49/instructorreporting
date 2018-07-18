// flow weak

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
  TopicProgress,
  ClassTestLog,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo,
  ScoreTable,
  TopicsGraph,
  TestResult,
  RequirementsNotMet,
  MostRecentWrapper
}                         from '../../components';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import '../../style/chartist.css';
import HeatMap from 'react-heatmap-grid';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Collapsible from 'react-collapsible';
import axios from 'axios';
import * as Chartist from 'chartist';
import ctPointLabels from './ChartistUtils.js';
import {Link} from 'react-router-dom';

// import '../../../style.css';
import './home.scss';

export function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}
export function randomData(N, max, long){
  return (
  Array.apply(null, Array(N || 3))
    .map(function(v){
      return {
        v: Math.floor(Math.random() * (max || 20)) + 1,
        label: long ? faker.name.findName() : faker.name.firstName()
      }
    })
  )
}
var formatter = function (value){
  return frmttr()(value).regular
}
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
function generateRandomValues(count, date = new Date()) {
    return getRange(count).map((index) => {
      return {
        date: shiftDate(date, index),
        count: getRandomInt(1, 4),
      };
    })
}

const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};

const tableHeadFontStyle = {
  'fontWeight': 'bold'
}

const graphLabelName = {
  'marginLeft' : '5px',
  'fontWeight' : 'bold',
  'fontSize' : '1.05em'
}

const titleStyle = {
  'fontWeight' : 'bold'
}

const graphLabelResults = {
  'marginLeft': '50%',
  'fontWeight': 'bold',
  'fontSize': '1.05em'

}

const hrStyle = {
  'marginLeft' : '5px'
}

class Home extends React.Component {

  static propTypes = {
    earningGraphLabels:   PropTypes.array,
    earningGraphDatasets: PropTypes.array,
    teamMatesIsFetching:  PropTypes.bool,
    teamMates:            PropTypes.arrayOf(
      PropTypes.shape({
        picture:      PropTypes.string,
        firstname:    PropTypes.string,
        lastname:     PropTypes.string,
        profile:      PropTypes.string,
        profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success'])
      })
    ),
    userTestInfos: PropTypes.object,
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchEarningGraphDataIfNeeded:  PropTypes.func,
      fetchTeamMatesDataIfNeeded:     PropTypes.func,
      fetchUserTestInfoDataIfNeeded:      PropTypes.func
    })
  };

  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.customTitleForValue = this.customTitleForValue.bind(this);
    this.openNewTab = this.openNewTab.bind(this);

    this.state = {
        rawData:[],
        key: 1,
        data: {
          labels: [],
          series: [[0,0,0,0,0,0]]
        },
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
      },
      tabs: []
    };


  }
  componentWillMount() {
    const { actions: { enterHome } } = this.props;
    enterHome();
  }



  componentWillReceiveProps(nextProps) {
    if(nextProps.answersList) {
      this.setState({rawData: nextProps.answersList});
    }
  }

  componentDidMount() {
    const {
      actions: {
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
        fetchStudentTestAnswers
      }
    } = this.props;

    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
    console.log("RESYLKTS IUD", window.location.search.split('=')[1]);
    console.log(window.location);
    // fetchStudentTestAnswers('5b2001254e342d20e3dcb3c7','5b4cf0e8312e1dafc4ee37d6');
    fetchStudentTestAnswers(window.location.search.split('=')[1]);

    // fetchStudentTestAnswers('5b2001254e342d20e3dcb3c7',localStorage.getItem('resultsId'));
  }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }
  componentDidUpdate() {

  }
  reloadHeat(index) {
      this.setState({heatData:null,mod:index});
  }

  handleSelect(key) {
    const data = this.state.data;
    const options = this.state.options;
    this.setState({ key, data, options });

  }
  resize = () => this.forceUpdate();
  customTitleForValue(value) {
    return value ? `You're hovering over ${value.date.toDateString()} with value ${value.count}` : null;
  }

  openNewTab(testname) {
    this.setState(prevState => ({
      tabs: [...prevState.tabs, {id: Math.random()}]
    }));
  }
  
  render() {

    //console.log('params', this.props.match.params.id);
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
      userTestInfos
    } = this.props;
    const {rawData} = this.state;

    if(rawData === undefined || rawData.length === 0) {
      return (<div>
                <center><h3><em>Loading Results.....</em></h3></center>
               </div>);
    }

    let correctness = [];
    let topicsScore = [];
    let topicsScoreP = [];
    let topicValue = [];
    let topicsIndex=0;
    let totalPass=0;
    let topicLabel = [];

    console.log('rawData', rawData);
    console.log(Object.keys(rawData));

    if(Object.keys(rawData['questionResponses']).length > 0) {
      for(let key in rawData['questionResponses']) {

          if(rawData['questionResponses'][key].pass === true) {
            correctness[key] = true;
            totalPass++;
          }else {
            correctness[key] = false;
          }

          if(topicValue[rawData['questionResponses'][key].topicName] === undefined){
            topicValue[rawData['questionResponses'][key].topicName] = 1;
          } else {
            topicValue[rawData['questionResponses'][key].topicName] +=1;
          }

          if(correctness[key] === true) {
            if(topicsScoreP[rawData['questionResponses'][key].topicName] === undefined) {
              topicsScoreP[rawData['questionResponses'][key].topicName]=1;
            }else {
              topicsScoreP[rawData['questionResponses'][key].topicName] +=1;
            }
          }
      }
    }

    for(let key in topicValue) {
      if(!(key in topicsScoreP)){
        topicsScoreP[key]=0;   //this is for topics that might have zero score
      }
    }

    console.log('topicValue asjdhoasdho', topicValue);
    console.log('topicsScoreP',topicsScoreP);

    console.log('RESUTLS ID IN RENDER', localStorage.getItem('resultsId'));
    // localStorage.removeItem('resultsId');
    console.log('RESUTLS ID IN RENDER', localStorage.getItem('resultsId'));


    for(let key in topicsScoreP) {
      console.log(key);
      console.log(100*(topicsScoreP[key]/topicValue[key]));
      topicValue.push(100*(topicsScoreP[key]/topicValue[key]));
      topicLabel.push(key);
    }

    // let topicWiseScorePercentage = new Array(Object.keys(topicValue).length);
    // for(const key in topicValue)
    //   topicWiseScorePercentage.push(topicValue[key]);
    //
    // console.log(topicWiseScorePercentage)

    this.state.data.series[0]=topicValue;
    this.state.data.labels=topicLabel;

    // console.log('topicValue', topicValue);
    // console.log('topicLabel', topicLabel);

    let totalScore = correctness.length>1 ? Math.round(100*totalPass/correctness.length,1):0;

    let requirementsNotMetObject = {
      'Major' : [],
      'Minor' : [],
      'Critical' : []
    };

    for(let i=0; i<topicValue.length; i++) {
        if(topicValue[i] <= 30) {
          requirementsNotMetObject['Major'].push(' ' + topicLabel[i]);
        } else if(topicValue[i] >30 && topicValue[i] <=60) {
          requirementsNotMetObject['Minor'].push(' ' + topicLabel[i]);
        }
    }

    const tableHeadersMostRecent = ['Class Avg', '#Questions', '#Points', 'Weight'];
    const tableContentMostRecent = [
      ['2','3','4','4'],
      ['2','3','4','4'],
      ['2','3','4','4'],
      ['2','3','4','4'],
      ['2','3','4','4'],
      ['2','3','4','4']
    ];

    const tableheaders = ['Test Name', 'Date Completed', 'Attempt', 'Total Score', 'Result'];
    const tablecontent = [
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL', '' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ],
      ['FC-Module 02', '2017/11/20', '4', '0', 'FAIL' ]
    ];

    return(
      <AnimatedView>
       <Tabs>
    <TabList>
      <Tab>Most Recent</Tab>
      <Tab>Test History</Tab>
          {this.state.tabs.map(tab => (
                <Tab>Fc Module 02
                </Tab>
          ))}
    </TabList>
    <TabPanel title="Most Recent">
           <MostRecentWrapper rawData={rawData} totalPass={totalPass} correctness={correctness} 
           totalScore={totalScore} requirementsNotMetObject={requirementsNotMetObject}
           data={this.state.data}
           />
    </TabPanel>

         <TabPanel title="Test History">


          {/* WORK PROGRESS TAG MODIFICATION TO SHOW THE TABLE   <WorkProgress headers={tableheaders} content={tablecontent}  /> */}

          <Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i><span style={headingStyle} >Test Log: </span></div></div>}>
            <div className="col-md-12">
              <div className="panel-body table-responsive test-log-student">

                <table className="table table-hover">
                  <thead>
                    <tr>

                      <td style={tableHeadFontStyle} >Test Name</td>
                      <td style={tableHeadFontStyle} >Date Completed</td>
                      <td style={tableHeadFontStyle} >Attempt &nbsp; #</td>
                      <td style={tableHeadFontStyle} >Total Score</td>
                      <td style={tableHeadFontStyle} >Result</td>
                      <td style={tableHeadFontStyle}></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td><td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td><td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                    <tr>

                      <td className="text-align-left">FC - Module 02</td>
                      <td className="text-align-left" className="text-align-left">11/20/2014</td>
                      <td className="text-align-right">4</td>
                      <td className="text-align-right">0</td>
                      <td className="text-align-left">FAIL</td>
                      <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab}>More</div></td>
                    </tr>
                  </tbody>
              </table>
              </div>
            </div>
          </Collapsible>

       </TabPanel>
              {this.state.tabs.map((tab,index) => (
                  <TabPanel title="Fc Module 02" key={index}>
                     <MostRecentWrapper rawData={rawData} totalPass={totalPass} correctness={correctness} 
                       totalScore={totalScore} requirementsNotMetObject={requirementsNotMetObject}
                       data={this.state.data}
                     />
                  </TabPanel>
              ))}
        </Tabs>
      </AnimatedView>
    );
  }
}

export default Home;
