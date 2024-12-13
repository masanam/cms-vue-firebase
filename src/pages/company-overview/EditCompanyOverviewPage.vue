<script lang="ts">
import { defineComponent } from 'vue';
import {  db } from '../../firebase/firebase';
import { useRoute } from 'vue-router';
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default defineComponent({
  name: 'EditBoard',
  data () {
    const route = useRoute()
    return {
      key: route.params.id,
      board: {
        country: "",
        startDate: "",
        revenue: "",
        director: "",
        address: "",
        address2: "",
        phone: "",
        business: "",
        lang:""
      },
    }
  },
  created () {
    this.getAboutPage();
  },  
  methods: {
    async getAboutPage(): Promise<void> {
      const id = this.key.toString()
      const docRef = doc(db, "companyOverviews",id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          country: docSnap.data().country,
          startDate: docSnap.data().startDate,
          director: docSnap.data().director,
          revenue: docSnap.data().revenue,
          address: docSnap.data().address,
          address2: docSnap.data().address2,
          phone: docSnap.data().phone,
          business: docSnap.data().business,
          lang: docSnap.data().lang,


        };
        // console.log(this.board);
      } else {
        console.log('Document does not exist');
      }
    },
    async onSubmit (evt: { preventDefault: () => void; }) {
      evt.preventDefault()
      // console.log("submit")
      const id = this.key.toString()
      this.$router.push({ name: 'company-overview' })
      await updateDoc(doc(db, 'companyOverviews', id), {
          country: this.board.country,
          startDate: this.board.startDate,
          director: this.board.director,
          revenue: this.board.revenue,
          address: this.board.address,
          address2: this.board.address2,
          phone: this.board.phone,
          business: this.board.business,

      })
    },
    onCancel() {
      this.$router.push({ name: 'company-overview' })
    }

  }
});
</script>
<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
  
  <div class="flex items-start justify-between p-5 border-b rounded-t">
      <h3 class="text-xl font-semibold">
          Edit data
      </h3>
  </div>
  <form @submit.prevent="onSubmit">

  <div class="p-6 space-y-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-full">
              <label for="country" class="text-sm font-medium text-gray-900 block mb-2">Country</label>
                  <input type="text" name="country" id="country" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.country">
              </div>
              <div class="col-span-full">
                <label for="startDate" class="text-sm font-medium text-gray-900 block mb-2">Start Date</label>
                  <input type="text" name="startDate" id="startDate" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.startDate">
              </div>
              <div class="col-span-full">
                <label for="director" class="text-sm font-medium text-gray-900 block mb-2">Director</label>
                  <input type="text" name="director" id="director" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.director">
              </div>
              <div class="col-span-full">
                <label for="revenue" class="text-sm font-medium text-gray-900 block mb-2">Revenue</label>
                  <input type="text" name="revenue" id="revenue" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.revenue" >
              </div>
              <div class="col-span-full">
                <label for="address" class="text-sm font-medium text-gray-900 block mb-2">Address</label>
                <input type="text" name="address" id="address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.address">
              </div>
              <div class="col-span-full">
                <label for="address2" class="text-sm font-medium text-gray-900 block mb-2">Address2</label>
                <input type="text" name="address2" id="address2" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.address2">
              </div>
              <div class="col-span-full">
                <label for="phone" class="text-sm font-medium text-gray-900 block mb-2">Phone</label>
                <input type="text" name="phone" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.phone">
              </div>
              <div class="col-span-full">
                <label for="business" class="text-sm font-medium text-gray-900 block mb-2">Business</label>
                <input type="text" name="business" id="business" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.business">
              </div>
              <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Language</label>
                <input readonly type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.lang">
              </div>

          </div>
  </div>
  
    <div class="p-6 flex items-center justify-end gap-x-6 border-t border-gray-200 rounded-b">
      <button type="button" @click="onCancel" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>

  </div>
  </template>
  