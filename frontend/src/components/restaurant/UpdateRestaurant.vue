<template> 
    <div class="container my-5">     
      <div class="row justify-content-center"> 
        <div class="col-md-6"> 
          <h4 class="mb-3">Редактирование ресторана</h4> 
          <form> 
            <div class="form-group mb-3"> 
              <label for="name" class="form-label">Название</label> 
              <input type="text" class="form-control" id="name" name="name" placeholder="Введите название" required v-model="restaurant.name"> 
            </div> 
            <div class="form-group mb-3"> 
              <label for="adress" class="form-label">Адрес</label> 
              <input type="text" class="form-control" id="adress" name="adress" placeholder="Введите адрес" required v-model="restaurant.adress"> 
            </div> 
            <div class="form-group mb-3"> 
              <label for="cuisine" class="form-label">Тип кухни</label> 
              <input type="text" class="form-control" id="cuisine" name="cuisine" placeholder="Введите тип кухни" required v-model="restaurant.cuisine"> 
            </div> 
            <button type="button" class="btn btn-primary me-3" v-on:click="updateRestaurant">Изменить</button>  
          </form> 
        </div> 
      </div> 
    </div> 
  </template>
<script>
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "updateRestaurant", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                restaurant: {
                    id: null,
                    name: "",
                    adress: "",
                    cuisine: "",
                },
            };
        },
        computed: { // вычисляемые свойства
            restaurantId() {
              return this.$route.params.id
            }
        },
        methods: {
            getRestaurant() {
                http
                    .get("/restaurant/" + this.restaurantId ) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.restaurant = response.data;                     
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateRestaurant(e) {
              e.preventDefault();
              var data = {
                name: this.restaurant.name,
                adress: this.restaurant.adress,
                cuisine: this.restaurant.cuisine
              };
              http
                  .post("/updateRestaurant/" + this.restaurantId, data)
                  .then(() => {
                    this.$router.push({ name: 'restaurants'});
                  })
                  .catch(e => {
                    console.log(e);
                  });
            },        
        },
        mounted() {
            this.getRestaurant();
        }
    }
</script>