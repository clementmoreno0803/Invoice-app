<template>
  <div class="home">
    <Teleport to="body">
      <div class="backdrop" :class="{ active: outOfCanva }"  @click="outOfCanva = false">
        <Form class="outOfCanva" @click.stop :class="{ active: outOfCanva }" @open-form="outOfCanva = true"></Form>
      </div>
    </Teleport>
    <h1>Invoices</h1>
    <h2>There is {{ store.totalInvoices }} total invoices</h2>
    <select v-model="filterInvoice">
      <option value="">Filter invoices by status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Draft">Draft</option>
    </select>
    <button @click="outOfCanva = true">Create an invoice</button>
    
    <div v-for="invoice in filteredInvoices" :key="invoice.id">
      <router-link :to="`/${invoice.id}`">
        <InvoiceDetailVue :invoice="invoice" />
      </router-link>
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
    InvoiceDetailVue,
  },
  setup() {
    const store = useInvoiceStore();
    const filterInvoice = ref('');
    const outOfCanva = ref(false);

    const toggleClass = () => outOfCanva.value = !outOfCanva.value
    const filteredInvoices = computed(() => store.filteredInvoices(filterInvoice.value));

    onMounted(() => {
      store.getInvoices()
    })()

    return { store, filterInvoice, filteredInvoices, outOfCanva, toggleClass }
  }
}
</script>
<style lang="scss" scoped>
.backdrop {
  position: absolute;
  background: rgba(0, 0, 0, 0.09);
  height: auto;
  top: 0;
  left: 0;
  width: 0;
  transform: translateX(-100vw);
  transition: all 0.3s ease-in;

  &.active {
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 9;
    backdrop-filter: blur(1px);
    cursor: pointer;
    transform: translateX(0);
    transition: all 0.3s ease-in-out;
  }
}

.outOfCanva {
  transform: translateX(-100vw);
  background: rgb(220, 220, 243);
  z-index: 99;
  top: 0;
  bottom: 0;
  width: 35%;
  padding: 40px;
  height: 100%;
  transition: all 0.9s ease-in;
  cursor: default;

  &.active {
    transform: translateX(0);
    background: rgb(220, 220, 243);
    z-index: 99;
    top: 0;
    bottom: 0;
    transition: all 0.9s ease-in-out;
  }
}
</style>
