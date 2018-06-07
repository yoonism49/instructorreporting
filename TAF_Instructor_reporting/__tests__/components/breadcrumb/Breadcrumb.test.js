'use strict';

import React          from 'react';
import Breadcrumb     from '../../../src/app/components/breadcrumb/Breadcrumb';
import renderer       from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme


describe('Breadcrumb component', () => {
  const mockPath = ['path1', 'subpath1'];
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <Breadcrumb path={mockPath} />
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
