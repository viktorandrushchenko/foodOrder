<template>
    <div>
        <h4>Поиск абитуриентов по фамилии</h4>
        <form @submit="searchAbiturientsByLastname">
            <input type="text" name="lastname" id="lastname" placeholder="Фамилия" required v-model="lastname">
            <input type="submit" value="Поиск">
        </form>

        <ul class="search-result">
            <li v-for="(abiturient, index) in abiturients" :key="index">
                {{abiturient.lastname}} {{abiturient.firstname}} {{abiturient.patronymic}}
            </li>
        </ul>

        <div v-show="noDataFound">
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
                lastname: "",
                abiturients: [],
                noDataFound: false
            };
        },
        methods: {
            searchAbiturientsByLastname(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/abiturient/lastname/" + this.lastname)
                    .then(response => {
                        if (response.data.length > 0){
                            this.abiturients = response.data;
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