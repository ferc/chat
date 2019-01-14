import React from 'react'
import { shallow } from 'enzyme'
import { Chat } from './Chat'

describe('Chat', () => {
  it('it renders correctly and calls to fetchConversation', () => {
    const contactSelected = {
      id: 'd94b8c66-7de0-4403-b4df-ed469864c771',
      name: 'Rob'
    }
    const fetchConversationSpy = jest.fn()
    const user = {
      id: '622e2331-5a61-4164-a831-61813134fd43',
      name: 'Laura'
    }

    const wrapper = shallow(
      <Chat contactSelected={contactSelected} fetchConversation={fetchConversationSpy} user={user} />
    )

    expect(fetchConversationSpy).toHaveBeenCalled()
  })
})
