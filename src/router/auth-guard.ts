import {useUserStore} from '../stores/user'
import { NavigationGuard } from 'vue-router';
import { useStorage } from "vue3-storage";

export const authGuard: NavigationGuard = async (to, from, next) => {
  // Fetch user data from the server or local storage
  // await userStore.fetchUser();

  // Check if the user is authenticated
  // const authStore = useUserStore();
  const storage = useStorage();
  // console.log('userState : '+authStore.userState)
  storage.getStorageSync("user");

  if (storage.getStorageSync("user")) {
    next();
  } else {
    // You can use try/catch to get an id token and set it to your request header
    // ex: try { ... next() } catch { ... next({ name: '/login') }
    next('login');
  }
};

export default authGuard;
