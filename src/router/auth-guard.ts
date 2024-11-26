import {useUserStore} from '../stores/user'
import { NavigationGuard } from 'vue-router';

export const authGuard: NavigationGuard = async (to, from, next) => {
  // Fetch user data from the server or local storage
  // await userStore.fetchUser();

  // Check if the user is authenticated
  const authStore = useUserStore();
  console.log(authStore.userState)
  if (authStore.userState) {
    next();
  } else {
    // You can use try/catch to get an id token and set it to your request header
    // ex: try { ... next() } catch { ... next({ name: '/login') }
    next('login');
  }
};

export default authGuard;
