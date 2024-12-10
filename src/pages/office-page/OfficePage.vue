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
        <router-link :to="{name: 'add-office-page'}" class="btn btn-primary">
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
            Country
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Address
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
          Address
        </th>
        <th class="p-4 border-b border-slate-300 bg-slate-50">
            Action        
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-slate-50" tr v-for="item in offices" :key="item.id">
        <td class="p-4 border-b border-slate-200">
          {{ item.id }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.country }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.address }}
        </td>
        <td class="p-4 border-b border-slate-200">
          {{ item.address2 }}
        </td>
        <td class="p-4 border-b border-slate-200">
          <div class="flex gap-2 justify-end">
            <router-link :to="{name: 'edit-office-page', params: { id: item.id }}" class="btn btn-primary">
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

<script setup lang="ts">
  import { useModal, useToast } from 'vuestic-ui'
  const { confirm } = useModal()
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { deleteDoc, query, collection, getDocs, DocumentData, orderBy, Timestamp, doc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';

interface offices {
    id: number,
    country: string,
    address: string,
    address2: string,
}

export default defineComponent({
  data() {
    return {
      offices: [] as offices[]
    };
  },
  created() {
    this.getLatestNews();
  },
  methods: {
    async getLatestNews(): Promise<void> {
      const collectionRef = collection(db, 'offices');
      const querySnap = await getDocs(query(collectionRef, orderBy('id','asc')));

      querySnap.forEach((doc: DocumentData) => {
        this.offices.push(doc.data() as offices);
      });
    },

    async deleteData(id: string): Promise<void> {
      const { init: notify } = useToast();
      const result = await confirm('Are you really sure you want to delete this?')
        if (result) {
              await deleteDoc(doc(db, "offices", id));
              setTimeout(() => location.reload(), 500);
              notify({ message: 'Data has been deleted', color: 'success' });
          } 
    }
  
  }
  
});
</script>
