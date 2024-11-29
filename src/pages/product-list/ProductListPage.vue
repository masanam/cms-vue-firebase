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
        <router-link :to="{name: 'add-product-list'}" class="btn btn-primary">
        <VaButton class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-2">Add Data</VaButton>
        </router-link>
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
            Sub Title
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Image
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Price
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Button
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Published
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in products" :key="item.id">
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
          {{ item.image }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.price }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.button }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.published.toDate().toDateString() }}
        </td>
        <td class="p-4 border-b border-slate-200">
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-product-list', params: { id: item.id }}" class="btn btn-primary">
              <VaButton
                preset="primary"
                size="medium"
                icon="mso-edit"
                aria-label="Edit data"
              />
            </router-link>
            <VaButton
              preset="primary"
              size="medium"
              icon="mso-delete"
              color="danger"
              aria-label="Delete data"
              @click="deleteData(item.id.toString())"
            />
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
import { deleteDoc, query, collection, getDocs, DocumentData, orderBy, Timestamp, doc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
import { useModal, useToast } from 'vuestic-ui'

interface products {
  id: number,
    image: string,
    title: string,
    price: string,
    subTitle: string,
    button: string,
    published: Timestamp,
}

export default defineComponent({
  data() {
    return {
      products: [] as products[]
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    async getProductList(): Promise<void> {
      const collectionRef = collection(db, 'products');
      const querySnap = await getDocs(query(collectionRef, orderBy('id','desc')));

      querySnap.forEach((doc: DocumentData) => {
        this.products.push(doc.data() as products);
      });
    },

    async deleteData(id: string): Promise<void> {
        const { init: notify } = useToast();
        await deleteDoc(doc(db, "products", id));
        notify({
          message: `data has been deleted`,
          color: 'success',
        });
        setTimeout(() => location.reload(), 1000);
        
      }
  }
  
});
</script>
