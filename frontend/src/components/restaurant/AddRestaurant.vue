<template> 
    <div class="card"> 
      <div class="card-header">
        <h4 class="mb-0">Добавление ресторана</h4> 
      </div>
      <div class="card-body"> 
        <div v-if="!submitted"> 
          <form @submit="addRestaurant" class="form"> 
            <div class="form-group"> 
              <label for="name">Название</label> 
              <input type="text" name="name" id="name" class="form-control" placeholder="Название" required v-model="restaurant.name"> 
            </div> 
            <div class="form-group"> 
              <label for="adress">Адресс</label> 
              <input type="text" name="adress" id="adress" class="form-control" placeholder="Адресс" required v-model="restaurant.adress"> 
            </div> 
            <div class="form-group"> 
              <label for="cuisine">Кухня</label> 
              <input type="text" name="cuisine" id="cuisine" class="form-control" placeholder="Кухня" v-model="restaurant.cuisine"> 
            </div> 
            <button type="submit" class="btn btn-primary">Добавить</button> 
          </form> 
        </div> 
        <div v-else> 
          <h4>Вы успешно добавили запись</h4> 
          <div> 
            <button v-on:click="newRestaurant" class="btn btn-primary">Добавить новой ресторан</button> 
          </div> 
          <div> 
            <router-link to="/listRestaurants" class="btn btn-secondary">Вернуться к списку ресторанов</router-link> 
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
                restaurant: {
                    id: null,
                    name: "",
                    adress: "",
                    cuisine: "",
                },
                submitted: false
            };
        },
        methods: {
            addRestaurant(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.restaurant.name,
                    adress: this.restaurant.adress,
                    cuisine: this.restaurant.cuisine,
                };
                // Либо var data = this.user;
                http
                    .post("/addRestaurant", data)
                    .then(response => { // запрос выполнился успешно
                        this.restaurant.id = response.data.id;
                        this.submitted = true;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                
            },
            newRestaurant() {
                this.submitted = false;
                this.restaurant = {
                    id: null,
                    name: "",
                    adress: "",
                    cuisine: "",
                };
            }
        }
    }
</script>