/* globals it, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import SideButton from './SideButton'

it('renders correctly', () => {
  const tree = renderer
    .create(<SideButton
      title="New"
      name="file"
      link="/estimate/new"
      redirect={() => null}
    />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
