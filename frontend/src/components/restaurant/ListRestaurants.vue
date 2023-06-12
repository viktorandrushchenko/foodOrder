<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Список ресторанов</h4> 
      </div>
      <div class="card-body"> 
        <!-- Определение ссылок --> 
        <router-link v-if="currentUser && currentUser.role == 'Администратор'" class="btn btn-primary btn-lg my-3 mx-3" to="/addRestaurant">Добавить ресторан</router-link>  
        <router-link class="btn btn-primary btn-lg my-3 mx-3" to="/searchRestaurants">Поиск ресторанов</router-link>
        <router-link class="btn btn-primary btn-lg my-3 mx-3" to="/searchRestaurantsByCuisine">Поиск ресторанов по кухне</router-link>
        <ul class="list-group">    
            <li v-for="(restaurant, index) in restaurants" :key="index" class="list-group-item d-flex justify-content-between align-items-start">    
                <router-link class="nav-link" :to="{ name: 'restaurant-details', params: { id: restaurant.id}}">    
                <div class="ms-2 me-auto">    
                    <div class="fw-bold">Название ресторана: {{ restaurant.name }}</div>    
                    <div class="small">Адрес: {{ restaurant.adress }}</div>   
                    <div class="small">Тип Кухни: {{ restaurant.cuisine }}</div> 
                    <div v-if="currentUser && currentUser.role == 'Администратор'"> 
                        <button class="btn btn-danger btn-sm mx-3" @click="deleteRestaurant(restaurant.id)">Удалить</button>
                        <router-link class="btn btn-primary btn-sm mx-3" :to="{ name: 'editRestaurant', params: { id: restaurant.id }}">Изменить</router-link>        
                    </div>                               
                </div>                   
                </router-link>    

                
            </li>    
        </ul>
      </div> 
    </div> 
  </template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListRestaurants", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                restaurants: []
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: { 
            deleteRestaurant(id) {
                if (confirm("Вы действительно хотите удалить этот ресторан?")) {
                    http
                    .post("/deleteRestaurant/" + id) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        this.$router.push({ name: 'restaurants'});
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
                }
            },
            getRestaurant() {
                http
                    .get("/restaurants") // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.restaurants= response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getRestaurant();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
    .list-group-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border: none;
  border-radius: 0;
  background-color: #ffffff;
  margin-bottom: 10px;
}

</style>