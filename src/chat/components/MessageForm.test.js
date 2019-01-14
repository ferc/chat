import React from 'react'
import { shallow } from 'enzyme'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { MessageForm } from './MessageForm'
import messageStatus from '../enums/messageStatus'
import { STOP_TYPING, TYPING } from '../eventNames'

describe('MessageForm', () => {
  it('should call the typing and stop typing events', async () => {
    const sendMessage = jest.fn()
    const socketEmit = jest.fn()
    const mockProps = {
      classes: {},
      contactId: '4343c376-5dd9-4ea0-b029-7380ada5e7f4',
      disabled: false,
      sendMessage,
      socket:{
        emit: socketEmit
      }
    }

    jest.useFakeTimers()

    const wrapper = shallow(
      <MessageForm {...mockProps} />
    )

    wrapper.find('[data-testid="form-input"]').simulate('keydown', {
      key: 'H',
      shiftKey: false
    })

    expect(socketEmit).toHaveBeenCalledTimes(1)
    expect(socketEmit).lastCalledWith(TYPING)

    jest.runAllTimers()

    expect(socketEmit).toHaveBeenCalledTimes(2)
    expect(socketEmit).lastCalledWith(STOP_TYPING)
  })

  it('should send the message if the form is submitted', async () => {
    const sendMessage = jest.fn()
    const socketEmit = jest.fn()
    const mockProps = {
      classes: {},
      contactId: '4343c376-5dd9-4ea0-b029-7380ada5e7f4',
      disabled: false,
      sendMessage,
      socket:{
        emit: socketEmit
      }
    }

    jest.useFakeTimers()

    const wrapper = shallow(
      <MessageForm {...mockProps} />
    )

    wrapper.find('[data-testid="form-input"]').simulate('change', {
      target: {
        value: 'Hello'
      }
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    })

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage.mock.calls[0][1]).toEqual({
      content: 'Hello',
      receiverId: '4343c376-5dd9-4ea0-b029-7380ada5e7f4'
    })
  })
})
