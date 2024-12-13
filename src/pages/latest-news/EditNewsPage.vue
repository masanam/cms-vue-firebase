<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue';
import useCloudinary from '../../services/useCloudinary';
const cloudinary = useCloudinary();
</script>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'firebase/storage';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase'; // Adjust the import according to your project structure
import FileUploader from '../../components/FileUploader.vue';

export default defineComponent({
  name: 'EditBoard',
  data() {
    const route = useRoute();
    return {
      key: route.params.id as string,
      file: null as File | null,
      board: {
        image: "",
        title: "",
        category: "",
        content: "",
        author: "",
        published: "",
        lang:""
      },
    };
  },
  created() {
    this.getLatestNews();
  },
  methods: {
    handleFileChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        this.file = target.files[0];
      }
    },

    uploadFile(file: File) {
      const { name, type } = file;
      const storageRef = ref(storage, 'images/' + name);
      const uploadTask = uploadBytesResumable(storageRef, this.file as File, {
        contentType: type
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const data = {
              url: downloadURL
            };
            // this.createProduct(data);
          });
        }
      );
    },

    async getLatestNews(): Promise<void> {
      const id = this.key.toString();
      const docRef = doc(db, "latestNews", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.board = {
          image: docSnap.data()?.image || "",
          title: docSnap.data()?.title || "",
          category: docSnap.data()?.category || "",
          content: docSnap.data()?.content || "",
          published: docSnap.data()?.published.toDate().toDateString() || "",
          author: docSnap.data()?.author || "",
          lang: docSnap.data()?.lang || "",
        };
      } else {
        console.log('Document does not exist');
      }
    },

    async onSubmit(evt: Event) {
      if (this.file) {
        this.uploadFile(this.file);
        return;
      }
      evt.preventDefault();
      const id = this.key.toString();
      this.$router.push({ name: 'latest-news' });
      await updateDoc(doc(db, 'latestNews', id), {
        image: this.board.image,
        title: this.board.title,
        category: this.board.category,
        content: this.board.content,
        author: this.board.author,
      });
    },

    onCancel() {
      this.$router.push({ name: 'latest-news' });
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
              <div class="col-span-full">
                <label for="subtitle" class="text-sm font-medium text-gray-900 block mb-2">Category</label>
                  <input type="text" name="subtitle" id="subtitle" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.category">
              </div>
              <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Title</label>
                  <input type="text" name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.title">
              </div>
              <div class="col-span-full">
                  <label for="content" class="text-sm font-medium text-gray-900 block mb-2">Content</label>
                  <textarea id="content" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="board.content">{{board.content}}</textarea>
              </div>
              <div class="col-span-full">
                <label for="image" class="text-sm font-medium text-gray-900 block mb-2">Image</label>
                <img :src="`${board.image}`"  class="p-2 h-15 w-auto" alt="Mirai Logo" />
                <input type="text" name="image" id="image" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.image" >
              </div>
              <!-- <AdvancedImage :cld-img="cloudinary.createImageInstance(`${board.image}`)" :plugins="cloudinary.plugins" /> -->
              <div class="col-span-full">
                <label for="button" class="text-sm font-medium text-gray-900 block mb-2">Author</label>
                  <input type="text" name="button" id="button" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.author" >
              </div>
              <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Published</label>
                <input readonly type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.published">
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
  