import '@testing-library/jest-dom';

if (process.env.SC_DISABLE_GLOBAL_STYLE_MOCK === '1') {
  jest.mock('styled-components', () => {
    const actual = jest.requireActual('styled-components');
    const styled = actual.default ?? actual;

    return {
      __esModule: true,
      ...actual,
      default: styled,
      styled,
      createGlobalStyle: () => () => null
    };
  });
}
