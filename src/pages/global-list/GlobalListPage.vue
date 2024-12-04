<script lang="ts">
import { defineComponent } from 'vue';
import { query, collection, getDocs, DocumentData, orderBy, where } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
import TabsComposition from '../../components/TabsComposition.vue';
import TabComposition from '../../components/TabComposition.vue';

interface globalList {
    id: number,
    icon: string,
    title: string,
    number: string
}

export default defineComponent({
  name: 'ListBoard',
  components: { TabsComposition, TabComposition },
  data() {
    return {
      globalList: [] as globalList[],
      globalListID: [] as globalList[],
      globalListJP: [] as globalList[],

    };
  },
  created() {
    this.getGlobalList();
  },
  methods: {
    async getGlobalList(): Promise<void> {
      const collectionRef = collection(db, 'globallists');
      const querySnap = await getDocs(query(collectionRef, where("lang", "==", "EN"), orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.globalList.push(doc.data() as globalList);
      });
      const querySnapID = await getDocs(query(collectionRef, where("lang", "==", "ID"), orderBy('id', 'asc')));
      querySnapID.forEach((doc: DocumentData) => {
        this.globalListID.push(doc.data() as globalList);
      });
      const querySnapJP = await getDocs(query(collectionRef, where("lang", "==", "JP"), orderBy('id', 'asc')));
      querySnapJP.forEach((doc: DocumentData) => {
        this.globalListJP.push(doc.data() as globalList);
      });

    },
  }
  
});
</script>

<template>
  <div class="bg-white border border-4 rounded-lg shadow relative m-4">
    <TabsComposition>
      <TabComposition title="English">
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
        </TabComposition>
        <TabComposition title="Indonesia">
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
              <tr class="hover:bg-slate-50" tr v-for="item in globalListID" :key="item.id">
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

        </TabComposition>
        <TabComposition title="Japan">
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
              <tr class="hover:bg-slate-50" tr v-for="item in globalListJP" :key="item.id">
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

