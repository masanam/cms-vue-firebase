<script setup lang="ts">
  import { useModal, useToast } from 'vuestic-ui'
  const { confirm } = useModal()
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { where, deleteDoc, query, collection, getDocs, DocumentData, orderBy, Timestamp, doc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
import TabsComposition from '../../components/TabsComposition.vue';
import TabComposition from '../../components/TabComposition.vue';

interface faqs {
    id: number,
    question: string,
    answer: string,
}

export default defineComponent({
  name: 'ListBoard',
  components: { TabsComposition, TabComposition },
  data() {
    return {
      faqs: [] as faqs[],
      faqsID: [] as faqs[],
      faqsJP: [] as faqs[]

    };
  },
  created() {
    this.getFaqs();
  },
  methods: {
    async getFaqs(): Promise<void> {
      const collectionRef = collection(db, 'faqs');
      const querySnap = await getDocs(query(collectionRef, where("lang", "==", "EN"), orderBy('id', 'asc')));
      querySnap.forEach((doc: DocumentData) => {
        this.faqs.push(doc.data() as faqs);
      });
      const querySnapID = await getDocs(query(collectionRef, where("lang", "==", "ID"), orderBy('id', 'asc')));
      querySnapID.forEach((doc: DocumentData) => {
        this.faqsID.push(doc.data() as faqs);
      });
      const querySnapJP = await getDocs(query(collectionRef, where("lang", "==", "JP"), orderBy('id', 'asc')));
      querySnapJP.forEach((doc: DocumentData) => {
        this.faqsJP.push(doc.data() as faqs);
      });

    },

    async deleteData(id: string): Promise<void> {
      const { init: notify } = useToast();
      const result = await confirm('Are you really sure you want to delete this?')
        if (result) {
              await deleteDoc(doc(db, "faqs", id));
              setTimeout(() => location.reload(), 500);
              notify({ message: 'Data has been deleted', color: 'success' });
          } 
    }
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
              <router-link :to="{name: 'add-faq-page'}" class="btn btn-primary">
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
                  Question
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Answer
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in faqs" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.question }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.answer }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-faq-page', params: { id: item.id }}" class="btn btn-primary">
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
              <router-link :to="{name: 'add-faq-page'}" class="btn btn-primary">
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
                  Question
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Answer
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in faqsID" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.question }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.answer }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-faq-page', params: { id: item.id }}" class="btn btn-primary">
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
              <router-link :to="{name: 'add-faq-page'}" class="btn btn-primary">
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
                  Question
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Answer
              </th>
              <th class="p-4 border-b border-slate-300 bg-slate-50">
                  Action        
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50" tr v-for="item in faqsJP" :key="item.id">
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.id }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.question }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                {{ item.answer }}
              </td>
              <td class="align-top p-4 border-b border-slate-200">
                <div class="flex gap-2 justify-end">
                  <router-link :to="{name: 'edit-faq-page', params: { id: item.id }}" class="btn btn-primary">
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
