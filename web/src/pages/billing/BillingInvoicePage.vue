<template>
  <q-page padding>
    <div class="row q-mt-md">
      <div id="invoices-box" class="col-xs-12">
        <q-card class="my-card fit">
          <q-card-section>
            <div class="text-h6">Danh sách hóa đơn</div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-xs-12">
                <q-table
                  flat
                  :rows="tableRows"
                  :columns="columns"
                  row-key="invoice_id"
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
import { date, useQuasar } from 'quasar'
import { usePaymentStore } from 'src/stores/payment-store'
import { computed, onMounted, ref, toRaw } from 'vue'

export default {
  name: 'BillingInvoicePage',
  setup () {
    const $q = useQuasar()
    const paymentStore = usePaymentStore()
    const bills = ref([])
    const formatDate = (strDate) => {
      const timeStamp = Date(strDate)
      return date.formatDate(timeStamp, 'HH:mm:ss DD/MM/YYYY Z')
    }
    const columns = [
      {
        name: 'code',
        required: true,
        label: 'Mã thanh toán',
        align: 'left',
        sortable: true,
        field: "code"
      },
      { name: 'start', align: 'left', label: 'Ngày bắt đầu', field: (row)=>{
        return formatDate(row.start)
      } },
      { name: 'end', align: 'left', label: 'Ngày kết thúc', field: (row)=>{
        return formatDate(row.end)
      } },{
        name: 'amount',
        required: true,
        label: 'Số tiền',
        align: 'left',
        sortable: true,
        field: (row)=>{
          return Number(row.amount).toLocaleString() + ' VND'

        }
      },
      {
        name: 'description',
        required: true,
        label: 'Thông tin thanh toán',
        align: 'left',
        sortable: true,
        field: "description"
      },
      {
        name: 'createdAt',
        required: true,
        label: 'Ngày thanh toán',
        align: 'left',
        sortable: true,
        field: (row)=>{
          return formatDate(row.createdAt)
        }
      }
     
    ]

    onMounted(() => {
      try {
        paymentStore.fetchBill(()=>{
          console.log(paymentStore.bills);
          
          bills.value =toRaw( paymentStore.bills)      
        })
      } catch (error) {
        console.error('Error fetching bills or projects:', error);
      }
    })

    const tableRows = computed(() => {
      console.log(bills.value);
      
      return toRaw(bills.value)
    });
    console.log(tableRows);
    

    return {
      columns,
      tableRows,
    }
  }
}
</script>
