<template> 
    <div class="container my-5">     
      <div class="row justify-content-center"> 
        <div class="col-md-6"> 
          <h4 class="mb-3">Редактирование блюда</h4> 
          <form> 
            <div class="form-group mb-3"> 
              <label for="name" class="form-label">Название</label> 
              <input type="text" class="form-control" id="name" name="name" placeholder="Введите название" required v-model="dish.name"> 
            </div> 
            <div class="form-group mb-3"> 
              <label for="adress" class="form-label">Описание</label> 
              <input type="text" class="form-control" id="adress" name="adress" placeholder="Введите адрес" required v-model="dish.description"> 
            </div> 
            <div class="form-group mb-3"> 
              <label for="cuisine" class="form-label">Цена</label> 
              <input type="text" class="form-control" id="cuisine" name="cuisine" placeholder="Введите тип кухни" required v-model="dish.price"> 
            </div> 

              <input type="file" name="image" ref="myInputRef">
              <input type="submit" value="Upload" v-on:click="updateImg">

            <button type="button" class="btn btn-primary me-3" v-on:click="updateDish">Изменить</button>  
          </form> 
        </div> 
      </div> 
    </div> 
  </template>
<script>
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

    export default {
        name: "updateDish", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                dish: {
                    id: null,
                    name: "",
                    description: "",
                    price: "",
                },
            };
        },
        computed: { // вычисляемые свойства
            dishId() {
              return this.$route.params.id
            },
            restId() {
              return this.$route.params.restId
            },
        },
        methods: {
            getDish() {
                http
                    .get("/dish/" + this.dishId ) // обращаемся к серверу для получения списка абитуриентов
                    .then(response => { // запрос выполнен успешно
                        this.dish = response.data;                     
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateDish(e) {
              e.preventDefault();
              var data = {
                name: this.dish.name,
                description: this.dish.description,
                price: this.dish.price
              };
              http
                  .post("/updateDish/" + this.dishId, data)
                  .then(() => {
                    this.$router.push({ name: 'restaurant-details', params:{id: this.restId}});
                  })
                  .catch(e => {
                    console.log(e);
                  });
            },    
            updateImg(e) {
              e.preventDefault();
              const fileInput = this.$refs.myInputRef.files[0]; // получаем файл из элемента input
              const data = new FormData();
              data.append('image', fileInput); // добавляем файл в объект FormData

              http.post(`/dish/upload/${this.dishId}`, data)
                .then(() => {
                  this.$router.push({ name: 'restaurant-details', params: { id: this.restId } });
                })
                .catch(error => {
                  console.error(error);
                });
            },  
        },
        mounted() {
            this.getDish();
        }
    }
</script>