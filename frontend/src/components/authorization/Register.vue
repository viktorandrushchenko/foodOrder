<template>
    <div class="container d-flex align-items-center justify-content-center mt-4">
      <div class="form-box col-md-5">
        <h4 class="mx-auto mb-4">Регистрация</h4>
        <form name="form" @submit="handleRegister">
          <div v-if="!successful">
            <div class="form-group">
              <input type="text" class="form-control mb-3" name="lastname" placeholder="Имя" v-model="user.name" required/>
            </div>
            <div class="form-group">
              <input type="text" class="form-control mb-3" name="email" placeholder="Электронная почта" v-model="user.email" required/>
            </div>
            <div class="form-group">
              <input type="password" class="form-control mb-3" name="password" placeholder="Пароль" v-model="user.password" required/>
            </div>
            <div class="form-group">
              <button class="btn btn-primary d-flex align-items-center justify-content-center mb-3">Зарегистрировать</button>
            </div>
          </div>
          <div class="form-group">
            <div v-if="successMessage" class="alert alert-success mt-3" role="alert">{{successMessage}}</div>
          </div>
          <div class="form-group">
            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">{{errorMessage}}</div>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'RegisterUser',
    data() {
      return {
        user: {
          name: "",
          email: "",
          password: ""
        },
        successful: false,
        successMessage: '',
        errorMessage: ''
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if (this.loggedIn) {
        // Авторизация прошла успешно, переходим к главной странице.
        // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        window.location.href = '/';
      }
    },
    methods: {
      handleRegister(e) {
        e.preventDefault();
        this.successMessage = '';
        this.errorMessage = '';
        this.$store.dispatch("auth/registerUser", this.user) // обращаемся к методу register, который определён в auth.service.js
            .then(data => {
              this.successMessage = data.message;
              this.successful = true;
            })
            .catch(e => {
              this.errorMessage = e.response.data.message;
            });
      }
    }
  };
  </script>