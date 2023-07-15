<template>
  <div class="about">
    <button @click="store.getInvoices">Get data</button>
  </div>
</template>

<script>
import {useInvoiceStore} from '../stores/InvoiceStore.js'
export default {
  setup() {
    
    const store = useInvoiceStore()

    return {store}
  },
}
</script>
