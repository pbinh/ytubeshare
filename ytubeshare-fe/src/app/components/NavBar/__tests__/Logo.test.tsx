import * as React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '../Logo';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<Logo />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(
      <Logo />
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
