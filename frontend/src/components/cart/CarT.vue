<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Корзина</h4> 
      </div>
      <div class="card-body"> 
        <ul class="list-group">    
            <li v-for="(cart, index) in carts" :key="index" class="list-group-item d-flex justify-content-between align-items-start">      
                <div class="ms-2 me-auto">    
                    <div class="fw-bold">Блюдо: {{ dishes[cart.dish_id]?.name }}</div>    
                    <div class="small">Количество: {{ cart.quantity }}</div>   
                    <button class="btn btn-danger btn-sm mx-3" @click="deleteDish(cart.dish_id)">-</button>     
                    <button class="btn btn-success btn-sm mx-3" @click="addDish(cart.dish_id)">+</button>                               
                </div>                                              
            </li>    
        </ul>
        <button v-if="isEmpty" class="btn btn-success btn-sm mx-3" @click="addOrder()">Сделать заказ</button>  
      </div> 
    </div> 
  </template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "ListCarts", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                carts: [],
                dishes: [],
                isEmpty: 0
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
            addOrder() {
                    http
                    .post("/openCart/" + this.currentUser.id + '/' + this.restaurantId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            deleteDish(id) {
                var data = {
                    user_id: this.currentUser.id,
                    dish_id: id,
                    restaurant_id: this.restaurantId,
                    quantity: 1
                };
                    http
                    .post("/subCart", data) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            addDish(id) {
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
            getDishes() {
                http
                    .get("/dishes")
                    .then(response => {
                      this.dishes = response.data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});
                    })
                    .catch(e => {
                    console.log(e);
                    });
            },
            getCarts() {
                http
                    .get("/cart/RestaurantUser/" + this.currentUser.id + "/" + this.restaurantId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.carts= response.data;
                        if(response.data.length > 0)
                            this.isEmpty = 1;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getCarts();
            this.getDishes();
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