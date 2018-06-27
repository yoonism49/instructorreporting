// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';
import Highlight          from 'react-highlight';


class WorkProgress extends PureComponent {

  state = {
    headers: ['Trainee Name', 'Time Started', 'Time Completed', '# Attempts', 'Total Score', 'Result', 'Topic 1', 'Topic 4','Topic 7'],
    content: [
      [ 'Sailor A', '10:00 - 10/10/2014', '11:00 - 10/10/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor B', '10:00 - 10/12/2014', '11:00 - 10/12/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor C', '10:00 - 10/13/2014', '11:00 - 10/13/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor D', '10:00 - 10/15/2014', '11:00 - 10/15/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor E', '10:00 - 10/16/2014', '11:00 - 10/16/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor F', '10:00 - 10/17/2014', '11:00 - 10/17/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor G', '10:00 - 10/18/2014', '11:00 - 10/18/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor H', '10:00 - 10/19/2014', '11:00 - 10/19/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor I', '10:00 - 10/20/2014', '11:00 - 10/20/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor J', '10:00 - 10/21/2014', '11:00 - 10/21/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor K', '10:00 - 10/23/2014', '11:00 - 10/23/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)'],
      [ 'Sailor L', '10:00 - 10/24/2014', '11:00 - 10/24/2014',4,0,'Fail','0/4 (0%)','0/4 (0%)','0/4 (0%)']
    ]
  };

  componentWillMount() {
    const { actions: { enterWorkProgress } } = this.props;
    enterWorkProgress();
  }

  componentWillUnmount() {
    const { actions: { leaveWorkProgress } } = this.props;
    leaveWorkProgress();
  }

  render() {
    const {
      headers,
      content
    } = this.state;

    const source = `
      // import
      import { EarningGraph } from './_SOMEWHERE_/components';

      // labels and data (in state for example):
      state = {
        headers: ['#', 'Project', 'Manager', 'Deadline', 'Status', 'Progress'],
        content: [
          ['1', 'Facebook', 'Mark', '10/10/2014', <span className="label label-danger">in progress</span>, <span className="badge badge-info">50%</span>],
          ['2', 'Twitter', 'Evan', '10/8/2014', <span className="label label-success">completed</span>, <span className="badge badge-success">100%</span>],
          ['3', 'Google', 'Larry', '10/12/2014', <span className="label label-warning">in progress</span>, <span className="badge badge-warning">75%</span>],
          ['4', 'LinkedIn', 'Allen', '10/01/2015', <span className="label label-info">in progress</span>, <span className="badge badge-info">65%</span>],
          ['5', 'Tumblr', 'David', '01/11/2014', <span className="label label-warning">in progress</span>, <span className="badge badge-danger">95%</span>],
          ['6', 'Tesla', 'Musk', '01/11/2014', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>],
          ['7', 'Ghost', 'XXX', '01/11/2014', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>]
        ]
      };

      // in render():
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <EarningGraphComponent
            labels={this.state.labels}
            datasets={this.state.datasets}
          />
        </div>
      </div>
      `;

    return(
      <AnimatedView>
        {/* preview: */}
        <Panel
          hasTitle={false}
          bodyBackGndColor={'#F4F5F6'}
          bodyCustomClass="table-responsive">
          <Table>
            <TableHeader>
              {
                headers.map(
                  (header, headerIdx) => {
                    return (
                      <TableCol key={headerIdx}>
                        {header}
                      </TableCol>
                    );
                  }
                )
              }
            </TableHeader>
            <TableBody>
              {
                content.map(
                  (contentRow, contentRowIdx) => {
                    return (
                      <TableRow key={contentRowIdx}>
                        {
                          contentRow.map(
                            (contentColumn, contentColumnIdx) => {
                              return (
                                <TableCol key={contentColumnIdx}>
                                  {contentColumn}
                                </TableCol>
                              );
                            }
                          )
                        }
                      </TableRow>
                    );
                  }
                )
              }
            </TableBody>
          </Table>
        </Panel>
        {/* source: */}
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Source"
              hasTitle={true}>
              <Highlight className="javascript">
                {source}
              </Highlight>
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

WorkProgress.propTypes= {
  actions: PropTypes.shape({
    enterWorkProgress: PropTypes.func.isRequired,
    leaveWorkProgress: PropTypes.func.isRequired
  })
};

export default WorkProgress;
