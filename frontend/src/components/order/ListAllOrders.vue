<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Список заказов</h4> 
      </div>
      <div class="card-body"> 
        <ul class="list-group">    
            <li v-for="(order, index) in orders" :key="index" class="list-group-item d-flex justify-content-between align-items-start">    
                <router-link class="nav-link" :to="{ name: 'order', params: { id: order.id}}">
                <div class="ms-2 me-auto">  
                    <div class="fw-bold">Пользователь: {{ users[order.user_id]?.email }}</div>  
                    <div class="fw-bold">Ресторан: {{ restaurants[order.restaurant_id]?.name }}</div>    
                    <div class="small">Время заказа: {{ order.time_ordered }}</div>   
                    <div class="small">Готовность: {{ order.fulfilled == 1 ? "Готов" : "Не готов" }}
                        <button v-if="!order.fulfilled" class="btn btn-success btn-sm mx-3" @click="readyOrder(order.id)">Готов</button>      
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
        name: "ListOrders", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                orders: [],
                restaurants: [],
                users: [],
                isReady: 1
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: { 
            readyOrder(id) {
                    http
                    .post("/OrderReady/" + id) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        
                        window.location.reload();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getRestaurants() {
                http
                    .get("/restaurants")
                    .then(response => {
                      this.restaurants = response.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});
                    })
                    .catch(e => {
                    console.log(e);
                    });
            },
            getOrders() {
                http
                    .get("/Orders") // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.orders= response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getUsers() {
                http
                    .get("/users")
                    .then(response => {
                      this.users = response.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});
                    })
                    .catch(e => {
                    console.log(e);
                    });
            },
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getOrders();
            this.getRestaurants();
            this.getUsers();
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