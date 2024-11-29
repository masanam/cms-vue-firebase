<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
    <table class="w-full text-left table-auto border-collapse">
      <caption class="caption-top p-4 border-b">
        <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaInput placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <!-- <VaButton class="p-2">Add Data</VaButton> -->
      </div>
  </caption>
    <thead>
      <tr>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Id
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Title
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Icon
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Number
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in globalList" :key="item.id">
        <td class="p-4 border-b border-slate-200">
          {{ item.id }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.title }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.icon }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.number }}
        </td>
        <td class="p-4 border-b border-slate-200">
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-global-list', params: { id: item.id }}" class="btn btn-primary">
              <VaButton
                preset="primary"
                size="medium"
                icon="mso-edit"
                aria-label="Edit data"
              />
            </router-link>
      </div>
        </td>
      </tr>
    </tbody>
  </table>

    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center p-2">
    <div>
      Results per page
      <VaSelect  class="!w-20" :options="[10, 50, 100]" />
    </div>

    <div class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
      />
      <VaPagination
        buttons-preset="secondary"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>

</div>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { query, collection, getDocs, DocumentData, orderBy } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';

interface Frontpage {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    content: string,
    placeholder: string,
    button: string
}

interface globalList {
    id: number,
    icon: string,
    title: string,
    number: string
}

interface companyValue {
    id: number,
    icon: string,
    title: string,
    subTitle: string
}

interface ecosystem {
    id: number,
    title: string,
    subTitle: string
}

interface latestNews {
    id: number,
    image: string,
    category: string,
    title: string,
    author: string,
    published: string,
    content: string
}

export default defineComponent({
  data() {
    return {
      frontPageList: [] as Frontpage[],
      globalList: [] as globalList[],
      companyValues: [] as companyValue[],
      ecosystem: [] as ecosystem[],
      latestNews: [] as latestNews[]
    };
  },
  created() {
    this.getFrontPage();
    this.getGlobalList();
    this.getCompanyValue();
    this.getEcoSystem();
    this.getLatestNews();
  },
  methods: {
    frontPage(id = 0){
      return this.frontPageList[id] || {}
    },
    async getFrontPage(): Promise<void> {
      const collectionRef = collection(db, 'frontpages');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.frontPageList.push(doc.data() as Frontpage);
      });
      // console.log(this.frontPageList);
    },
    async getGlobalList(): Promise<void> {
      const collectionRef = collection(db, 'globallists');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.globalList.push(doc.data() as globalList);
      });
    },
    async getCompanyValue(): Promise<void> {
      const collectionRef = collection(db, 'companyValues');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.companyValues.push(doc.data() as companyValue);
      });
    },
    async getEcoSystem(): Promise<void> {
      const collectionRef = collection(db, 'ecosystem');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ecosystem.push(doc.data() as ecosystem);
      });
    },
    async getLatestNews(): Promise<void> {
      const collectionRef = collection(db, 'latestNews');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.latestNews.push(doc.data() as latestNews);
      });
    }
  }
  
});
</script>
