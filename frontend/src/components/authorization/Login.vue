<template>  
    <div class="container d-flex align-items-center justify-content-center mt-4">  
      <div class="form-box col-md-5">  
        <h4 class="mx-auto">Вход</h4>  
        <form name="form" @submit="handleLogin">  
          <div class="form-group mb-3">  
            <input type="text" class="form-control" name="username" placeholder="Почта" v-model="user.email" required/>  
          </div>  
 
          <div class="form-group mb-3">  
            <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>  
          </div>  
 
          <div class="form-group mb-3">  
            <button class="btn btn-primary d-flex align-items-center justify-content-center" :disabled="loading">  
              <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>  
              <span>Войти</span>  
            </button>  
          </div>  
 
          <div class="form-group">  
            <div v-if="message" class="alert alert-danger mt-3" role="alert">{{message}}</div>  
          </div>  
        </form>  
      </div>  
    </div>  
</template>
<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    email: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>

<style>
.form-box {
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-box form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>