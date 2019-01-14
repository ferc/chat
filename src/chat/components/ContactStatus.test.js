import React from 'react'
import { shallow } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import { ContactStatus } from './ContactStatus'

describe('ContactStatus', () => {
  it('should return an empty component if there is read-date nor the contact is typing', () => {

    const wrapper = shallow(
      <ContactStatus />
    )

    expect(wrapper.find(Typography).length).toBe(0)
  })

  it('should return that the contact is typing', () => {
    const readDate = '2019-01-14T13:12:03.721Z'

    const wrapper = shallow(
      <ContactStatus contactIsTyping={true} readDate={readDate} />
    )

    expect(wrapper.dive().shallow().text()).toBe('is typing...')
  })

  it('should return the last seen time', () => {
    const readDate = '2019-01-14T13:12:03.721Z'
    const mockTime = new Date('2019-01-14T13:52:03.721Z').getTime()
    jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    const wrapper = shallow(
      <ContactStatus contactIsTyping={false} readDate={readDate} />
    )

    expect(wrapper.dive().shallow().text()).toBe('last seen 40 minutes ago')
  })
})
