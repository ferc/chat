import React from 'react'
import { shallow } from 'enzyme'
import { Message } from './Message'
import messageStatus from '../enums/messageStatus'

describe('Message', () => {
  it('should render the message content and its time', () => {
    const mockProps = {
      classes: {},
      content: 'Hello!',
      date: '2019-01-12T15:20:21.304Z',
      isCurrentUser: true,
      status: messageStatus.sent
    }

    const wrapper = shallow(
      <Message {...mockProps} />
    )

    expect(wrapper.find('[data-testid="message-content"]').dive().shallow().text()).toBe('Hello!')
    expect(wrapper.find('[data-testid="message-time"]').dive().shallow().text()).toBe('10:20')
  })
})
