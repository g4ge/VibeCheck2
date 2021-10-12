import { useContext, createContext } from "react";

/* 
 * User context maintains the user profile data across the application.
 * However, password is not stored in context as it can be modified on the client side.
 */
const UserContext = createContext(null);

function useUserContext() {
  return useContext(UserContext);
}

export {
  UserContext,
  useUserContext
}