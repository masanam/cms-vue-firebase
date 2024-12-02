<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
    <table class="text-left table-auto border-collapse">
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
            SubTitle
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Content
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Image
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Placeholder
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Button
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in joinPageList" :key="item.id">
        <td class="p-4 border-b border-slate-200">
          {{ item.id }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.title }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.subTitle }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.content }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.image }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.placeholder }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.button }}
        </td>


        <td class="p-4 border-b border-slate-200">
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-join-page', params: { id: item.id }}" class="btn btn-primary">
              <VaButton
                preset="primary"
                size="medium"
                icon="mso-edit"
                aria-label="Edit data"
              />
            </router-link>
            <!-- <VaButton
              preset="primary"
              size="medium"
              icon="mso-delete"
              color="danger"
              aria-label="Delete data"
              @click=""
            /> -->
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
import {  db } from '../../firebase/firebase';

interface JoinPage {
    id : number,
    image: string,
    title: string,
    subTitle: string,
    content: string,
    placeholder: string,
    button: string,
    }

interface Job {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    content: string,
    placeholder: string,
    button: string,
}

export default defineComponent({
  data() {
    return {
      joinPageList: [] as JoinPage[],
      jobs: [] as Job[]
    };
  },
  created() {
    this.getJoinPage();
    this.getJob();
  },
  methods: {
    joinPage(id = 0){
      return this.joinPageList[id] || {}
    },
    async getJoinPage(): Promise<void> {
      const collectionRef = collection(db, 'joinPages');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.joinPageList.push(doc.data() as JoinPage);
      });
      // console.log(this.frontPageList);
    },
    async getJob(): Promise<void> {
      const collectionRef = collection(db, 'jobs');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.jobs.push(doc.data() as Job);
      });
    },
  }
  
});
</script>
