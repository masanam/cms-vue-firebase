import { createStore } from 'vuex';
import { auth, firestore } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface User {
  loggedIn: boolean;
  data: any | null;
}

interface State {
  user: User;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

const store = createStore<State>({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, payload: any) {
      state.user.data = payload;
    },
    SET_LOGGED_IN(state, value: boolean) {
      state.user.loggedIn = value;
    },
  },
  actions: {
    async register(context, { email, password, name }: RegisterPayload) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('SET_USER', response.user);
        response.user.updateProfile({ displayName: name });
      } else {
        throw new Error('Unable to register user');
      }
    },

    async logIn(context, { email, password }: LoginPayload) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('SET_USER', response.user);
      } else {
        throw new Error('login failed');
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit('SET_USER', null);
    },

    async fetchUser(context, user: any) {
      context.commit('SET_LOGGED_IN', user !== null);
      if (user) {
        context.commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit('SET_USER', null);
      }
    },
  },
});

// export the store
export default store;
