import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from '../Nav';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<Nav />', () => {
  it('should match the snapshot', () => {
    shallowRenderer.render(
      <Nav 
        onLoginRegisterBtnClicked={() => {}} 
        />
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
