<template>
  <div class="home">
    <Teleport to="body">
      <Form></Form>
    </Teleport>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/Form.vue'
import { Teleport } from 'vue'
import {useInvoiceStore} from '../stores/InvoiceStore'
export default {
  name: 'Home',
  components: {
    Form,
    Teleport
  },
  setup(){
        const invoice = useInvoiceStore()

        return {invoice}
    }
}
</script>
