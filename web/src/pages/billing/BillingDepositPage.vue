<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12">
        <div class="row">
          <q-card id="deposit-box" class="my-card fit">
            <q-card-section>
              <div class="text-h6">Nạp tiền</div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div class="text-subtitle1 q-pl-sm">Chọn nhanh số tiền cần nạp</div>
              <div class="row">
                <div v-for="option in predefinedDepositOptions" :key="option.amount"
                     class="col col-xs-12 col-md-4 q-pa-sm">
                  <q-btn flat class="fit deposit-option-box bg-grey-3 text-center justify-center q-pa-lg q-hoverable"
                         @click="requestTopUp(option.amount)">
                    {{ option.amount.toLocaleString() + ' VNĐ' }}
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div class="text-subtitle1 q-pl-sm">Chọn số tiền muốn nạp</div>
              <div class="row">
                <q-input outlined type="number" suffix="VNĐ" v-model="customDeposit" class="q-pl-sm">
                  <template v-slot:append>
                    <div class="row">
                      <q-btn class="bg-primary text-white" flat label="Nạp tiền"
                             @click="requestTopUp(Number(customDeposit))"/>
                    </div>
                  </template>
                </q-input>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-xs-12">
        <q-card class="my-card fit">
          <q-card-section>
            <div class="text-h6">Lịch sử nạp tiền</div>
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
                  @row-click="onRowClick"
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

<style>
.tooltip-style {
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  background-color: #000;
  border-radius: 4px;
  padding: 8px;
  max-width: 200px;
}

</style>

<script>
import { computed, onMounted, ref, toRaw } from 'vue'
import { date, useQuasar } from 'quasar'
import TopUpComponent from 'components/TopUpComponent.vue'
import { usePaymentStore } from 'src/stores/payment-store'

export default {
  // name: 'PageName',
  setup () {
    const $q = useQuasar()
    const paymentStore = usePaymentStore()
    const paymentInfo = ref([])
    const formatDate = (strDate) => {
      const timeStamp = new Date(strDate)      
      return date.formatDate(timeStamp, 'HH:mm DD-MM-YYYY')
    }
    const columns = [
  {
    name: 'description',
    required: true,
    label: 'Mã thanh toán',
    align: 'left',
    sortable: true,
    field: 'description'
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Ngày Tạo',
    align: 'left',
    sortable: true,
    field: row => formatDate(row.createdAt)
  },
  {
    name: 'exceptedAt',
    required: true,
    label: 'Hết hạn thanh toán',
    align: 'left',
    sortable: true,
    field: row => formatDate(row.exceptedAt)
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
  {
    name: 'status',
    align: 'left',
    label: 'Trạng thái',
    field: (row) => {
      if (row.exceptedAt < new Date() && row.status === 'pending') {
        return "Đã hết hạn";
      }

      let result;
      switch (row.status) {
        case 'success':
          result = "Thanh toán thành công";
          break;
        case 'cancel':
          result = 'Đã hủy';
          break;
        case 'pending':
          result = "Đang đợi thanh toán";
          break;
        default:
          result = "Không khả dụng";
      }

      return result;
    }
  }
];


    const predefinedDepositOptions = [
      {
        amount: 50000
      },
      {
        amount: 100000
      },
      {
        amount: 200000
      },
      {
        amount: 500000
      },
      {
        amount: 1000000
      },
      {
        amount: 2000000
      }
    ]
    const depositAmount = ref(null)

    onMounted(() => {
      try {
        paymentStore.fetchUrlPayment(()=>{
          paymentInfo.value =toRaw( paymentStore.paymentInfo)      
        })
      } catch (error) {
        console.error('Error fetching balance or projects:', error);
      }
    })

    const requestTopUp = (depositAmount) => {
      paymentStore.payment(depositAmount)
      
    }

    const tableRows = computed(() => toRaw(paymentInfo.value));

    const onRowClick = (_, row) => {      
      
      if (row.paymentUrl && row.exceptedAt>row.createdAt && row.status ==='pending') {
        window.location.href = row.paymentUrl;
      }
    };

    const customDeposit = ref(0)
    return {
      tableRows,
      columns,
      customDeposit,
      predefinedDepositOptions,
      paymentInfo,
      depositAmount,
      onRowClick,
      requestTopUp
    }
  }
}
</script>
