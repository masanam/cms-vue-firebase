<script lang="ts">
import { defineComponent } from 'vue';
import { where, query, collection, getDocs, DocumentData, orderBy } from "firebase/firestore";
import {  db } from '../../firebase/firebase';
import TabsComposition from '../../components/TabsComposition.vue';
import TabComposition from '../../components/TabComposition.vue';

interface ProductPage {
    id : number,
    image : string,
    title : string,
    subTitle: string,
    content: string,
    placeholder: string,
    button: string,
    button_2: string,
    link: string,
    link_2: string
    }

export default defineComponent({
  name: 'ListBoard',
  components: { TabsComposition, TabComposition },
  data() {
    return {
      productPageList: [] as ProductPage[],
      productPageListID: [] as ProductPage[],
      productPageListJP: [] as ProductPage[],
    };
  },
  created() {
    this.getProductPage();
  },
  methods: {
    productPage(id = 0){
      return this.productPageList[id] || {}
    },
    async getProductPage(): Promise<void> {
      const collectionRef = collection(db, 'productPages');
      const querySnap = await getDocs(query(collectionRef, where("lang", "==", "EN"), orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.productPageList.push(doc.data() as ProductPage);
      });
      const querySnapID = await getDocs(query(collectionRef, where("lang", "==", "ID"), orderBy('id', 'asc')));
      querySnapID.forEach((doc: DocumentData) => {
        this.productPageListID.push(doc.data() as ProductPage);
      });
      const querySnapJP = await getDocs(query(collectionRef, where("lang", "==", "JP"), orderBy('id', 'asc')));
      querySnapJP.forEach((doc: DocumentData) => {
        this.productPageListJP.push(doc.data() as ProductPage);
      });

      // console.log(this.frontPageList);
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
                  Button
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in productPageList" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.title }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.subTitle }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.content }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.image }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.placeholder }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button_2 }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link_2 }}
              </td>

              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-product-page', params: { id: item.id }}" class="btn btn-primary">
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
                  Button
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in productPageListID" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.title }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.subTitle }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.content }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.image }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.placeholder }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button_2 }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link_2 }}
              </td>

              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-product-page', params: { id: item.id }}" class="btn btn-primary">
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
                  Button
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Link
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in productPageListJP" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.title }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.subTitle }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.content }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.image }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.placeholder }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.button_2 }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.link_2 }}
              </td>

              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-product-page', params: { id: item.id }}" class="btn btn-primary">
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
