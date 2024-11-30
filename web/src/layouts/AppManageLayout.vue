<template>
  <q-layout>

    <q-drawer v-model="openDrawer" side="left" elevated>
      <q-list
        bordered
        link
        class="text-black"
      >
        <q-item
          v-for="item in items"
          :key="item.name"
          clickable
          v-ripple
          :to="item.to"
          :active="link === item.name"
          active-class="my-menu-link"
          @click="link = item.name"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon"/>
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMemberStore } from 'stores/members-store'
import { useAuth0 } from '@auth0/auth0-vue'
import { useProjectStore } from 'src/stores/project-store'

export default {
  // name: 'PageName',
  setup () {
    const auth0 = useAuth0()
    const route = useRoute()
    const projectStore = useProjectStore()
    const memberStore = useMemberStore()
    const link = ref(route.name)
    watch(() => route.name, (newVal) => {
      link.value = newVal
    })
    const currentUser = ref(auth0.user)
    
      const { activeProject } = storeToRefs(projectStore)
    const { listMembers, numberOfPages } = storeToRefs(memberStore)
    
    const items = [
      {
        name: 'project.apps.overview',
        label: 'Thông tin chung',
        icon: 'o_radar',
        to: { name: 'project.apps.overview' }
      },
      {
        name: 'project.apps.activity',
        label: 'Lịch sử hoạt động',
        icon: 'o_history',
        to: { name: 'project.apps.activity' }
      },
      {
        name: 'project.apps.logs',
        label: 'Logs',
        icon: 'o_manage_search',
        to: { name: 'project.apps.logs' }
      }
    ]

    if(listMembers.value[0] && listMembers.value[0].role === 'owner'){
      items.push(...[
      {
        name: 'project.apps.env',
        label: 'Biến môi trường',
        icon: 'o_toggle_on',
        to: { name: 'project.apps.env' }
      },
      {
        name: 'project.apps.deploy',
        label: 'Triển khai',
        icon: 'o_rocket',
        to: { name: 'project.apps.deploy' }
      },
      {
        name: 'project.apps.settings',
        label: 'Xoá ứng dụng',
        icon: 'o_delete_forever',
        to: { name: 'project.apps.settings' }
      }])
    }
    const openDrawer = ref(true)

    onMounted(() => {
      return reloadMembers()
    })

    const reloadMembers = () => {
      memberStore.fetchMembers(activeProject.value.id, 1, currentUser.value.name, () => {})
    }
    return {
      openDrawer,
      items,
      link
    }
  }
}
</script>
