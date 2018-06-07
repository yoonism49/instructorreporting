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


class TopicProgress extends PureComponent {

  state = {
    const headers = ['Class Avg', '# Questions', '# Points', 'Weight'];
const content = [
  [ '2', '3', '1','1'],
      [ '1', '4', '2','10'],
      [ '4', '4', '3','1'],
      [ '2', '4', '4','1'],
];
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
          title="Class Test Log"
          hasTitle={true}
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

TopicProgress.propTypes= {
  actions: PropTypes.shape({
    enterWorkProgress: PropTypes.func.isRequired,
    leaveWorkProgress: PropTypes.func.isRequired
  })
};

export default TopicProgress;
