<template>
  <table class="clientCard">
    <tr>
      <td>
        <h3>#{{ invoice.randomName }}</h3>
      </td>
      <td>
        <h3>Due to {{ invoice.date }}</h3>
      </td>
      <td>
        <h3>{{ invoice.clientName }}</h3>
      </td>
      <td>
        <h3>  {{ invoice.total }} €</h3>
      </td>
      <td><span :class="getColorClass(invoice.status)">{{ invoice.status }}</span></td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["invoice"],
  setup() {
    const getColorClass = (status) => {
      if (status === 'Paid') {
        
        return 'statusButton paid'
      }
      if (status === 'Draft') {
        return 'statusButton draft'
      }
      else {
        return 'statusButton pending'
      }

    }
    return { getColorClass }
  }
}
</script>

<style scoped>
td {
  width: calc(100%/5);
}

.clientCard {
  width: 80%;
  margin: 10px auto;
  background: rgba(238, 238, 238, 0.47);
  border-radius: 10px;
}

.statusButton {
  font-size: 0.8rem;
  font-weight: 900;
  padding: 10px 15px;
  min-width: 70px;
  border-radius: 7px;
  display: inline-block;
}

.pending {
  color: rgb(194, 144, 35);
  ;
  background: rgba(217, 184, 112, 0.5);
}

.paid {
  color: rgb(48, 185, 55);
  background: rgba(129, 202, 133, 0.5);
}
.draft{
  color: rgb(252, 251, 251);
  background: rgba(195, 195, 195, 0.5);
}

.seeDetail {
  margin-left: 10px;
}</style>