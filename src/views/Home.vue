<template>
  <div class="home">
    <Teleport to="body">
      <Form></Form>
    </Teleport>
    <div v-for="invoice in store.invoices" :key="invoice.id">
      <InvoiceDetailVue 
      :randomName="invoice.randomName"
      :date="invoice.date"
      :clientName="invoice.clientName"
      :total="invoice.total"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/Form.vue'
import { Teleport, onMounted } from 'vue'
import { useInvoiceStore } from '../stores/InvoiceStore'
import InvoiceDetailVue from '../components/InvoiceDetail.vue'
export default {
  name: 'Home',
  components: {
    Form,
    Teleport,
    InvoiceDetailVue
  },
  setup() {
    const store = useInvoiceStore();

    onMounted(() => {
      store.getInvoices()
    });

    return { store }
  }
}
</script>
