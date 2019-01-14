import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchConversation } from '../actions'
import Conversation from './Conversation'

export class Chat extends Component {
  static propTypes = {
    contactSelected: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }

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
