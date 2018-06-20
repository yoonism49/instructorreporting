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
  TeamMatesDemo
}                         from '../../components';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import '../../style/chartist.css';
import HeatMap from 'react-heatmap-grid';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Collapsible from 'react-collapsible';
import axios from 'axios';

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
    userTestInfos: PropTypes.array,
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

    this.state = {
      rawData:[],
      key: 1,
      data: {
      labels: [],
      series: [[0,0,0,0,0,0]]
      },
      options : {
        seriesBarDistance: 0,
        reverseData: true,
        horizontalBars: true,
       axisX: {
    onlyInteger: true,
    labelInterpolationFnc: function(value) {
      return value + '%';
    },

  },
        height: '350px'
      }
    };
  }
  componentWillMount() {
    const { actions: { enterHome } } = this.props;
    enterHome();
  }

  componentDidMount() {
    const {
      actions: {
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded
      }
    } = this.props;

    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
    const url = `http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080/student/fetchStudentAnswers?user_id=5b2001254e342d20e3dcb3c7`;
    console.log('axios');
    axios.get(url)
      .then(res => {
        this.setState({rawData:res.data });
      });
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
  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
      userTestInfos
    } = this.props;
    const {rawData} = this.state;
    let correctness = [];
    let topicsScore = [];
    let topicsScoreP = [];
    let topicValue = [];
    let topicsIndex=0;
    let totalPass=0;
    let topicLabel = [];
    console.log('userTestInfos' + userTestInfos);
    if(Object.keys(this.state.rawData).length>0) {
      for(let i=0;i<Object.keys(this.state.rawData).length;i++) {
        if(this.state.rawData[i][0][0]===this.state.rawData[i][1]) {
          correctness[i]=true;
          totalPass++;
        }
        else 
          correctness[i]=false; 
        if(topicValue[this.state.rawData[i][3]]===undefined)
          topicValue[this.state.rawData[i][3]]=0;
        topicValue[this.state.rawData[i][3]]++;

        if(correctness[i]) {
          if(topicsScoreP[this.state.rawData[i][3]]===undefined) {
            topicsScoreP[this.state.rawData[i][3]]=0;
          }
          topicsScoreP[this.state.rawData[i][3]]++;
        }
      }

    }

    for(let i=0;i<topicsScoreP.length;i++) {
      topicValue[i]=100*(topicsScoreP[i]/topicValue[i]);
      topicLabel[i]='Topic '+i;
    }
    console.log('topicsScore' + topicsScoreP);
    //if(topicsScore.length>0)
    this.state.data.series[0]=topicValue.sort();
     this.state.data.labels=topicLabel;
    console.log('this.state.data.series'+ this.state.data.series);
    const randomValues = generateRandomValues(5);
    const xLabels = new Array(44).fill(0).map((_, i) => `Topic ${i}`);
    const yLabels = ['Me', 'Group'];
    const data = new Array(yLabels.length)
      .fill(0)
      .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
    let totalScore = correctness.length>1 ?Math.round(100*totalPass/correctness.length,1):0;
    let rows = [];
    let majorString='';
    
    let j = 0;
    let topics='';
    let topicsTitle='';
    for (let i = 0; i < topicValue.length; i++) {
        if(topicValue[i]<30)
        {  
          if(topicLabel[i] !== undefined) {
            if(majorString.length===0) {
              topicsTitle = 'Needs Major Remediation:';
            }
          
            topics += topicLabel[i];
            if(i<topicValue.length-2) {
              topics += ', ';
            }
          }

        }
    }
    rows.push(<div><h4>{topicsTitle}</h4></div>);
    rows.push(<div><br/>{topics}</div>);
    topicsTitle='';
    topics='';
    for (let i = 0; i < topicValue.length; i++) {
        if(topicValue[i]>30&&topicValue[i]<60)
        {  
          if(majorString.length===0) {
            topicsTitle = 'Needs Minor Remediation:';
          }
          topics += topicLabel[i];
          if(i+1<topicValue.length) {
            topics += ', ';
          }

        }
    }
    rows.push(<div><h4>{topicsTitle}</h4></div>);
    rows.push(<div><br/>{topics}</div>);
    console.log('rows'+rows);
    return(
      <AnimatedView>
       <Tabs>
    <TabList>
      <Tab>Most Recent</Tab>
      <Tab>Test History</Tab>
    </TabList>
    <TabPanel>
          <div
            className="row"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test Results:</h2>
            <div className="col-md-3 topcard-left">
              <div className="sm-st-info"><div>Test Name</div><span className="testname">FC - Module 06</span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Score</div><span className="right-align-3">{totalPass}/{correctness.length}</span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test %</div><span className="right-align-4">{totalScore} %</span></div>
            </div>
               <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Result</div><span className="right-align-3">{totalScore>60?'PASS':'FAIL'}</span></div>
            </div>
               <div className="col-md-2 topcard-right">
               <div className="sm-st-info"><div>Class Rank</div><span className="right-align-3">2/15</span></div>
            </div>
           
          </div>

          <div className="collapsible-row">
               <Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i>Topics</div> </div>}>
       
            <div className="col-md-7 horizontalbar-div">
       
              <ChartistGraph className={'ct-octave'} data={this.state.data} options={this.state.options} type={'Bar'} redraw={'true'} responsive={'true'}/>
       
            </div>
            <div className="col-md-4 horizontalbar-div">
            <table class="table table-hover table-topic"><thead><tr><td>Class Avg</td><td># Questions</td><td># Points</td><td>Weight</td></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr><tr><td>2</td><td>3</td><td>4</td><td>4</td></tr></tbody></table>


            </div>
            </Collapsible>      
      
          </div>

      <div className="row collapsible-row">
            <div className="col-md-12">

      
       <Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i>Requirements Not Met</div> </div>}>
       <div className="collapsible-paragraph">
       {rows}
       </div>
      </Collapsible>      
            </div>
      </div>

         </TabPanel>
         <TabPanel title="Test History">
         <div className="horiz-scroll-module">
 <div
            className=" col-md-12 row horiz-model-inside"
            className="row horiz-model-inside"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test History:</h2>
           <div className={this.state.mod==='1'?'col-md-1 topmodule-left':this.state.mod===undefined?'col-md-1 topmodule-left':'col-md-1 topmodule-first'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this, '1')}><span>Module 01</span></div>
            </div>
            <div className={this.state.mod==='2'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'2')}><span>Module 02</span></div>
            </div>
             <div className={this.state.mod==='3'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'3')}><span>Module 03</span></div>
            </div>
            <div className={this.state.mod==='4'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'4')}><span>Module 04</span></div>
            </div>
             <div className={this.state.mod==='5'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'5')}><span>Module 05</span></div>
            </div>
            <div className={this.state.mod==='6'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'6')}><span>Module 06</span></div>
            </div>
             <div className={this.state.mod==='7'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'7')}><span>Module 07</span></div>
            </div>
            <div className={this.state.mod==='8'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'8')}><span>Module 08</span></div>
            </div>
             <div className={this.state.mod==='9'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'9')}><span>Module 09</span></div>
            </div>
            <div className={this.state.mod==='10'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'10')}><span>Module 10</span></div>
            </div>
             <div className={this.state.mod==='11'?'col-md-1 topmodule-left-orange':'col-md-1 topmodule'}>
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this,'11')}><span>Module 11</span></div>
            </div>
            </div>
           
          </div>

           <div className="collapsible-row-log ">
               <Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i>Topics</div> </div>}>
       
            <div className="col-md-12">
              <div className="panel-body table-responsive test-log-student">
              <h3 className="panel-heading">Test Log</h3>
<table className="table table-hover"><thead><tr><td>Class</td><td>Test Name</td><td>Date Completed</td><td>Attempts</td><td>Total Score</td><td>Result</td><td></td></tr></thead><tbody><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr><tr><td className="text-align-left">Class 3</td><td className="text-align-left">FC - Module 02</td><td className="text-align-left" className="text-align-left">11/20/2014</td><td className="text-align-right">4</td><td className="text-align-right">0</td><td className="text-align-left">Fail</td><td className="text-align-left"><div id="sm-st-info-button">More</div></td></tr></tbody></table></div>
            
            </div>
            </Collapsible>
          </div>
       </TabPanel>
        </Tabs>
      </AnimatedView>
    );
  }
}

export default Home;
