import { defineStore } from "pinia";
import axios from "axios";

export const useInvoiceStore = defineStore("invoiceStore", {
    state: () => ({
        invoices: []
    }),
    actions: {
        async addInvoice(newObject) {
            axios.post('https://invoices-app-13063-default-rtdb.firebaseio.com/.json',
                newObject)
            console.log(this.invoices)
        },
        async getInvoices() {
            axios.get('https://invoices-app-13063-default-rtdb.firebaseio.com/.json')
                .then(response => {
                    this.invoices = response.data
                    console.log(this.invoices)
                })
        }
    }
})