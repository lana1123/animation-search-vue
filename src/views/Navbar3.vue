<template>
  <div id="nav">
 <div>

 email: {{email}}
 pw: {{password}}
 ERROR: {{error}}
 RETURN: {{dataReturn.data.login.user.name}}

<button @click="userLogin()">Test login</button>
 <button @click="userRegister()">Test Register</button>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames" :key="name.id">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Login"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            type="email"
            v-model="email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>

  <div class="nav-container">
    <div class="nav-child">
      <img class="nav-bar-logo" src="../assets/lottiefiles_logo.svg" alt="logo">
    </div>
      <div class="nav-child">
      <input type="text" v-model="animation" placeholder="Search by title, color, author..." v-on:keyup="$emit('searchSubmit',animation)"/>
      </div>
      <div class="nav-child">
      <a href="#" @click="$emit('modal','login')" v-b-modal.modal-prevent-closing>Login</a>
      <span>|</span>
      <a href="#" @click="$emit('modal','register')" v-b-modal.modal-prevent-closing>Register</a>
      <!--<router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>-->

      </div>
  </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

const REGISTER_USER = gql`
mutation registerUser (
  $name: String!
  $email: String!
  $password: String!
  $password_confirmation: String!
  ){
 register(
   input: {
     name: $name,
     email: $email,
     password: $password,
     password_confirmation: $password_confirmation
   }
 ) {
  tokens {
    access_token
    user {
      id
    }
  }
}
  }
`;

const LOGIN_USER = `
mutation loginUser (
  $username: String!
  $password: String!
  ){
 login(
   input: {
     username: $username,
     password: $password
   }
 ) {
  user{
    name
  }
}
  }
`;


export default {
  name: 'Navbar',
  components: {
  },
  data() {
      return {
        name: '',
        username: '',
        email: '',
        emailState: null,
        password: '',
        passwordState: null,
        submittedNames: [],
        login: [],
        password_confirmation: '',
        error: '',
        dataReturn: ''
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.emailState = valid
        this.passwordState = valid
        return valid
      },
      resetModal() {
        this.email = ''
        this.password = ''
        this.property = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.email)
        this.submittedNames.push(this.password)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
        userLogin () {
         fetch('http://animation-search.local/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: LOGIN_USER,
          variables: {
              username: "lana_1123@hotmail.com",
              password: "test1234",
          }
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log('data returned:', data);
          this.dataReturn = data;
          });
          
      },
        userRegister () {
          this.$apollo.mutate({
           mutation: REGISTER_USER,
          variables: {
            name: "Kyung Soo",
            email: "kyungsoo@gmail.com",
             password: "test1123",
             password_confirmation: "test1123"
         }
        })
      }
    }
  
}
</script>

<style>
#nav {
  background-color: grey;
  height: 64px;
  display: flex;
  justify-content: center;
}

.nav-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.nav-bar-logo {
  height: 32px;
}

span {
  color: white;
  margin: 0 10px;
}

#nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

#nav a.router-link-exact-active, #nav a:hover {
  color: #9bf0f0;
  cursor: pointer;
}

.nav-child {
    margin: auto;
}

input {
width: 500px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
padding: 0 20px;
}
</style>