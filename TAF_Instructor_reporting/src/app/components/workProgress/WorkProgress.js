// @flow weak

import React              from 'react';
import WorkProgressPanel  from './workProgressPanel/WorkProgressPanel';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';

const headers = ['Trainee Name', 'Time Started', 'Time Completed', '# Attempts', 'Total Score', 'Result', 'Topic 1', 'Topic 4','Topic 7'];
const content = [
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
];

const WorkProgress = () => (
  <WorkProgressPanel>
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
  </WorkProgressPanel>
);

export default WorkProgress;
