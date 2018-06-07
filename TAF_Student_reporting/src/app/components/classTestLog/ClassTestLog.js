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

const headers = ['Class', 'Test Name', 'Date Completed', 'Average Score', '# Pass', '# Attempts', '# Finished', '#Incomplete','# Not Start',''];
const content = [
  [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 30  , 3 , 1 , 12  , 2 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 30  , 3 , 1 , 12  , 2 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 35  , 4 , 3 , 6 , 7 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 40  , 5 , 1 , 4 , 3 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 45  , 6 , 3 , 3 , 5 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 48  , 7 , 1 , 6 , 8 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 51  , 7 , 4 , 3 , 9 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 66  , 9 , 1 , 6 , 4 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 69  , 10  , 5 , 4 , 11  , 1]
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 70  , 3 , 1 , 6 , 6 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 72  , 12  , 2 , 3 , 1 , 1],
      [ 'Class 3' ,  'Fc - Module 02'   ,  '10/12/2014' , 80  , 13  , 1 , 8 , 5 , 1]

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
