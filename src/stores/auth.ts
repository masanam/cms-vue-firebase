import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

interface AuthState {
    user: any | null;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: {
            loggedIn: false,
            data: null
          }
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

                        // console.log(this.user)
                        if (docSnap.exists()) {
                            console.log("Document data:", docSnap.data());
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                        
                    });
            } catch (error) {
                const errorCode = (error as { code: string }).code;
                const errorMessage = (error as { message: string }).message;
                console.log(errorCode, errorMessage);
            }
        },
        async logOut(context: any){
            await signOut(auth)
            context.commit('SET_USER', null)
        },
    },
    getters: {
        user(state){
            return state.user
          }
    }
});

