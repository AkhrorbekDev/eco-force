<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t('Период') }}</th>
        <th>{{ $t('Энергия') }}</th>
        <th>TRX</th>
      </tr>
    </thead>
    <tbody>
      <tr >
        <td>{{ $t('Еженедельно') }}</td>
        <td>{{ data.energy.weekly }}</td>
        <td>{{ data.trx.weekly}} ~ {{ ( data.trx.weekly ? (data.trx.weekly * useTrxStore.trxGlobal.trx_price).toFixed(2) : 0) }} $</td>
      </tr><tr >
        <td>{{ $t('За месяц') }}</td>
        <td>{{ data.energy.monthly  }}</td>
        <td>{{ data.trx.monthly}} ~ {{ ( data.trx.monthly ? (data.trx.monthly * useTrxStore.trxGlobal.trx_price).toFixed(2) : 0) }} $</td>
      </tr>
      <tr >
        <td>{{ $t('За год') }}</td>
        <td>{{ data.energy.yearly }}</td>
        <td>{{ data.trx.yearly}} ~ {{ ( data.trx.yearly ? (data.trx.yearly * useTrxStore.trxGlobal.trx_price).toFixed(2) : 0) }} $</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {useTrxGlobal} from "@/store/trxGlobal.js";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          energy: {
            daily: 0,
            weekly: 0,
            yearly: 0,
            hourly: 0
          },
          trx: {
            daily: 0,
            weekly: 0,
            yearly: 0,
            hourly: 0

          }
        }
      }
    }
  },
  setup() {
    const useTrxStore = useTrxGlobal();
    return {
      useTrxStore
    }
  },
  data() {
    return {
      labels: {
        daily: this.$t('Ежедневно'),
        weekly: this.$t('Еженедельно'),
        yearly: this.$t('Ежегодно'),
      },
      rows: [
        { period: this.$t('Ежедневно'), energy: '22 400', trx: '1,2 ~ 0,28$' },
        { period: this.$t('За месяц'), energy: '672 000', trx: '34 ~ 8,4 $' },
        { period: this.$t('За год'), energy: '8 176 000', trx: '408 ~ 102,2$' }
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
