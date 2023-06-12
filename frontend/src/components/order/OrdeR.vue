<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Содержимое заказа</h4> 
      </div>
      <div class="card-body"> 
        <ul class="list-group">    
            <li v-for="(item, index) in items" :key="index" class="list-group-item d-flex justify-content-between align-items-start">    
                <div class="ms-2 me-auto">    
                    <div class="fw-bold">блюдо: {{ dishes[item.dish_id]?.name }}</div>    
                    <div class="small">Количество: {{ item.quantity }}</div>                            
                </div>                               
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
                items: [],
                dishes: []
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            },
            orderId() {
                return this.$route.params.id
            }
        },
        methods: { 
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
            getItems() {
                http
                    .get("/order_item/order_id/" + this.orderId) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.items= response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные абитуриентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getDishes();
            this.getItems();
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