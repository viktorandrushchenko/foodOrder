<template>   
    <div class="card">   
      <div class="card-header">  
        <div class="d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Список блюд</h4>    
        <router-link v-if="currentUser && currentUser.role != 'Администратор'" class="btn btn-primary btn-sm mx-3" :to="{ name: 'cart', params: {id: restaurantId}}">Корзина</router-link> 
      </div> 
      </div>  
      <div class="card-body">   
        <!-- Определение ссылок -->   
        <router-link v-if="currentUser && currentUser.role == 'Администратор'" class="btn btn-primary btn-lg my-3 mx-3" :to="{ name: 'add-dish', params: { id: restaurantId }}">Добавить блюдо</router-link>  
        
        <div class="row"> 
          <div class="col-md-3" v-for="(dish, index) in dishes" :key="index"> 
            <div class="card mb-3"> 
              <div class="card-body"> 
                <h5 class="card-title fw-bold">{{ dish.name }}</h5> 
                <p class="card-text">{{ dish.description }}</p> 
                <p class="card-text">{{ dish.price }} р.</p> 
                <img :src="image" >
                <div class="mb-3" v-if="currentUser && currentUser.role == 'Администратор'">   
                  <button class="btn btn-danger btn-sm mx-3" @click="deleteDish(dish.id)">Удалить</button>  
                  <router-link class="btn btn-primary btn-sm mx-3" :to="{ name: 'editDish', params: { id: dish.id, restId: restaurantId }}">Изменить</router-link>    
                </div>    
                <button v-if="currentUser && currentUser.role != 'Администратор'" class="btn btn-success btn-sm mx-3" @click="addToCart(dish.id)">Добавить в корзину</button> 
              </div> 
            </div> 
          </div> 
        </div>   
      </div>   
    </div>   
  </template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListDish", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                dishes: [],
                image: ""
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            },
            restaurantId() {
                return this.$route.params.id
            }
        },
        methods: { 
          getImg() {
            http
              .get("/dish/image/" + 1)
              .then(response => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = URL.createObjectURL(blob);
                this.image = url;
              })
              .catch(e => {
                console.log(e);
              });
          },
          addToCart(id) {
            var data = {
                    user_id: this.currentUser.id,
                    dish_id: id,
                    restaurant_id: this.restaurantId,
                    quantity: 1
                };
                    http
                    .post("/addCart", data) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            deleteDish(id) {
                if (confirm("Вы действительно хотите удалить этот ресторан?")) {
                    http
                    .post("/deleteDish/" + id) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
                }
            },
            getDishes() {
                http
                    .get("/dish/restaurant_id/" + this.restaurantId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.dishes= response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getDishes();
            this.getImg();
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