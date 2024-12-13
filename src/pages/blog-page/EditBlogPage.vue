<script lang="ts">
import { defineComponent } from 'vue';
import {  db } from '../../firebase/firebase';
import { useRoute } from 'vue-router';
import { serverTimestamp, FieldValue, increment, Timestamp, doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { comment } from 'postcss';
import Editor from '@tinymce/tinymce-vue';

export default defineComponent({
  components: {'editor': Editor },
  name: 'EditBoard',
  data () {
    const route = useRoute()
    return {
      apiKey : import.meta.env.VITE_TINYMCE_API_KEY,
      key: route.params.id,
      board: {
        image: "",
        title: "",
        subTitle: "",
        category: "",
        content: "",
        view: "",
        comment: "",
        published: "",
      },
    }
  },
  created () {
    this.getBlogs();
  },  
  methods: {
    async getBlogs(): Promise<void> {
      const id = this.key.toString()
      const docRef = doc(db, "blogs",id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          image: docSnap.data().image,
          title: docSnap.data().title,
          subTitle: docSnap.data().subTitle,
          category: docSnap.data().category,
          content: docSnap.data().content,
          published: docSnap.data().published.toDate().toDateString(),
          view: docSnap.data().view,
          comment: docSnap.data().comment,
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
      this.$router.push({ name: 'blog-page' })
      await updateDoc(doc(db, 'blogs', id), {
          image: this.board.image,
          title: this.board.title,
          subTitle: this.board.subTitle,
          category: this.board.category,
          content: this.board.content,
          // published: serverTimestamp(),
          view: this.board.view,
          comment: this.board.comment,
      })
    },
    onCancel() {
      this.$router.push({ name: 'blog-page' })
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
                  <label for="subtitle" class="text-sm font-medium text-gray-900 block mb-2">Category</label>
                  <input type="text" name="subtitle" id="subtitle" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.category">
              </div>
              <div class="col-span-full">
                <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Title</label>
                  <input type="text" name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.title">
              </div>
              <div class="col-span-full">
                  <label for="subTitle" class="text-sm font-medium text-gray-900 block mb-2">Sub Title</label>
                  <input type="text" name="subTitle" id="subTitle" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.subTitle">
              </div>

              <div class="col-span-full">
                  <label for="content" class="text-sm font-medium text-gray-900 block mb-2">Content</label>
                  <editor
                  :init="{
                    height: 300,
                    plugins: 'lists link image table code help wordcount',
                  }"
                    :api-key="apiKey"
                    v-model="board.content"
                  />

                  <!-- <textarea id="content" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="board.content">{{board.content}}</textarea> -->
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
                <label for="view" class="text-sm font-medium text-gray-900 block mb-2">View</label>
                <input type="text" name="view" id="view" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.view" >
              </div>
              <div class="col-span-full">
                <label for="comment" class="text-sm font-medium text-gray-900 block mb-2">Comment</label>
                <input type="text" name="comment" id="comment" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.comment" >
              </div>

              <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Published</label>
                <input readonly type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.published">
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
  