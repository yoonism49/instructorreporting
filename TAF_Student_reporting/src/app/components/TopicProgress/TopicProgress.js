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

const headers = ['Class Avg', '# Questions', '# Points', 'Weight'];
const content = [
  [ '2', '3', '1','1'],
      [ '1', '4', '2','10'],
      [ '4', '4', '3','1'],
      [ '2', '4', '4','1'],
];

const TopicProgress = () => (
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

export default TopicProgress;
