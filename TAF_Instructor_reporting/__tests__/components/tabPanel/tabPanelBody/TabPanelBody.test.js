
'use strict';

import React              from 'react';
import TabPanelBody       from '../../../../src/app/components/tabPanel/tabPanelBody/TabPanelBody';
import renderer           from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme

describe('TabPanelBody component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <TabPanelBody>
          <p>TabPanelBody children here</p>
        </TabPanelBody>
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
