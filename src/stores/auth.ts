import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from '../firebase/firebase';

interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore({
  id: "auth",

  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
  }),

  getters: {
    getCurrentUser: () => auth.currentUser,
  },

  actions: {
    register(data: User): Promise<any> {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredentials) => {
            this.user = userCredentials.user;
            // this.router.push("/");
            resolve(userCredentials);
          })
          .catch((error) => {
            console.log("An error happened.", error);
            reject(error);
          });
      });
    },

    aSignIn(data: User): Promise<any> {
      return signInWithEmailAndPassword(auth, data.email, data.password);
    },

    logout(): void {
      signOut(auth)
        .then(() => {
        //   this.router.push("/login");
        })
        .catch((error) => {
          console.log("An error happened.", error);
        });
    },

    initializeAuthentication(): void {
      const user = this.getCurrentUser;

      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  },
});