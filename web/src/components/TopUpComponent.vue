<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <q-card-section v-if="transactionConfirmed">
        <div v-if="transactionSucceeded" class="col-xs-12 text-center">
          <q-icon name="verified" size="12rem" color="positive"></q-icon>
          <div class="text-h6">Nạp tiền thành công</div>
        </div>
        <div v-else class="col-xs-12 text-center">
          <q-icon name="new_releases" size="12rem" color="negative"></q-icon>
          <div class="text-h6">Nạp tiền thất bại</div>
          <div class="text-caption">Lý do: giao dịch bị hủy</div>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <q-card-section>
          <div class="text-h6">Thông tin chuyển khoản</div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12">
              <q-img :src="imageUrl" spinner-color="primary" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-sm">
          <q-btn class="bg-grey-2 text-grey-8" flat label="Hủy giao dịch" @click="onCancelClick" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  props: {
    depositAmount: {
      type: Number,
      required: true
    }
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const transactionConfirmed = ref(false)
    const transactionSucceeded = ref(null)
    const onCancelClick = () => {
      transactionConfirmed.value = true
      transactionSucceeded.value = false
      setTimeout(() => {
        onDialogCancel()
      }, 2000)
    }

    const imageUrl = 'data:image/gif;base64,='
    return {
      dialogRef,
      onDialogHide,
      props,
      onCancelClick,
      imageUrl,
      transactionConfirmed,
      transactionSucceeded
    }
  }
}
</script>
