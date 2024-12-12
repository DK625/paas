<template>
  <q-page padding>
    <div class="row q-mt-md">
      <div id="invoices-box" class="col-xs-12">
        <q-card class="my-card fit">
          <q-card-section>
            <div class="text-h6">Biến động số dư</div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-xs-12">
                <q-table
                  flat
                  :rows="tableRows"
                  :columns="columns"
                  row-key="_id"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator/>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'

import AjaxTableComponent from 'components/AjaxTableComponent.vue'
import { computed, onMounted, ref, toRaw, watch } from 'vue'
import { usePaymentStore } from 'src/stores/payment-store'

export default {
  name: 'BillingTransactionPage',
  components: { AjaxTableComponent },
  setup () {
    const paymentStore = usePaymentStore()
    const transaction = ref([])
    const formatDate = (strDate) => {
      const timeStamp = new Date(strDate)      
      return date.formatDate(timeStamp, 'HH:mm DD-MM-YYYY')
    }
    const columns = [
      {
        name: 'createdAt',
        required: true,
        label: 'Ngày Tạo',
        align: 'left',
        sortable: true,
        field: row => formatDate(row.createdAt)
      },
      {
        name: 'amount',
        align: 'left',
        label: 'Số tiền',
        field: (row) => {
          return Number(row.amount).toLocaleString() + ' VND'
        },
        sortable: true
      },
      { name: 'description', align: 'left', label: 'Mô tả', field: 'description' }
    ]

    onMounted(() => {
      try {
        paymentStore.fetchTransactions(()=>{
          transaction.value =toRaw( paymentStore.transactions)  
          console.log(transaction.value);
              
        })
      } catch (error) {
        console.error('Error fetching balance or projects:', error);
      }
    })

    const tableRows = computed(() => toRaw(transaction.value));
    console.log('tableRows', tableRows);
    

    return {
      columns,
      tableRows
    }
  }
}
</script>
