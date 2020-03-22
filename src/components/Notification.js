import React from 'react'
import "./Notification.css"

const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }

    const notificationClass = notification.type === "error" ? "error" : "info"

    return (
        <div className={notificationClass}>
            {notification.message}
        </div>
    )
}

export default Notification