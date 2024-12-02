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
            SubTitle
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in achievements" :key="item.id">
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
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-achievement', params: { id: item.id }}" class="btn btn-primary">
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
import { query, collection, getDocs,orderBy,DocumentData } from "firebase/firestore";
import {  db } from '../../firebase/firebase';

interface BusinessPage {
    id: number,
    image:string,
    title: string,
    subTitle: string,
    content:string,
    placeholder:string,
    button: string
}

interface Achievements {
    id: number,
    image: string,
    title: string,
    subTitle: string
}

interface Faqs {
    id: number,
    question: string,
    answer  : string
}

interface OurGateway {
    id: number,
    image: string,
    title: string,
    subTitle: string
}

interface OurProducts {
    id: number,
    image: string,
    title: string,
    subTitle: string
}

interface OurSupports {
    id: number,
    image: string,
    title: string,
    subTitle: string
}

interface Packages {
    id: number,
    image: string,
    title: string,
    subTitle: string,
    scale: string,
    globe: string,
    briefcase: string,
    button: string,
    apps_1: string,
    apps_2: string,
    apps_3: string,
    apps_4: string

}

interface Testimony {
    id: number,
    image: string,
    name: string,
    title: string,
    comment: string
}

export default defineComponent({
  data() {
    return {
      businessPageList: [] as BusinessPage[],
      achievements: [] as Achievements[],
      faqs: [] as Faqs[],
      ourGateway: [] as OurGateway[],
      ourProducts: [] as OurProducts[],
      ourSupports: [] as OurSupports[],
      packages: [] as Packages[],
      testimony: [] as Testimony[],
    };
  },
  created() {
    this.getBusinesPage();
    this.getAchievement();
    this.getFaqs();
    this.getOurGateway();
    this.getOurProducts();
    this.getOurSupports();
    this.getPackages();
    this.getTestimony();
  },
  methods: {
    businessPage(id = 0){
      return this.businessPageList[id] || {}
    },
    async getBusinesPage(): Promise<void> {
      const collectionRef = collection(db, 'businessPages');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.businessPageList.push(doc.data() as BusinessPage);
      });
      console.log(this.businessPageList);
    },
    async getAchievement(): Promise<void> {
      const collectionRef = collection(db, 'achievements');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.achievements.push(doc.data() as Achievements);
      });
    },
    async getFaqs(): Promise<void> {
      const collectionRef = collection(db, 'faqs');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.faqs.push(doc.data() as Faqs);
      });
    },
    async getOurGateway(): Promise<void> {
      const collectionRef = collection(db, 'ourGateways');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ourGateway.push(doc.data() as OurGateway);
      });
    },
    async getOurProducts(): Promise<void> {
      const collectionRef = collection(db, 'ourProducts');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ourProducts.push(doc.data() as OurProducts);
      });
    },
    async getOurSupports(): Promise<void> {
      const collectionRef = collection(db, 'ourSupports');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.ourSupports.push(doc.data() as OurSupports);
      });
    },
    async getPackages(): Promise<void> {
      const collectionRef = collection(db, 'packages');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.packages.push(doc.data() as Packages);
      });
    },
    async getTestimony(): Promise<void> {
      const collectionRef = collection(db, 'testimonies');
      const querySnap = await getDocs(query(collectionRef, orderBy('id', 'asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.testimony.push(doc.data() as Testimony);
      });
    },

  }
  
});
</script>
