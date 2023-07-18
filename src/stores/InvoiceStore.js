import { defineStore } from "pinia";
import axios from "axios";

export const useInvoiceStore = defineStore("invoiceStore", {
    state: () => ({
        invoices: [],
    }),
    getters: {
        totalInvoices: (state) => {
            let invoicesLength = state.invoices.length
            if (invoicesLength > 0) {
                return invoicesLength;
            } else {
                return invoicesLength = 0;
            }
        },
        filteredInvoices: (state) => (status) => {
            if (!status) {
                return state.invoices;
            }

            return state.invoices.filter((invoice) => invoice.status === status);
        },
    },
    actions: {
        async addInvoice(newObject) {
            await axios.post('https://invoices-app-13063-default-rtdb.firebaseio.com/.json',
                    newObject)
                .then(() => {
                    this.getInvoices()
                })
        },
        async getInvoices() {
            await axios.get('https://invoices-app-13063-default-rtdb.firebaseio.com/.json')
                .then(response => {
                    // console.log(response.data)
                    // this.invoices.push(response.data)
                    this.invoices = Object.values(response.data)
                })
        }
    }
})