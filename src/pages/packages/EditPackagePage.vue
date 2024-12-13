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
        image: "",
        title: "",
        subTitle: "",
        button: "",
        scale: "",
        globe: "",
        briefcase: "",
        apps_1: "",
        apps_2: "",
        apps_3: "",
        apps_4: "",
        lang: "",

      },
    }
  },
  created () {
    this.getAboutPage();
  },  
  methods: {
    async getAboutPage(): Promise<void> {
      const id = this.key.toString()
      const docRef = doc(db, "packages",id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          image: docSnap.data().image,
          title: docSnap.data().title,
          subTitle: docSnap.data().subTitle,
          button: docSnap.data().button,
          scale: docSnap.data().scale,
          globe: docSnap.data().globe,
          briefcase: docSnap.data().briefcase,
          apps_1: docSnap.data().apps_1,
          apps_2: docSnap.data().apps_2,
          apps_3: docSnap.data().apps_3,
          apps_4: docSnap.data().apps_4,
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
      this.$router.push({ name: 'packages' })
      await updateDoc(doc(db, 'packages', id), {
          image: this.board.image,
          title: this.board.title,
          subTitle: this.board.subTitle,
          button: this.board.subTitle,
          scale: this.board.scale,
          globe: this.board.globe,
          briefcase: this.board.briefcase,
          apps_1: this.board.apps_1,
          apps_2: this.board.apps_2,
          apps_3: this.board.apps_3,
          apps_4: this.board.apps_4,

      })
    },
    onCancel() {
      this.$router.push({ name: 'packages' })
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
                <label for="subtitle" class="text-sm font-medium text-gray-900 block mb-2">SubTitle</label>
                  <input type="text" name="subtitle" id="subtitle" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.subTitle">
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
                  <input type="text" name="button" id="button" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.button">
              </div>
              <div class="col-span-full">
                <label for="scale" class="text-sm font-medium text-gray-900 block mb-2">Scale</label>
                  <input type="text" name="scale" id="scale" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.scale">
              </div>
              <div class="col-span-full">
                <label for="globe" class="text-sm font-medium text-gray-900 block mb-2">Globe</label>
                  <input type="text" name="globe" id="globe" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.globe">
              </div>
              <div class="col-span-full">
                <label for="briefcase" class="text-sm font-medium text-gray-900 block mb-2">Briefcase</label>
                  <input type="text" name="briefcase" id="briefcase" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.briefcase">
              </div>
              <div class="col-span-full">
                <label for="apps_1" class="text-sm font-medium text-gray-900 block mb-2">Apps 1</label>
                  <input type="text" name="apps_1" id="apps_1" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.apps_1">
              </div>
              <div class="col-span-full">
                <label for="apps_2" class="text-sm font-medium text-gray-900 block mb-2">Apps 2</label>
                  <input type="text" name="apps_2" id="apps_2" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.apps_2">
              </div>
              <div class="col-span-full">
                <label for="apps_3" class="text-sm font-medium text-gray-900 block mb-2">Apps 3</label>
                  <input type="text" name="apps_3" id="apps_3" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.apps_3">
              </div>
              <div class="col-span-full">
                <label for="apps_4" class="text-sm font-medium text-gray-900 block mb-2">Apps 4</label>
                  <input type="text" name="apps_4" id="apps_4" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.apps_4">
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
  