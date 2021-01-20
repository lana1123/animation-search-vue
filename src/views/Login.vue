<template>
  <div>
    <div class="flex flex-column mt3">
      <input
        class="mb2"
        v-model="username"
        type="email"
        placeholder="Email">
      <input
        class="mb2"
        v-model="password"
        type="password"
        placeholder="The URL for the link">
    </div>
    <button @click="userLogin()">Submit</button>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const LOGIN_USER = gql`
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

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      userLogin () {
  this.$apollo.mutate({
    mutation: LOGIN_USER,
    variables: {
      input: {
        username: this.username,
         password: this.password
      }
    }
  })
      }
    }
  }
</script>