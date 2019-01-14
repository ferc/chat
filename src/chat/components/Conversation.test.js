import React from 'react'
import { shallow } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import { Conversation } from './Conversation'

describe('Conversation', () => {
  it('should render', () => {
    const contact = {
      id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
      name: 'Rob'
    }
    const conversation = {
      data: {
        deliveredDate: null,
        messages: [],
        readDate: null
      },
      error: null,
      loading: false
    }
    const user = {
      id: '622e2331-5a61-4164-a831-61813134fd43',
      name: 'Laura'
    }

    const mockProps = {
      classes: {},
      contact,
      contactTyping: jest.fn(),
      contactStopTyping: jest.fn(),
      conversation,
      messageDelivered: jest.fn(),
      messageRead: jest.fn(),
      newMessageReceived: jest.fn(),
      pendingMessages: [],
      user
    }

    const wrapper = shallow(
      <Conversation {...mockProps} />,
      { disableLifecycleMethods: true }
    )

    expect(wrapper.find('[data-testid="contact-name"]').dive().shallow().text()).toBe('Rob')
  })
})
