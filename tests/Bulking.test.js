import React from 'react'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import Bulking from '../components/Diets/Bulking'

const mockStore = configureStore([]);

describe('React Components connected to Redux', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        height: 180,
        weight: 80,
        age: 20,
        sex: "Male",
        lifeActivity: 4,
        formula: "MifflinStJeor"
      }
    });
  });

  test('should render with given state from Redux store', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Bulking />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})