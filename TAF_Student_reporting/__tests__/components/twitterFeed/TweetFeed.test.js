'use strict';

import React                from 'react';
import TweetFeed            from '../../../src/app/components/twitterFeed/TwitterFeed';
import renderer             from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme

describe('TweetFeed component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <TweetFeed />
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
