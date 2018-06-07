'use strict';

import React            from 'react';
import MenuLinks        from '../../../../../../src/app/components/aside/asideLeft/menu/menuLinks/MenuLinks';
import renderer         from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme
import { MemoryRouter } from 'react-router';

let activeViewMock;
let onClick;

describe('AnimatedView component', () => {
  const mockViews = [
    { name: 'view1', linkTo: '/view1', faIconName: 'fa-home', itemCount: 1 },
    { name: 'view2', linkTo: '/view2', faIconName: 'fa-user', itemCount: 0 }
  ];

  beforeEach(() => {
    activeViewMock = mockViews[0].name;
    onClick = jest.fn();
  });

  it('renders as expected', () => {
    const component = renderer.create(
      <div>
        <MemoryRouter>
          <MenuLinks
            activeView={activeViewMock}
            views={mockViews}
            onClick={onClick}
          />
        </MemoryRouter>
      </div>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
