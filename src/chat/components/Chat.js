import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchConversation } from '../actions'
import Conversation from './Conversation'

class Chat extends Component {
  componentDidMount() {
    this.props.fetchConversation()
  }

  render() {
    const { contactSelected, user } = this.props

    return (
      <Conversation contact={contactSelected} user={user} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchConversation: userId => dispatch(fetchConversation(userId))
})

export default connect(
  null,
  mapDispatchToProps
)(Chat)
