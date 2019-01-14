import React from 'react'
import { shallow } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import Message from './Message'
import { Thread } from './Thread'

describe('Thread', () => {
  it('should render', () => {
    const conversation = {
      data: {
        deliveredDate: null,
        messages: [{
          content: 'Hello',
          date: '2019-01-12T15:20:21.304Z',
          id: '4343c376-5dd9-4ea0-b029-7380ada5e7f4',
          receiverId: 'd94b8c66-7de0-4403-b4df-ed469864c771'
        }],
        readDate: null
      },
      error: null,
      loading: false
    }
    const pendingMessages = [{
      content: 'How are you?',
      date: '2019-01-12T16:31:21.304Z',
      receiverId: '622e2331-5a61-4164-a831-61813134fd43',
      trackId: '45ec319d-942e-4ecf-8286-f100046e5044'
    }]
    const user = {
      id: '622e2331-5a61-4164-a831-61813134fd43',
      name: 'Laura'
    }

    const mockProps = {
      classes: {},
      conversation,
      pendingMessages,
      user
    }

    const wrapper = shallow(
      <Thread {...mockProps} />,
      { disableLifecycleMethods: true }
    )

    expect(wrapper.find(Message)).toHaveLength(2)
  })
})
