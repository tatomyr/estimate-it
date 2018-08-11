import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Sidebar from './Sidebar'
import { emptyEstimate } from '../../redux/reducers/estimates'

it('renders correctly', () => {
  configure({ adapter: new Adapter() })
  const tree = shallow(<Sidebar
    match={{ params: { estimateId: 'new' } }}
    recalc={_ => null}
    saveEstimate={_ => null}
    openAuthScreen={_ => null}
    estimates={{ new: emptyEstimate }}
    username="Test User"
    graphView="minified"
    minifyGraph={_ => null}
    enlargeGraph={_ => null}
  />, {})
  expect(tree).toMatchSnapshot()
})
