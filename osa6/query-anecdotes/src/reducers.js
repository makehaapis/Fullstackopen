export const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
          return action.payload
      case 'NULL':
          return action.payload
      default:
          return null
    }
  }
