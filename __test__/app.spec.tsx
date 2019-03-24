import * as React from 'react'
import { shallow } from 'enzyme'

import {SampleWidget} from './HelloTest'
import {Header, Footer} from '../src/layouts/index'
describe('App', () => {
    it('should exist', () => {
        expect(<SampleWidget name='test'/> ).toBeDefined()
    })

    it('should render', () => {
        const wrapper = shallow(<SampleWidget name='test'/>)
        expect(wrapper.find('h1').contains('Hello test'))
    })
})

describe('SummitWeb', () => {
  it('NavBar', () => {
    expect(<Header /> ).toBeDefined()
  })
  it('Layouts', () => {
    expect(<Footer />).toBeDefined()
  })
})