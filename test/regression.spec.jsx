import React from 'react';
import { render } from '@testing-library/react';
import { HeavyStyledTree } from '../src/HeavyStyledTree';

describe('styled-components perf repro', () => {
  it('renders heavy styled tree', () => {
    for (let i = 0; i < 20; i += 1) {
      const view = render(<HeavyStyledTree count={120} />);
      expect(view.getByTestId('heavy-root')).toBeInTheDocument();
      view.unmount();
    }
  });
});
