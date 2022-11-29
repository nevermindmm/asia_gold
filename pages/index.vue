<template>
  <div>
    <v-card max-width="50%" class="pa-5">
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </v-card>
  </div>
</template>
  
  <script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  // middleware: 'auth',
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
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