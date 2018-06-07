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
import Collapsible from 'react-collapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}
export function randomData(N, max, long){
  return (
  Array.apply(null, Array(N || 5))
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
        date: shiftDate(date, -index),
        count: getRandomInt(1, 150),
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
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchEarningGraphDataIfNeeded:  PropTypes.func,
      fetchTeamMatesDataIfNeeded:     PropTypes.func
    })
  }; 
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.customTitleForValue = this.customTitleForValue.bind(this);

    this.state = {
      key: 1,
      heatData:null,
      data: {
      labels: ['Topic 9', 'Topic 7', 'Topic 4', 'Topic 1'],
      series: [
        [-12, -10, -7, -5],
        [3, 5, 8, 10]
      ]
      },
      options : {
        seriesBarDistance: 0,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
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
  }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }
  componentDidUpdate() {
  }
  handleSelect(key) {
    const data = this.state.data;
    const options = this.state.options;
    this.setState({ key, data, options });
    document.querySelector('.ct-chart').__chartist__.update();
  }
  reloadHeat() {
      this.setState({heatData:null});
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
      earningGraphDatasets
    } = this.props;
    
    const randomValues = generateRandomValues(2000);
    const xLabels = new Array(44).fill(0).map((_, i) => `Topic ${i}`);
    const yLabels = ['Class 9', 'Class 10', 'Class 13', 'Class 5', 'Class 6', 'Class 7', 'Class 3', 'Class 2', 'Class 8', 'Class 11'];
    const data = new Array(yLabels.length)
      .fill(0)
      .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
    
    return(
      <AnimatedView>
       <Tabs>
    <TabList>
      <Tab>Most Recent</Tab>
      <Tab>Test History</Tab>
    </TabList>

        <TabPanel title="Most Recent">
          <div
            className="row"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test Results:</h2>
            <div className="col-md-2 topcard-left">
             <div className="sm-st-info"><div>Class Name</div><span className="right-align-1">Class 3</span></div>
            </div>
            <div className="col-md-3 topcard">
              <div className="sm-st-info"><div>Test Name</div><span className="right-align-2">FC - Module 06</span></div>
            </div>
            <div className="col-md-1 topcard">
               <div className="sm-st-info"><div>Date Completed</div><span className="right-align-3">2018/04/11</span></div>
            </div>
            <div className="col-md-1 topcard">
               <div className="sm-st-info"><div># Finished</div><span className="right-align-4">10</span></div>
            </div>
               <div className="col-md-1 topcard">
               <div className="sm-st-info"><div># Incomplete</div><span className="right-align-5">4</span></div>
            </div>
               <div className="col-md-1 topcard">
               <div className="sm-st-info"><div># Not Start</div><span className="right-align-6">1</span></div>
            </div>
               <div className="col-md-1 topcard">
               <div className="sm-st-info"><div>Average %</div><span className="right-align-7">50%</span></div>
            </div>
               <div className="col-md-1 topcard-right">
               <div className="sm-st-info"><div>Pass %</div><span className="right-align-8">53%</span></div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 horizontalbar-div">
             <ChartistGraph className={'ct-octave'} data={this.state.data} options={this.state.options} type={'Bar'} redraw={'true'} responsive={'true'}/>
              
        
            </div>
            
          </div>

          <div className="row">
            <div className="col-md-12">
               <Collapsible trigger="Trainee">
               <div className="Trainee">
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
        </div>
      </Collapsible>
       <Collapsible trigger="Requirements Not Met">
      </Collapsible>      
      <Collapsible trigger="Class Test History">
             <WorkProgress />
      </Collapsible>
            </div>
     
            {/*  
              <div className="col-md-4">
              <TwitterFeed />
            </div>
            */}
          </div>
 {/*  
          <div className="row">
            <div className="col-md-5">
              <TeamMatesDemo
                isFetching={teamMatesIsFetching}
                members={teamMates}
              />
            </div>
            <div className="col-md-7">
              <TodoListDemo />
            </div>
          </div>*/}
        </TabPanel>
        <TabPanel title="Test History">
        <div className="horiz-scroll-module">
 <div
            className=" col-md-12 row horiz-model-inside"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test History:</h2>
           <div className="topmodule-left">
               <div className="sm-st-info"onClick = {this.reloadHeat.bind(this)} ><span>Module 01</span></div>
            </div>
            <div className="topmodule">
               <div className="sm-st-info"onClick = {this.reloadHeat.bind(this)} ><span>Module 02</span></div>
            </div>
             <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 03</span></div>
            </div>
            <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 04</span></div>
            </div>
             <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 05</span></div>
            </div>
            <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 06</span></div>
            </div>
             <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 07</span></div>
            </div>
            <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 08</span></div>
            </div>
             <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 09</span></div>
            </div>
            <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)}><span>Module 10</span></div>
            </div>
             <div className="topmodule">
               <div className="sm-st-info" onClick = {this.reloadHeat.bind(this)} ><span>Module 11</span></div>
            </div>
           </div>
          </div>

          <div className="row">
            <div className="col-md-12">
            <div className="horiz-scroll">
             <div className="heatmap-div">
        <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              data={data}
              background={'green'}
            />
            </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
             <div className="heatmap-div-table">
              <WorkProgress />
            </div>
            </div>

          </div>

        </TabPanel>
        </Tabs>
      </AnimatedView>
    );
  }
}

export default Home;
