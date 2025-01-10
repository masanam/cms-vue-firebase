
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {  db, storage } from '../../firebase/firebase';
import { useRoute } from 'vue-router';
import { where, serverTimestamp, DocumentData, doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { useModal, useToast, VaSelect } from 'vuestic-ui'
import { ref as storageRef , uploadBytesResumable, getDownloadURL } from 'firebase/storage'

interface Category {
    id : number,
    name: string,
    link: string,
    }

export default defineComponent({
  name: 'AddBoard',
  data () {
    return {
      file: ref<File | null>(null),
      categories: [] as Category[],
      countries:[
        {title: 'English', code: 'EN'},
        {title: 'Indonesia', code: 'ID'},
        {title: 'Japan', code: 'JP'},
      ],
      board: {
        id:"",
        image: "",
        title: "",
        subTitle: "",
        category: "",
        content: "",
        view: "",
        comment: "",
        published: "",
        lang: "",
        author: "",
        active: "",
      },
    }
  },
  created () {
    this.getCategory();
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

    async onSubmit (evt: { preventDefault: () => void; }) {
      evt.preventDefault()
      const { init: notify } = useToast()
      const collectionRef = collection(db, 'blogs');
      const q = query(collectionRef, where("lang", "==", this.board.lang));
      const snapshot = await getCountFromServer(q);
      let newInc = snapshot.data().count + 1;
      let newUid = "";

      switch(this.board.lang) {
          case "ID":
          newInc = snapshot.data().count + 2001;
          newUid = "ID"+newInc.toString();
            break;
          case "JP":
          newInc = snapshot.data().count + 3001;
          newUid = "JP"+newInc.toString();
            break;
          default:
          newInc = snapshot.data().count + 1001;
          newUid = "EN"+newInc.toString();
        }
      
      // console.log('count: ', newUid);

      await setDoc(doc(db, 'blogs', newUid), {
          id: newUid.toString(),
          image: this.board.image,
          title: this.board.title,
          subTitle: this.board.subTitle,
          category: this.board.category,
          content: this.board.content,
          published: serverTimestamp(),
          view: this.board.view,
          comment: this.board.comment,
          lang: this.board.lang,
          author: this.board.author,
          active: "1",
      })

      notify({
        message: `data has been created`,
        color: 'success',
      })

      this.$router.push({ name: 'blog-page' })
    },
    async getCategory(): Promise<void> {
      const collectionRef = collection(db, 'categories');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.categories.push(doc.data() as Category);
      });
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
          Add data
      </h3>
  </div>
  <form @submit.prevent="onSubmit">

  <div class="p-6 space-y-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-full">
                <label for="subtitle" class="text-sm font-medium text-gray-900 block mb-2">Category</label>
                <v-select density="comfortable"
                    v-model="board.category" :items="categories" item-title="name" item-value="name"
                    :rules="[(v) => !!v || 'Category is required']"
                    required
                    />
              </div>
              <div class="col-span-full">
                  <label for="author" class="text-sm font-medium text-gray-900 block mb-2">Author</label>
                  <input type="text" name="author" id="author" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.author">
              </div>
              <div class="col-span-full">
                  <label for="title" class="text-sm font-medium text-gray-900 block mb-2">Title</label>
                  <input type="text" name="title" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.title">
              </div>

              <div class="col-span-full">
                  <label for="content" class="text-sm font-medium text-gray-900 block mb-2">Sub Title</label>
                  <textarea id="content" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="board.subTitle">{{board.subTitle}}</textarea>
              </div>

              <div class="col-span-full">
                  <label for="content" class="text-sm font-medium text-gray-900 block mb-2">Content</label>
                  <div>
                    <QuillEditor v-model:content="board.content" contentType="html" theme="snow" style="height: 200px"/>
                  </div>
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
              
              <!-- <div class="col-span-full">
                <label for="view" class="text-sm font-medium text-gray-900 block mb-2">View</label>
                <input type="text" name="view" id="view" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.view" >
              </div>
              <div class="col-span-full">
                <label for="comment" class="text-sm font-medium text-gray-900 block mb-2">Comment</label>
                <input type="text" name="comment" id="comment" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.view" >
              </div> -->

              <div class="col-span-full">
                <label for="lang" class="text-sm font-medium text-gray-900 block mb-2">Language</label>
                <v-select density="comfortable"
                v-model="board.lang" :items="[
                    {name: 'English', code: 'EN'},
                    {name: 'Indonesia', code: 'ID'},
                    {name: 'Japan', code: 'JP'},
                    ]" item-title="name" item-value="code"
                    :rules="[(v) => !!v || 'Language is required']"
                    required
                    />
              </div>

              <!-- <div class="col-span-full">
                <label for="placeholder" class="text-sm font-medium text-gray-900 block mb-2">Published</label>
                <input readonly type="text" name="placeholder" id="placeholder" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" v-model="board.published">
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
  