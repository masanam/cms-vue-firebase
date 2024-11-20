<template>
    <form @submit.prevent="submit">
        <h3 class="mb-5">Sign Up</h3>
        <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="phone.value.value"
            :error-messages="phone.errorMessage.value"
            label="Phone Number"
        ></v-text-field>
        <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
        ></v-text-field>
        <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="Password"
        ></v-text-field>
        <v-text-field
            v-model="repeatPassword.value.value"
            :error-messages="repeatPassword.errorMessage.value"
            label="Repeat Password"
        ></v-text-field>
        <v-btn
            class="me-4"
            type="submit"
        >
            Sign Up
        </v-btn>
        <v-btn 
            color="indigo-darken-3"
            variant="flat">
            Already have an account?
        </v-btn>
    </form>
</template>


<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'
  import { useAuthStore } from '../stores/auth';
    
  const authStore = useAuthStore();
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 2) return true
        return 'Name needs to be at least 2 characters.'
      },
      phone (value) {
        if (value?.length > 9 && /[0-9-]+/.test(value)) return true
        return 'Phone number needs to be at least 9 digits.'
      },
      email (value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'Must be a valid e-mail.'
      },
      password (value) {
        if (value?.length >= 8) return true
        return 'Password needs to be at least 8 characters.'
      },
      repeatPassword (value) {
        if (value === password.value.value) return true
        return 'Password and Repeat Password values should be equal.'
      },
    },
  })
  const name = useField('name')
  const phone = useField('phone')
  const email = useField('email')
  const password = useField('password')
  const repeatPassword = useField('repeatPassword')
//   const submit = handleSubmit(values => {
//     console.log('submit');
//   })
const submit = handleSubmit(values => {
    authStore.aSignUp({email: values.email, password: values.password});
    console.log('submit sukses');
})

</script>
