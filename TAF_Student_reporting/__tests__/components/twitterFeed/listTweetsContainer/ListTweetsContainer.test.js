'use strict';

import React                from 'react';
import ListTweetsContainer  from '../../../../src/app/components/twitterFeed/listTweetsContainer/ListTweetsContainer';
import renderer             from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme

describe('ListTweetsContainer component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <ListTweetsContainer >
          <p>ListTweetsContainer children</p>
        </ListTweetsContainer>
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
