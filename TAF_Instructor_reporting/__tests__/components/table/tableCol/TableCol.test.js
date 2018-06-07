
'use strict';

import React              from 'react';
import TableCol           from '../../../../src/app/components/table/tableCol/TableCol';
import renderer           from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme

describe('TableCol component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <TableCol>
          <p>table col children here</p>
        </TableCol>
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
