import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:8001/graphql";


/*
 * Get a user data
 */
async function getOneUser(id) {
  const query = gql`
    query ($id: Int) {
      one_user (id: $id) {
        id,
        username,
        name,
        email,
        avatar,
        status
      }
    }
  `;
  
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.one_user;
}


/*
 * Get all users id & username
 */
async function getAllUsers() {
  const query = gql`
    {
      all_users {
        id,
        username
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
}


/*
 * Edit user profile information
 */
async function editUser(user) {
  const query = gql`
    mutation ($id: Int, $username: String, $name: String, $email: String, $avatar: String, $password: String) {
      edit_user(input: {
        id: $id,
        username: $username,
        name: $name,
        email: $email,
        avatar: $avatar,
        password: $password
      }) {
        id,
        username,
        name,
        email,
        avatar,
        status
      }
    }
  `;

  const variables = user;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.edit_user;
}


/*
 * Get number of users per day for the last 7 days
 */
async function getNumUsersPerDay() {
  const query = gql`
    {
      num_users_per_day {
        dates,
        num_users
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.num_users_per_day;
}


/*
 * Set user status (blocked/unblocked)
 */
async function setUserStatus(id) {
  const query = gql`
    mutation ($id: Int) {
      set_user_status(id: $id) {
        status
      }
    }
  `;

  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.set_user_status;
}


/*
 * Delete a single user
 */
async function deleteUser(id) {
  const query = gql`
    mutation ($id: Int) {
      delete_user(id: $id)
    }
  `;

  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.delete_user;
}


export {
  getOneUser,
  getAllUsers,
  editUser,
  getNumUsersPerDay,
  setUserStatus,
  deleteUser
}
