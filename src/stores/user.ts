import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  // Define the properties of the user object here
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    const userState = ref<User | null>(null);
    const setUser = (user: User) => {
      userState.value = user;
    };
    return {
      userState,
      setUser,
    };
  }
);