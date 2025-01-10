<script lang="ts">
import { defineComponent, ref } from 'vue';
import {  db, storage } from '../../firebase/firebase';
import { useRoute } from 'vue-router';
import { serverTimestamp, FieldValue, increment, Timestamp, doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { ref as storageRef , uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default defineComponent({
  name: 'EditBoard',
  data () {
    const route = useRoute()
    return {
      file: ref<File | null>(null),
      key: route.params.id,
      board: {
        image: "",
        title: "",
        subTitle: "",
        price: "",
        button: "",
        published: "",
        lang: "",
        active: "",
      },
    }
  },
  created () {
    this.getLatestNews();
  },  
  methods: {
    handleFileChange(e: Event): void {
      const target = e.target as HTMLInputElement;
      // this.file = target.files![0];

      if (target.files) {
        this.file = target.files[0];
      }
    },

    uploadFile(file: File): void {
        const { name, type } = file;
        const storageReference = storageRef(storage, 'images/' + name);
        const uploadTask = uploadBytesResumable(storageReference, file, {
        contentType: type
      });

        uploadTask.on(
          'state_changed',
          (snapshot: { bytesTransferred: number; totalBytes: number }) => {
            const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error: unknown) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
                this.board.image = downloadURL
              // ... and call a fn that writes a document to a firestore
            });
          }
        );
      },

      submitForm() {
      // just quick & simple validation
      if (this.file) {
        this.uploadFile(this.file)
        return
      }
    },
    async getLatestNews(): Promise<void> {
      const id = this.key.toString()
      const docRef = doc(db, "products",id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          image: docSnap.data().image,
          title: docSnap.data().title,
          subTitle: docSnap.data().subTitle,
          price: docSnap.data().price,
          published: docSnap.data().published.toDate().toDateString(),
          button: docSnap.data().button,
          lang: docSnap.data().lang,
          active: docSnap.data().active,
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
      this.$router.push({ name: 'product-list' })
      await updateDoc(doc(db, 'products', id), {
          image: this.board.image,
          title: this.board.title,
          subTitle: this.board.subTitle,
          price: this.board.price,
          // published: serverTimestamp(),
          button: this.board.button,

      })
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
                  <label for="subTitle" class="text-sm font-medium text-gray-900 block mb-2">Content</label>
                  <textarea id="subTitle" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="board.subTitle">{{board.subTitle}}</textarea>
              </div>
              <div class="col-span-full">
                  <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Link</label>
                  <input type="text" name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.price">
              </div>

              <div class="col-span-full">
                <div v-if="board.image != ''">                     
                   <img class="preview" height="268" width="356" :src="board.image">
                <br>
              </div>   
                <label for="image" class="text-sm font-medium text-gray-900 block mb-2">Image</label>
                  <input @change="handleFileChange" type="file" name="image" id="file" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" >
                  <br/><VaButton class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" size="small" @click="submitForm()">Upload Image</VaButton>
              </div>
              <!-- <AdvancedImage :cld-img="cloudinary.createImageInstance(`${board.image}`)" :plugins="cloudinary.plugins" /> -->
              <div class="col-span-full">
                <label for="button" class="text-sm font-medium text-gray-900 block mb-2">Button</label>
                  <input type="text" name="button" id="button" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.button" >
              </div>
              <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Published</label>
                <input type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.published">
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
  