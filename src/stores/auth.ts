import { defineStore } from 'pinia';
import { auth, firestore } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// interface User {
//   uid: string;
//   email: string;
//   // Add other user properties as needed
// }

interface AuthState {
  user: any | null;
  loginError: string | null;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: null,
        loginError: null
    }),
  actions: {
    async aSignUp(form: { email: string; password: string }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        this.user = userCredential.user;        
        console.log('User signed up:', userCredential.user);
      } catch (error: any) {
        this.loginError = error.message;
        console.log(error.code, error.message);
      }
    },
    
    async aSignIn(form: { email: string; password: string }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const docRef = doc(firestore, 'users', userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.user = docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error: any) {
        // this.loginError = error.message;
        console.log(error.code, error.message);
      }
    },

    async logOut() {
      try {
        await signOut(auth);
        this.user = null;  // Reset user state
      } catch (error: any) {
        // this.loginError = error.message;
        console.log(error.code, error.message);
      }
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    userInfo: (state) => state.user
  }
});