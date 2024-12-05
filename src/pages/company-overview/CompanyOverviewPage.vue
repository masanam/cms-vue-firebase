<script lang="ts">
import { defineComponent } from 'vue';
import { where, query, collection, getDocs, DocumentData, orderBy } from "firebase/firestore";
import {  db } from '../../firebase/firebase';
import TabsComposition from '../../components/TabsComposition.vue';
import TabComposition from '../../components/TabComposition.vue';

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


export default defineComponent({
  name: 'ListBoard',
  components: { TabsComposition, TabComposition },
  data() {
    return {
      companyOverview: [] as companyOverview[],
      companyOverviewID: [] as companyOverview[],
      companyOverviewJP: [] as companyOverview[],
    };
  },
  created() {
    this.getCompanyOverview();
  },
  methods: {
    async getCompanyOverview(): Promise<void> {
      const collectionRef = collection(db, 'companyOverviews');
      const querySnap = await getDocs(query(collectionRef, where("lang", "==", "EN"), orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.companyOverview.push(doc.data() as companyOverview);
      });
      const querySnapID = await getDocs(query(collectionRef, where("lang", "==", "ID"), orderBy('id', 'asc')));
      querySnapID.forEach((doc: DocumentData) => {
        this.companyOverviewID.push(doc.data() as companyOverview);
      });
      const querySnapJP = await getDocs(query(collectionRef, where("lang", "==", "JP"), orderBy('id', 'asc')));
      querySnapJP.forEach((doc: DocumentData) => {
        this.companyOverviewJP.push(doc.data() as companyOverview);
      });

    },
  }
  
});
</script>
<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
    <TabsComposition>
      <TabComposition title="English">
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
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.id }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.country }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.startDate }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.revenue }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.director }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address2 }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.phone }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.business }}
                </td>

                <td class="align-top p-4 border-b border-slate-200">
                  <div class="flex gap-2 justify-end">
                    <router-link :to="{name: 'edit-company-overview', params: { id: item.id }}" class="btn btn-primary">
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
      </TabComposition>
      <TabComposition title="Indonesia">
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
              <tr class="hover:bg-slate-50" tr v-for="item in companyOverviewID" :key="item.id">
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.id }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.country }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.startDate }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.revenue }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.director }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address2 }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.phone }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.business }}
                </td>

                <td class="align-top p-4 border-b border-slate-200">
                  <div class="flex gap-2 justify-end">
                    <router-link :to="{name: 'edit-company-overview', params: { id: item.id }}" class="btn btn-primary">
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
      </TabComposition>
      <TabComposition title="Japan">
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
              <tr class="hover:bg-slate-50" tr v-for="item in companyOverviewJP" :key="item.id">
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.id }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.country }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.startDate }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.revenue }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.director }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.address2 }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.phone }}
                </td>
                <td class="align-top p-4 border-b border-slate-200">
                  {{ item.business }}
                </td>

                <td class="align-top p-4 border-b border-slate-200">
                  <div class="flex gap-2 justify-end">
                    <router-link :to="{name: 'edit-company-overview', params: { id: item.id }}" class="btn btn-primary">
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
      </TabComposition>

    </TabsComposition>

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