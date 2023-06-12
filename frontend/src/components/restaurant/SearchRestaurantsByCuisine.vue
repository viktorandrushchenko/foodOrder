<template> 
    <div> 
      <h4 class="mb-3">Поиск ресторанов по типу кухни</h4> 
      <form @submit="searchRestaurants" class="form-inline mb-3"> 
        <div class="form-group mr-3"> 
          <input type="text" name="name" id="name" class="form-control" placeholder="кухня" required v-model="cuisine"> 
        </div> 
        <button type="submit" class="btn btn-primary">Поиск</button> 
      </form> 
   
      <ul class="list-group"> 
        <li v-for="(restaurant, index) in restaurants" :key="index" class="list-group-item d-flex justify-content-between align-items-start">   
              <router-link class="nav-link" :to="{ name: 'restaurant-details', params: { id: restaurant.id}}">   
                <div class="ms-2 me-auto">   
                  <div class="fw-bold">Название ресторана: {{ restaurant.name }}</div>   
                  <div class="small">Адрес: {{ restaurant.adress  }}</div>  
                  <div class="small">Тип Кухни: {{ restaurant.cuisine  }}</div>                                        
                </div>                  
              </router-link>   
            </li> 
      </ul> 
   
      <div v-show="noDataFound" class="alert alert-warning mt-3"> 
        Данные, соответствующие параметрам поиска, не найдены 
      </div> 
    </div> 
  </template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchAbiturients",
        data() {
            return {
                cuisine: "",
                restaurants: [],
                noDataFound: false
            };
        },
        methods: {
            searchRestaurants(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/restaurant/cuisine/" + this.cuisine)
                    .then(response => {
                        if (response.data.length > 0){
                            this.restaurants = response.data;
                            this.noDataFound = false;
                        }
                        else{
                            this.noDataFound = true;
                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>