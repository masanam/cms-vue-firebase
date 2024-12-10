<script lang="ts">
import { defineComponent } from 'vue';
import {  db } from '../../firebase/firebase';
import { useRoute } from 'vue-router';
import { serverTimestamp, FieldValue, increment, Timestamp, doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { useModal, useToast } from 'vuestic-ui'

export default defineComponent({
  name: 'AddBoard',
  data () {
    return {
      board: {
        id:"",
        image: "",
        title: "",
        subTitle: "",
        price: "",
        button: "",
        published: "",
        lang:""
      },
    }
  },
  created () {
  },  
  methods: {
    async onSubmit (evt: { preventDefault: () => void; }) {
      evt.preventDefault()
      console.log("submit")
      const { init: notify } = useToast()
      const collectionRef = collection(db, 'products');
      const snapshot = await getCountFromServer(collectionRef);
      console.log('count: ', snapshot.data().count);
      const newInc = snapshot.data().count + 1;

      await setDoc(doc(db, 'products', newInc.toString()), {
          id: newInc.toString(),
          image: this.board.image,
          title: this.board.title,
          subTitle: this.board.subTitle,
          price: this.board.price,
          published: serverTimestamp(),
          button: this.board.button,
          lang: this.board.lang
      })

      notify({
        message: `data has been created`,
        color: 'success',
      })

      this.$router.push({ name: 'product-list' })
    },
    onCancel() {
      this.$router.push({ name: 'product-list' })
    }

  }
});
</script>
<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
  
  <div class="flex items-start justify-between p-5 border-b rounded-t">
      <h3 class="text-xl font-semibold">
          Add data
      </h3>
  </div>
  <form @submit.prevent="onSubmit">

  <div class="p-6 space-y-6">
          <div class="grid grid-cols-6 gap-6">
              <div class="col-span-full">
                <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Title</label>
                  <input type="text" name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.title">
              </div>
              <div class="col-span-full">
                  <label for="subTitle" class="text-sm font-medium text-gray-900 block mb-2">Content</label>
                  <textarea id="subTitle" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="board.subTitle">{{board.subTitle}}</textarea>
              </div>
              <div class="col-span-full">
                <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Price</label>
                  <input type="text" name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.price">
              </div>
              <div class="col-span-full">
                <label for="image" class="text-sm font-medium text-gray-900 block mb-2">Image</label>
                  <input type="text" name="image" id="image" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.image" >
              </div>
              <VaFileUpload
                  type="single"
                  hide-file-list
                  class="self-stretch justify-start items-center gap-4 inline-flex"
                >
                  <UserAvatar size="large" />
                  <VaButton preset="primary" class="p-2" size="small">Add image</VaButton>
                  <VaButton
                    preset="primary"
                    color="danger"
                    size="small"
                    icon="delete"
                    class="z-10"
                  />
                </VaFileUpload>

              <div class="col-span-full">
                <label for="button" class="text-sm font-medium text-gray-900 block mb-2">Button</label>
                  <input type="text" name="button" id="button" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.button" >
              </div>
              <div class="col-span-full">
                <label for="lang" class="text-sm font-medium text-gray-900 block mb-2">Language</label>
                  <select id="lang" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.lang">
                  <option value="EN" selected>English</option>
                  <option value="ID" selected>Indonesia</option>
                  <option value="JP" selected>Japan</option>
                </select>
              </div>

              <!-- <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Published</label>
                <input type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.published">
              </div> -->
          </div>
  </div>
  
    <div class="p-6 flex items-center justify-end gap-x-6 border-t border-gray-200 rounded-b">
      <button type="button" @click="onCancel" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>

  </div>
  </template>
  