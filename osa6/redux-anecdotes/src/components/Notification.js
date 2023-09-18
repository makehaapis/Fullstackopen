import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  const [notification, setNotification] = useState("")
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      setNotification(notifications[notifications.length - 1].message);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [notifications]);
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return show ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
}

export default Notification