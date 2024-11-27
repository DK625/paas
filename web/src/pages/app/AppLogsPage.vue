<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12">
        <div class="row">
          <q-card id="deposit-box" class="my-card fit">
            <q-card-section>
              <div class="text-h6">Logs</div>
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-pa-none">
              <div class="row">
                <div class="col-xs-12 window-height text-green-5 q-pa-sm log-box">
                  <iframe
                    v-if="iframeUrl"
                    class="fit"
                    :src="iframeUrl"
                    frameborder="0"
                  />
                  <div v-else class="text-center">
                    <q-spinner-dots color="primary" size="40" />
                    <div>Loading logs...</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AppLogsPage',
  setup () {
    const route = useRoute()
    const appId = ref(route.params.appId)
    const iframeUrl = ref(null)


    // IP của nginx server
    const GRAFANA_URL = 'http://10.3.93.242'

    const fetchDashboard = async () => {
      try {
        

        iframeUrl.value = `${GRAFANA_URL}/d/de4ttafvgwohsf/app-log?orgId=1&var-appname=${appId.value}&refresh=10s&from=now-1h&to=now&kiosk=embedded&theme=light`


      } catch (error) {
        console.error('Error fetching dashboard:', error)
        // Có thể thêm xử lý lỗi ở đây (hiển thị thông báo lỗi, etc.)
      }
    }

    onMounted(() => {
      fetchDashboard()
    })

    return {
      iframeUrl,
      appId
    }
  }
}
</script>

<style scoped>
.log-box {
  height: calc(100vh - 200px); /* Điều chỉnh chiều cao phù hợp */
  overflow: hidden;
}

.fit {
  width: 100%;
  height: 100%;
  border: none;
}

/* Thêm loading spinner styles nếu cần */
.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}
</style>
