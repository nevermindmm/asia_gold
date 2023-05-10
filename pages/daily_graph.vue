<template>
  <div>
    <v-card class="pa-3 mb-6" elevation="1">
      <v-card-title
        ><v-icon large>mdi-account-edit</v-icon
        >&nbsp;|&nbsp;กราฟยอดขายรายวัน</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row justify="center">
      <v-card width="95%" height="60%" class="pa-5">
        <v-row dense no-gutters>
          <v-col>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="100"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  style="width: 90%"
                  :value="formatDate()"
                  color="red"
                  readonly
                  dense
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                @change="getSales()"
                :max="currentDate"
                color="red"
                v-model="date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-select
              hide-details
              @change="getSales()"
              placeholder="แพลตฟอร์ม"
              v-model="selected_platform"
              style="width: 90%"
              dense
              outlined
              item-color="red"
              color="red"
              :items="plaform_list"
              item-text="platform_name"
              item-value="platform_id"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center" class="pb-3" no-gutters>
          <v-col v-if="chartDataNecklace.datasets[0].data.length>0" cols="4">
            <v-card max-width="60%" elevation="0">
              <v-card-title>สร้อยคอ</v-card-title>
              <Doughnut
                :chart-options="chartOptions"
                :chart-data="chartDataNecklace"
              />
            </v-card>
          </v-col>
          <v-col v-if="chartDataBracelet.datasets[0].data.length>0" cols="4">
            <v-card max-width="60%" elevation="0">
              <v-card-title>สร้อยข้อมือ</v-card-title>
              <Doughnut
                :chart-options="chartOptions"
                :chart-data="chartDataBracelet"
              />
            </v-card>
          </v-col>
          <v-col v-if="chartDataRing.datasets[0].data.length>0" cols="4">
            <v-card max-width="60%" elevation="0">
              <v-card-title>แหวน</v-card-title>
              <Doughnut
                :chart-options="chartOptions"
                :chart-data="chartDataRing"
              />
            </v-card>
          </v-col>
        </v-row>
        <!-- </div> -->
        <!-- <div v-else>
          <v-row justify="center" class="pb-3 mt-2">
            <v-card-text class="d-flex justify-center">ไม่มีข้อมูล</v-card-text>
          </v-row>
        </div> -->
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import Chart from 'chart.js/auto'
import axios from 'axios'
export default {
  middleware({ $auth, redirect }) {
    if ($auth.user.role != 'admin') {
      redirect('/')
    }
  },
  components: { Doughnut },
  data: () => ({
    currentDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    type_list: ['สร้อยคอ', 'สร้อยข้อมือ', 'แหวน'],
    date_today: null,
    selected_type: null,
    selected_platform: null,
    plaform_list: [],
    items: [
      {
        text: 'หน้าหลัก',
        disabled: false,
        href: '/',
      },
      {
        text: 'กราฟยอดขายรายวัน',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
    chartDataNecklace: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },

    chartDataBracelet: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },

    chartDataRing: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },

    chartOptions: {
      responsive: true,
    },
  }),
  methods: {
    formatDate() {
      if (this.date) {
        const date = new Date(this.date)
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
      } else {
        return ''
      }
    },
    getSales() {
      let [year, month, date] = this.date.split('-');
      let body = {
        month: month,
        year: year,
        date: date,
        platform: this.selected_platform,
        is_dailyGraph: true,
      }
      // this.chartData.labels = []
      // this.chartData.datasets[0].data = []
      this.chartDataNecklace.datasets[0].data = []
      this.chartDataNecklace.labels = []
      this.chartDataBracelet.datasets[0].data = []
      this.chartDataBracelet.labels = []
      this.chartDataRing.datasets[0].data = []
      this.chartDataRing.labels = []

      if (this.selected_platform) {
        axios.post('http://localhost:4000/graphData', body).then((res) => {
          let best_seller = res.data.best_seller
          if (best_seller) {
            console.log(best_seller)
            for (let i = 0; i < best_seller.length; i++) {
              // console.log(i)
              if (best_seller[i].type == 'สร้อยคอ') {
                this.chartDataNecklace.labels.push(best_seller[i].pattern)
                this.chartDataNecklace.datasets[0].data.push(best_seller[i].qty)
              } else if (best_seller[i].type == 'สร้อยข้อมือ') {
                this.chartDataBracelet.labels.push(best_seller[i].pattern)
                this.chartDataBracelet.datasets[0].data.push(best_seller[i].qty)
              } else if (best_seller[i].type == 'แหวน') {
                this.chartDataRing.labels.push(best_seller[i].pattern)
                this.chartDataRing.datasets[0].data.push(best_seller[i].qty)
              }
              // if (best_seller[i].type == this.selected_type) {
              //   this.chartData.labels.push(best_seller[i].pattern)
              //   this.chartData.datasets[0].data.push(best_seller[i].qty)
              //   //random color by qty of data
              let r = Math.floor(Math.random() * 256)
              let g = Math.floor(Math.random() * 256)
              let b = Math.floor(Math.random() * 256)
              this.chartDataNecklace.datasets[0].backgroundColor.push(
                `rgb(${r},${g},${b})`
              )
              this.chartDataBracelet.datasets[0].backgroundColor.push(
                `rgb(${r},${g},${b})`
              )
              this.chartDataRing.datasets[0].backgroundColor.push(
                `rgb(${r},${g},${b})`
              )
              // }
            }
            // console.log(this.chartDataNecklace,this.chartDataBracelet,this.chartDataRing);
          }
          //  = label.slice()
          // this.chartData2.labels = label.slice()
        })
      }
    },
    getPlatformList() {
      axios.get('http://localhost:4000/getPlatformList').then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.plaform_list.push({
            platform_id: res.data.data[i].platform_id,
            platform_name: res.data.data[i].platform_name,
          })
        }
      })
    },
  },
  mounted() {
    this.getPlatformList()
  },
}
</script>

<style></style>
