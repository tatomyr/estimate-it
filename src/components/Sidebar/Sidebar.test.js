/* globals describe, it, expect */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Sidebar from './Sidebar'
import { emptyEstimate } from '../../redux/reducers/estimates'

describe('Sidebar', () => {
  it('renders correctly', () => {
    configure({ adapter: new Adapter() })
    const tree = shallow(<Sidebar
      match={{ params: { estimateId: 'new' } }}
      location={{ pathname: '/' }}
      recalc={() => null}
      saveEstimate={() => null}
      estimates={{ new: emptyEstimate }}
      username="Test User"
      graphView="minified"
      minifyGraph={() => null}
      enlargeGraph={() => null}
    />, {})
    expect(tree).toMatchSnapshot()
  })
})
