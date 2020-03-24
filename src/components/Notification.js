import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const notificationClass = notification.type === 'error' ? 'error' : 'info'

  return (
    <div className={notificationClass}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification