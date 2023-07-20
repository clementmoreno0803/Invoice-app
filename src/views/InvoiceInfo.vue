<template>
  <div class="about">
    <header>
      <button @click="$emit('openForm')">Edit</button>
      <button @click="store.deleteInvoice(selectedItem.id)">Delete</button>
      <button @click="store.changeStatusInvoice(selectedItem)">Mark as paid</button>
    </header>
    <main>
      {{ selectedItem }}
      {{ selectedItem.status }}
      {{ selectedItem.id }}
    </main>
  </div>
</template>
<script>
import { useInvoiceStore } from '../stores/InvoiceStore.js'
import { defineComponent, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  props: ['invoice', 'id'],
  setup() {
    const store = useInvoiceStore();
    const route = useRoute();
    const selectedItem = ref(null);

    watchEffect(() => {
      const invoiceId = Number(route.params.id);
      selectedItem.value = store.invoices.find((i) => i.id === invoiceId);
    });


    return { store, selectedItem }
  }
})
</script>
