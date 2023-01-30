<template>
  <div>
    <v-row>
      <v-col>
        <v-card max-width="100%" class="pa-5">
          <Bar :chart-options="chartOptions" :chart-data="chartData" />
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="100%" class="pa-5">
          <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
import { Bar, Doughnut } from 'vue-chartjs'
import Chart from 'chart.js/auto'

export default {
  // middleware: 'auth',
  name: 'BarChart',
  components: { Bar, Doughnut },
  props: {},
  data() {
    return {
      chartData: {
        labels: ['Shopee', 'Lazada', 'Line Shop', 'JD Central'],
        datasets: [
          {
            backgroundColor: '#ed3c2f',
            label: 'ยอดขายต่อเดือนในแต่ละแพลดฟอร์ม',
            data: [40000, 20000, 50000, 40000],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
}
</script>