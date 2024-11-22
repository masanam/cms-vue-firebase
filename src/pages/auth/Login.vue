<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      New to User?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="Keep me signed in on this device" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        Forgot password?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import { useAuthStore } from '../../stores/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/firebase';

const authStore = useAuthStore();

// Untuk mengambil data user:
const user = authStore.user;
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = () => {
  if (validate()) {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // alert(`Welcome back, ${user.email}!`);
          //       console.log('Login sukses');
//       init({ message: "You've successfully logged in", color: 'success' })
          push({ name: 'dashboard' })
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          // alert(`Error: ${errorCode} - ${errorMessage}`);
          init({ message: "Login failed", color: 'danger' })
        });
  }
}

// const submit = () => {
//   if (validate()) {
//     authStore.aSignIn({email: formData.email, password: formData.password});

//     // console.log(user);

//     if (user?.email) {
//       // router.push('/');
//       console.log('Login sukses');
//       init({ message: "You've successfully logged in", color: 'success' })
//       push({ name: 'dashboard' })
//     }
//   }
// }

</script>
