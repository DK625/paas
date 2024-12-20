import { defineStore } from 'pinia'
import { apiPayment } from 'app/src/boot/axios'
import { auth0 } from 'app/auth0'

export const usePaymentStore = defineStore('payment',{
  state: () => ({
    balance: 0,
    costUsed:0,
    estimatedCost:0,
    estimatedTime:new Date(),
    transactions:[],
    paymentInfo:[],
    bills:[]
  }),

  getters: {
  },

  actions: {
    payment (amount,callback) {
      auth0.getAccessTokenSilently().then(
        token => {
          const headers = {
            authorization: 'Bearer ' + token
          }
          apiPayment.post('/payment/create-payment-link',{
            amount
          }, {
            headers
          }).then(
            response => {
              if(response.data.data){
                window.location.assign(response.data.data.checkoutUrl);
              }
              if (callback) callback()
            }
          )
        })
    },
    
     fetchBill (callback) {
      auth0.getAccessTokenSilently().then(
        token => {
          const headers = {
            authorization: 'Bearer ' + token
          }
          
          apiPayment.get('/payment/bills', { headers }).then(
            response => {
              this.bills = response.data.data              
              
              if (callback) callback()
            }
          )
        })
    },
    fetchBalance (callback) {
      auth0.getAccessTokenSilently().then(
        token => {
          const headers = {
            authorization: 'Bearer ' + token
          }
          
          apiPayment.get('/payment/balance', { headers }).then(
            response => {
              this.balance = response.data.data.balance
              this.costUsed = response.data.data.costUsed
              this.estimatedCost = response.data.data.estimatedCost
              this.estimatedTime = response.data.data.estimatedTime
              if (callback) callback()
            }
          )
        })
    },
    fetchTransactions (callback) {
      auth0.getAccessTokenSilently().then(
        token => {
          const headers = {
            authorization: 'Bearer ' + token
          }
          
          apiPayment.get('/payment/transaction', { headers }).then(
            response => {
              this.transactions = response.data.data
              if (callback) callback()
            }
          )
        })
    },
    fetchUrlPayment (callback) {
      auth0.getAccessTokenSilently().then(
        token => {
          const headers = {
            authorization: 'Bearer ' + token
          }
          
          apiPayment.get('/payment/paymentInfo', { headers }).then(
            response => {
    
              this.paymentInfo = response.data.data
              
              if (callback) callback()
            }
          )
        })
    },
}})