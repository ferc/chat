import React from 'react'
import { shallow } from 'enzyme'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { MessageIcon } from './MessageIcon'
import messageStatus from '../enums/messageStatus'

describe('MessageIcon', () => {
  it('should render the double check if the message was read', () => {
    const wrapper = shallow(
      <MessageIcon classes={{}} status={messageStatus.read} />
    )

    expect(wrapper.find(DoneAllIcon)).toHaveLength(1)
  })
})
