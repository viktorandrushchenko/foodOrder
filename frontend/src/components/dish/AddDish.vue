<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Добавление блюда</h4> 
      </div>
      <div class="card-body"> 
        <div v-if="!submitted"> 
          <form @submit="addDish" class="form"> 
            <div class="form-group"> 
              <label for="name">Название</label> 
              <input type="text" name="name" id="name" class="form-control" placeholder="Название" required v-model="dish.name"> 
            </div> 
            <div class="form-group"> 
              <label for="adress">Описание</label> 
              <input type="text" name="adress" id="adress" class="form-control" placeholder="Описание" required v-model="dish.description"> 
            </div> 
            <div class="form-group"> 
              <label for="cuisine">Цена</label> 
              <input type="text" name="cuisine" id="cuisine" class="form-control" placeholder="Цена" v-model="dish.price"> 
            </div> 
            <button type="submit" class="btn btn-primary">Добавить</button> 
          </form> 
        </div> 
        <div v-else> 
          <h4>Вы успешно добавили запись</h4> 
          <div> 
            <button v-on:click="newDish" class="btn btn-primary">Добавить новое блюдо</button> 
          </div> 
          <div> 
            <router-link :to="{ name: 'restaurant-details', params: { id: restaurantId }}" class="btn btn-secondary">Вернуться к списку блюд</router-link> 
          </div> 
        </div> 
      </div> 
    </div> 
  </template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddRestaurant",
        data() {
            return {
                dish: {
                    id: null,
                    name: "",
                    description: "",
                    price: "",
                    restaurant_id: null
                },
                submitted: false
            };
        },
        computed: { // вычисляемые свойства
            restaurantId() {
                return this.$route.params.id
            }
        },
        methods: {
            addDish(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.dish.name,
                    description: this.dish.description,
                    price: this.dish.price,
                    restaurant_id: this.restaurantId
                };
                // Либо var data = this.user;
                http
                    .post("/addDish", data)
                    .then(response => { // запрос выполнился успешно
                        this.dish.id = response.data.id;
                        this.submitted = true;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                
            },
            newDish() {
                this.submitted = false;
                this.dish = {
                    id: null,
                    name: "",
                    description: "",
                    price: "",
                    restaurant_id: null
                };
            }
        }
    }
</script>