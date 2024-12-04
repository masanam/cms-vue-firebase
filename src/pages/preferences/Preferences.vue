<template>
  <h1 class="page-title">Preferences</h1>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import PreferencesHeader from './preferences-header/PreferencesHeader.vue'
import Settings from './settings/Settings.vue'
import EditNameModal from './modals/EditNameModal.vue'
import ResetPasswordModal from './modals/ResetPasswordModal.vue'

const isEditNameModalOpen = ref(false)
const isResetPasswordModalOpen = ref(false)
</script>
