<template>
  <div id="nav">
 <div>
    <b-modal
      id="modal-login"
      ref="modal"
      title="Login"
      button-size="sm"
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

    <b-modal
      id="modal-register"
      ref="modal"
      title="Register"
      button-size="sm"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            type="text"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
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
          label="Password (min: 8 characters)"
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

        <b-form-group
          label="Password Confirmation"
          label-for="password-confirmation-input"
          invalid-feedback="Password does not match"
          :state="passwordConfirmationState"
        >
          <b-form-input
            id="password-confirmation-input"
            type="password"
            v-model="passwordConfirmation"
            :state="passwordConfirmationState"
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
      <div v-if="username==''">
      
     <a href="#" @click="$emit('modal','login')" v-b-modal.modal-login >Login</a>
      <span>|</span>
      <a href="#" @click="$emit('modal','register')" v-b-modal.modal-register >Register</a>
      </div>
      <div v-else>
      <b-avatar variant="secondary" v-bind:text="username.substring(0,1)" class="mr-3"></b-avatar>
      <b-dropdown id="dropdown-1" class="m-md-2" size="sm">
    <b-dropdown-item @click="logoutUser">Logout</b-dropdown-item>
  </b-dropdown>
      </div>

      </div>
  </div>
    </div>
</template>

<script>
const REGISTER_USER = `
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
      name
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
   access_token
  user{
    name
  }
}
  }
`;

const LOGOUT_USER = `
mutation logoutUser{
 logout {
  status
  message
}
  }
`;

const VUE_APP_GRAPHQL_URL = process.env.VUE_APP_GRAPHQL_URL;

export default {
  name: 'Navbar',
  components: {
  },
  data() {
      return {
        name: '',
        nameState: null,
        username: '',
        email: '',
        emailState: null,
        password: '',
        passwordState: null,
        passwordConfirmation: '',
        passwordConfirmationState: null,
        submittedNames: [],
        login: [],
        password_confirmation: '',
        error: '',
        dataReturn: '',
        token: ''
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
         if(this.$refs.modal.id == 'modal-login') {
            this.emailState = valid
            this.passwordState = valid
        }
        else if(this.$refs.modal.id == 'modal-register') {
            this.nameState = valid
            this.emailState = valid
            this.passwordState = valid
            this.passwordConfirmationState = valid
        }
        
        return valid
      },
      resetModal() {
        this.name = ''
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        this.property = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }

        if(this.$refs.modal.id == 'modal-login') {
          this.userLogin();
        }
        else if(this.$refs.modal.id == 'modal-register') {
          this.userRegister();
        }
       
        this.$nextTick(() => {
          this.$bvModal.hide('modal-login')
          this.$bvModal.hide('modal-register')
        })
      },
        userLogin () {
          fetch(`${VUE_APP_GRAPHQL_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: LOGIN_USER,
          variables: {
              username: this.email,
              password: this.password,
          }
        })
      })
        .then(r => r.json()).catch(err => {
            this.error = err;
          })
        .then(data => {
          if(data.data){
            this.error = '';
            this.username = data.data.login.user.name;
            this.token = data.data.login.access_token;
          }
          else {
            this.error = data.errors[0].extensions.reason;
            this.showAuthenticationError();

          }
          })
          .catch(err => {
            this.error = err;
          });
          
      },
        userRegister () {
         fetch(`${VUE_APP_GRAPHQL_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: REGISTER_USER,
          variables: {
             name: this.name,
             email: this.email,
             password: this.password,
             password_confirmation: this.passwordConfirmation
          }
        })
      })
        .then(r => r.json()).catch(err => {
            this.error = err;
          })
        .then(data => {
          if(data.data){
            this.error = '';
            this.username = data.data.register.tokens.user.name;
            this.token = data.data.register.tokens.access_token;
          }
          else {
            this.error = data.errors[0].message;
            this.showAuthenticationError();
          }
          })
          .catch(err => {
            this.error = err;
          });
      },
      logoutUser() {
        fetch(`${VUE_APP_GRAPHQL_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + this.token
        },
        body: JSON.stringify({
          query: LOGOUT_USER
        })
      })
        .then(r => r.json()).catch(err => {
            this.error = err;
          })
        .then(data => {
          if(data.data){
            this.error = '';
            this.username = '';
            this.token = '';
          }
          else {
            this.error = data.errors[0].message;
          }
          })
          .catch(err => {
            this.error = err;
          });
          this.resetModal();
      },
      showAuthenticationError() {
        this.boxOne = ''
        this.$bvModal.msgBoxOk(this.error)
          .then(value => {
            this.boxOne = value
          })
          .catch(err => {
            console.log(err);
          })
      },
    }
  
}
</script>

<style>
#nav {
  background-color: black;
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
max-width: 500px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
padding: 0 20px;
}

.dropdown-menu {
background-color: grey;
}
.dropdown-menu:hover {
background-color: grey;
color: black;
}

.dropdown-item {
background-color: grey;
  color: white;
  cursor: pointer;
}

.dropdown-item:hover {
background-color: grey;
  color: #9bf0f0;
  cursor: pointer;
}

@media (min-width: 1280px) {
input {
  width: 500px;
}
}

@media (max-width: 768px) {
#nav {
  display: flex;
  flex-wrap: wrap;
}

.nav-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: black;
}
}

</style>