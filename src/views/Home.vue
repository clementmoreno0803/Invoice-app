<template>
  <div class="home">
    <Teleport to="body">
      <Form class="outOfCanva" :class="{ active: seeForm }"></Form>
    </Teleport>
    <h1>Invoices</h1>
    <h2>There is {{ store.totalInvoices }} total invoices</h2>
    <select v-model="filterInvoice">
      <option value="">Filter invoices by status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Draft">Draft</option>
    </select>
    <button @click="toggleClass">Create an invoice</button>
    <div v-for="invoice in filteredInvoices" :key="invoice.id">
      <InvoiceDetailVue :randomName="invoice.randomName" :date="invoice.date" :clientName="invoice.clientName"
        :total="invoice.total" :status="invoice.status" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/Form.vue'
import { ref, Teleport, onMounted, computed } from 'vue'
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
    const filterInvoice = ref('');
    const seeForm = ref(false)

    const toggleClass = () => seeForm.value = !seeForm.value
    const filteredInvoices = computed(() => store.filteredInvoices(filterInvoice.value));

    onMounted(() => {
      store.getInvoices()
    })()

    return { store, filterInvoice, filteredInvoices, seeForm, toggleClass }
  }
}
</script>
<style scoped>
.outOfCanva {
  position: fixed;
  transform: translateX(-100vw);
  background: rgb(220, 220, 243);
  z-index: 99;
  height: 100%;
  top: 0;
  width: 60%;
  transition: all 0.4s ease-out;
}

.outOfCanva.active {
  position: fixed;
  transform: translateX(0);
  z-index: 99;
  height: 100%;
  top: 0;
  width: 60%;
  transition: all 0.4s ease-out;
}
</style>
