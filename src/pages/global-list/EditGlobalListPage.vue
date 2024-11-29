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
        title: "",
        number: "",
        icon: "",
      },
    }
  },
  created () {
    this.getFrontPage();
  },  
  methods: {
    async getFrontPage(): Promise<void> {
      const id = this.key.toString()
      const docRef = doc(db, "globallists",id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          title: docSnap.data().title,
          number: docSnap.data().number,
          icon: docSnap.data().icon,
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
      this.$router.push({ name: 'global-list' })
      await updateDoc(doc(db, 'globallists', id), {
          title: this.board.title,
          number: this.board.number,
          icon: this.board.icon,
      })
    },
    onCancel() {
      this.$router.push({ name: 'global-list' })
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
              <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Title</label>
                  <input type="text" name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.title">
              </div>
              <div class="col-span-full">
                <label for="subtitle" class="text-sm font-medium text-gray-900 block mb-2">Number</label>
                  <input type="text" name="subtitle" id="subtitle" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.number">
              </div>
              <div class="col-span-full">
                <label for="image" class="text-sm font-medium text-gray-900 block mb-2">Icon</label>
                  <input type="text" name="image" id="image" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.icon" >
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

          </div>
  </div>
  
    <div class="p-6 flex items-center justify-end gap-x-6 border-t border-gray-200 rounded-b">
      <button type="button" @click="onCancel" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>

  </div>
  </template>
  