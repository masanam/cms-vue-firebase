<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { Frontpage } from '../types'
// import FrontpageAvatar from './FrontpageAvatar.vue'
import { PropType, computed, toRef } from 'vue'
import { Pagination, Sorting } from '../../../data/pages/users'
import { useVModel } from '@vueuse/core'
import { Project } from '../../projects/types'

const columns = defineVaDataTableColumns([
  { label: 'Full Name', key: 'title', sortable: true },
  { label: 'Email', key: 'content', sortable: true },
  { label: 'Frontpagename', key: 'subTitle', sortable: true },
  { label: 'Role', key: 'role', sortable: true },
  { label: 'Projects', key: 'projects', sortable: true },
  { label: ' ', key: 'actions', align: 'right' },
])

const props = defineProps({
  frontpages: {
    type: Array as PropType<Frontpage[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, default: null },
})

const emit = defineEmits<{
  (event: 'edit-frontpage', frontpage: Frontpage): void
  (event: 'delete-frontpage', frontpage: Frontpage): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const frontpages = toRef(props, 'frontpages')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const { confirm } = useModal()

const onFrontpageDelete = async (frontpage: Frontpage) => {
  const agreed = await confirm({
    title: 'Delete frontpage',
    message: `Are you sure you want to delete ${frontpage.title}?`,
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-frontpage', frontpage)
  }
}

const formatProjectNames = (projects: Project[]) => {
  if (projects.length === 0) return 'No projects'
  if (projects.length <= 2) {
    return projects.map((project) => project).join(', ')
  }

  return (
    projects
      .slice(0, 2)
      .map((project) => project)
      .join(', ') +
    ' + ' +
    (projects.length - 2) +
    ' more'
  )
}
</script>

<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="frontpages"
    :loading="$props.loading"
  >
    <template #cell(title)="{ rowData }">
      <div class="flex items-center gap-2 max-w-[230px] ellipsis">
        <FrontpageAvatar :frontpage="rowData as Frontpage" size="small" />
        {{ rowData.title }}
      </div>
    </template>

    <template #cell(subTitle)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.subTitle }}
      </div>
    </template>

    <template #cell(content)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.content }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit frontpage"
          @click="$emit('edit-frontpage', rowData as Frontpage)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete frontpage"
          @click="onFrontpageDelete(rowData as Frontpage)"
        />
      </div>
    </template>
  </VaDataTable>

  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>{{ $props.pagination.total }} results.</b>
      Results per page
      <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
    </div>

    <div v-if="totalPages > 1" class="flex">
      <VaButton
        preset="secondary"
        icon="va-arrow-left"
        aria-label="Previous page"
        :disabled="$props.pagination.page === 1"
        @click="$props.pagination.page--"
      />
      <VaButton
        class="mr-2"
        preset="secondary"
        icon="va-arrow-right"
        aria-label="Next page"
        :disabled="$props.pagination.page === totalPages"
        @click="$props.pagination.page++"
      />
      <VaPagination
        v-model="$props.pagination.page"
        buttons-preset="secondary"
        :pages="totalPages"
        :visible-pages="5"
        :boundary-links="false"
        :direction-links="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
