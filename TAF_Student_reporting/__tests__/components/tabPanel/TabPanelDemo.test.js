
'use strict';

import React              from 'react';
import TabPanelDemo       from '../../../src/app/components/tabPanel/TabPanelDemo';
import renderer           from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme

describe('TabPanelDemo component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <TabPanelDemo />
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
