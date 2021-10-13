import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:8001/graphql";


async function getAllUsers() {
  const query = gql`
    {
      all_users {
        id,
        username,
        name,
        email,
        avatar,
        status
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
}


async function editUser(user) {
  const query = gql`
    mutation ($email: String, $first_name: String, $last_name: String) {
      update_owner(input: {
        email: $email,
        first_name: $first_name,
        last_name: $last_name
      }) {
        email,
        first_name,
        last_name
      }
    }
  `;

  const variables = user;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.edit_user;
}


export {
  getAllUsers,
  editUser
}
