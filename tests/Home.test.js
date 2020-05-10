import React from 'react'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import Home from '../screens/Home'

const mockStore = configureStore([]);

describe('Home', () => {
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

  test('snapshot renders', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})