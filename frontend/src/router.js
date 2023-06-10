import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListRestaurants from "./components/abiturient/ListAbiturients";
import AddRestaurant from "./components/abiturient/AddAbiturient";
import Restaurant from "./components/abiturient/Abiturient";
import SearchRestaurants from "./components/abiturient/SearchAbiturients";

// определяем маршруты
const routes = [
    {
        path: "/listRestaurants", // указание маршрута, по которому будем переходить к списку абитуриентов
        name: "restaurants", // имя маршрута
        alias: "/restaurants", // указание дополнительного маршрута
        component: ListRestaurants, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список ресторанов"
        }
    },
    {
        path: "/Restaurant/:id",
        name: "restaurant-details",
        component: Restaurant,
        props: true, // указываем, что компонент Abiturient.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные ресторана"
        }
    },
    {
        path: "/addRestaurant",
        name: "add-restaurants",
        component: AddRestaurant,
        meta: {
            title: "Добавление ресторана"
        }
    },
    {
        path: "/searchRestaurants",
        name: "search-restaurants",
        component: SearchRestaurants,
        meta: {
            title: "Поиск ресторанов"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});
export default router;