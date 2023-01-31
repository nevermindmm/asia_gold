<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card class="pa-5 mb-2">
          <Bar :chart-options="chartOptions" :chart-data="chartData" />
        </v-card>
        <v-card max-width="100%" class="pa-5">
          <Bar :chart-options="chartOptions" :chart-data="chartData2" />
        </v-card>
      </v-col>
      <v-col cols="6">
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
            label: 'ยอดขายต่อเดือนในแต่ละแพลดฟอร์ม',
            data: [40000, 20000, 50000, 40000],
            backgroundColor: [
              'rgb(238, 77, 45)',
              'rgb(69, 108, 204)',
              'rgb(6, 199, 85)', 
              'black',
            ],
          },
        ],
      },
      chartData2: {
        labels: ['สร้อยข้อมือ', 'สร้อยคอ', 'แหวน'],
        datasets: [
          {
            label: 'สินค้าขายดี',
            data: [40000, 20000, 50000],
            backgroundColor: [
              'rgb(255,215,0)',
            ],
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