<template>
  <table>
    <thead>
      <tr>
        <th>Период</th>
        <th>Энергия</th>
        <th>TRX</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ row.period }}</td>
        <td>{{ row.energy }}</td>
        <td>{{ row.trx }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      rows: [
        { period: 'Ежедневно', energy: '22 400', trx: '1,2 ~ 0,28$' },
        { period: 'За месяц', energy: '672 000', trx: '34 ~ 8,4 $' },
        { period: 'За год', energy: '8 176 000', trx: '408 ~ 102,2$' }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/vars';
table {
  width: 100%;
  margin-bottom: 16px;
  border-collapse: collapse;
}
table tr:first-child th:first-child {
    border-top-left-radius: var(--border-radius-table);
}
table tr:first-child th:last-child {
    border-top-right-radius: var(--border-radius-table);
}   
table tr:last-child td:last-child {
    border-bottom-right-radius: var(--border-radius-table);
}
table tr:last-child td:first-child {
    border-bottom-left-radius: var(--border-radius-table);
}
    
table tr:last-child td:last-child {
    border-bottom-right-radius: var(--border-radius-table);
}
th {
  padding: 16px 16px 8px;
  font-weight: 600;
  text-align: left;
}

th, td {
  border: 0;
  background-color: var(--color3);
}

td {
  padding:  0 0  4px 16px;
}

table tr:last-child td {
  padding-bottom: 16px;
}
@media (max-width: $mobile) {
  table {
    font-size: 13px;
    line-height: 18px;
  }
}

</style>