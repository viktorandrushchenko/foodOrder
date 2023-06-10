import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListRestaurants from "./components/restaurant/ListRestaurants";
import AddRestaurant from "./components/restaurant/AddRestaurant";
import Restaurant from "./components/restaurant/ResTaurant";
import SearchRestaurants from "./components/restaurant/SearchRestaurants";

import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";

import store from "./store/index";

// определяем маршруты
const routes = [
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
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
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});
export default router;