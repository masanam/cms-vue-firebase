import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

interface User {
    uid: string;
    email: string;
    // Add other user properties as needed
  }

  
interface AuthState {
    user: any | null;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: null
    }),
    actions: {
        async aSignUp(form: { email: string; password: string }) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
                this.user = userCredential.user;        
            } catch (error) {
                const errorCode = (error as { code: string }).code;
                const errorMessage = (error as { message: string }).message;
                console.log(errorCode, errorMessage);
            }
        },
        async aSignIn(form: { email: string; password: string }): Promise<void> {
            try {
                await signInWithEmailAndPassword(auth, form.email, form.password)
                    .then(async (userCredential) => {
                        const docRef = doc(firestore, "users", userCredential.user.uid);
                        const docSnap = await getDoc(docRef);
                        this.user = docSnap.data();
                        console.log(this.user)
                    });
            } catch (error) {
                const errorCode = (error as { code: string }).code;
                const errorMessage = (error as { message: string }).message;
                console.log(errorCode, errorMessage);
            }
        }
    },
    getters: {
        gUser: (state: AuthState) => state.user,
    }
});

