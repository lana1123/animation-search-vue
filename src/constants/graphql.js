export const LOGIN_USER = gql`
mutation (
  $username: String!
  $password: String!
  ){
 login(
   input: {
     username: $username,
     password: $password
   }
 ) {
  access_token
}
  }
`;