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
            Country
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Start Date
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Revenue
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Director
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Address
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Address 2
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Phone
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Bussines
        </th>

        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in companyOverview" :key="item.id">
        <td class="p-4 border-b border-slate-200">
          {{ item.id }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.country }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.startDate }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.revenue }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.director }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.address }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.address2 }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.phone }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.business }}
        </td>

        <td class="p-4 border-b border-slate-200">
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-company-overview', params: { id: item.id }}" class="btn btn-primary">
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

interface aboutPage {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    content: string,
    placeholder: string,
    button: string,
}

interface ourMission {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    subTitle2: string
}

interface companyOverview {
    id: number,
    country: string,
    startDate: string,
    revenue: string,
    director: string,
    address: string,
    address2: string,
    phone: string,
    business: string,
}

interface ourCommitment {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    subTitle2: string,
    subTitle3: string,
    subTitle4: string,
  }


export default defineComponent({
  data() {
    return {
      aboutPageList: [] as aboutPage[],
      ourMission: [] as ourMission[],
      companyOverview: [] as companyOverview[],
      ourCommitment: [] as ourCommitment[]
    };
  },
  created() {
    this.getAboutPage();
    this.getOurMission();
    this.getCompanyOverview();
    this.getOurCommitment();
  },
  methods: {
    aboutPage(id = 0){
      return this.aboutPageList[id] || {}
    },
    async getAboutPage(): Promise<void> {
      const collectionRef = collection(db, 'aboutPages');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.aboutPageList.push(doc.data() as aboutPage);
      });
      console.log(this.aboutPageList);
    },
    async getOurMission(): Promise<void> {
      const collectionRef = collection(db, 'ourMissions');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ourMission.push(doc.data() as ourMission);
      });
    },
    async getCompanyOverview(): Promise<void> {
      const collectionRef = collection(db, 'companyOverviews');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.companyOverview.push(doc.data() as companyOverview);
      });
    },
    async getOurCommitment(): Promise<void> {
      const collectionRef = collection(db, 'ourCommitments');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ourCommitment.push(doc.data() as ourCommitment);
      });
    }
  }
  
});
</script>
