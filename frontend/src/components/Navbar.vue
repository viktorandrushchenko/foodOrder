<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-custom">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/listRestaurants" class="nav-link">
              Рестораны
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listTickets" class="nav-link">
              Корзина
            </router-link>
          </li>
        </ul>

        <div v-if="currentUser" class="ms-auto">
          <div class="d-flex align-items-center">
              <button class="btn btn-light" @click.prevent="logOut">
                Выйти
              </button>
          </div>
        </div>

        <div v-else class="ms-auto">
          <div class="nav-links">
            <router-link to="/login" class="nav-link">
              Войти
            </router-link>
            <router-link to="/register" class="nav-link">
              Регистрация
            </router-link>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

  
<script>
export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>
  
  <style scoped>
    .nav-link {
      font-size: 20px; 
      color: white;
      font-family: "Arial Black", sans-serif; 
    }

    .ms-auto {
      padding-right: 20px;
    }

    .nav-link:hover {
      color: #040620;
    }

    .nav-links {
      display: flex;
      align-items: center; 
    }

    .nav-link {
      margin-right: 15px; 
    }
    .navbar-nav{
      margin-left: 20px;
    }
    .fixed-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    margin-top: 0px;
    }
    .bg-custom {
        background-color: #80447b;
    }
  </style>