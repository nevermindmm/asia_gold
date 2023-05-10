<template>
  <div>
    <v-card class="pa-3 mb-6" elevation="1">
      <v-card-title
        ><v-icon large>mdi-cash-multiple</v-icon
        >&nbsp;|&nbsp;เพิ่มข้อมูลยอดขาย</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row justify="center" class="mb-1">
      <v-card width="60%">
        <div class="px-6">
          <v-card-text>วัน/เดือน/ปี</v-card-text>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="100"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                style="width: 30%"
                hide-details
                dense
                :value="formatDate()"
                color="red"
                readonly
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :max="currentDate"
              color="red"
              v-model="date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-card-text>แพลตฟอร์ม</v-card-text>
          <v-select
            style="width: 30%"
            dense
            hide-details
            item-color="red"
            placeholder="แพลตฟอร์ม"
            color="red"
            v-model="select_platform"
            :items="platform_list"
            item-text="platform_name"
            item-value="platform_id"
            outlined
          ></v-select>
        </div>
        <v-divider class="mt-5"></v-divider>
        <div class="px-6">
          <v-card-text>จำนวนประเภทที่ขาย</v-card-text>
          <v-row no-gutters>
            <v-col cols="3">
              <v-text-field
                dense
                v-on:keyup.enter="renderInputField()"
                v-model="inputQty"
                outlined
                color="red"
                hide-spin-buttons
                type="number"
                class="d-flex align-center"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn
                dark
                elevation="0"
                height="40"
                color="red"
                @click="renderInputField()"
                >ตกลง</v-btn
              >
            </v-col>
          </v-row>
        </div>
        <div class="px-6">
          <div>
            <ProductSelector
              v-for="n in renderQty"
              :key="n"
              :id="n"
            ></ProductSelector>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="px-6">
          <v-card-text>ยอดขายรวม</v-card-text>
          <v-text-field
            style="width: 40%"
            dense
            @keydown="onKeyDown"
            suffix="บาท"
            hide-spin-buttons
            outlined
            color="red"
            item-color="red"
            v-model="total_sales"
            type="number"
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-row class="my-4" justify="center">
          <v-btn color="success" @click="saveData()"> บันทึก </v-btn>
        </v-row>
      </v-card>
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-title
            ><v-icon color="green">mdi-check-bold</v-icon
            >&nbsp;เพิ่มข้อมูลสำเร็จ</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="redirect()">ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="errorDialog" width="auto">
        <v-card>
          <v-card-title
            ><v-icon color="red">mdi-alert-box</v-icon>&nbsp;{{
              this.errorMsg
            }}</v-card-title
          >
          <v-card-text v-if="this.errorMsg2">{{ this.errorMsg2 }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeErrorDialog()">ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import ProductSelector from '~/components/ProductSelector.vue'
import axios from 'axios'
export default {
  // async asyncData({ params }) {
  //   const date = params.date
  //   const platform = params.platform
  //   const total_sales = params.total_sales
  //   return { date, platform, total_sales }
  // },
  data: () => ({
    total_sales: null,
    select_platform: null,
    platform_list: [],
    date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    currentDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    max_render: null,
    dialog: false,
    errorDialog: false,
    errorMsg: '',
    errorMsg2: null,
    inputQty: 1,
    renderQty: 1,
    items: [
      {
        text: 'หน้าหลัก',
        disabled: false,
        href: '/',
      },
      {
        text: 'เพิ่มข้อมูลยอดขาย',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
  }),
  methods: {
    getPlatformList() {
      axios.get('http://localhost:4000/getPlatformList').then((res) => {
        this.platform_list = res.data.data
      })
    },
    redirect() {
      this.dialog = false
      this.$nuxt.$router.go()
    },
    formatDate() {
      if (this.date) {
        const date = new Date(this.date)
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
      } else {
        return ''
      }
    },
    renderInputField() {
      if (
        (parseInt(this.inputQty) == 0) |
        (parseInt(this.inputQty) < 0) |
        (this.inputQty == '')
      ) {
        this.inputQty = 1
      } else if (parseInt(this.inputQty) > this.max_render) {
        this.inputQty = this.max_render
      }
      this.renderQty = parseInt(this.inputQty)
      this.$store.commit('setTypeInputSize', this.inputQty)
    },
    saveData() {
      let body = {
        date: this.date,
        platform: this.select_platform,
        total_sales: this.total_sales,
        prod_list: this.$store.state.typeInput,
      }
      if (body.date && body.platform && body.total_sales) {
        console.log('fdff')
        if (body.prod_list.length > 0) {
          axios.post('http://localhost:4000/addSales', body).then((res) => {
            if (res.status == 200) {
              this.dialog = true
            } else if (res.status == 201) {
              this.errorMsg = 'เกิดข้อผิดพลาด'
              this.errorMsg2 = `จำนวนสินค้า ${res.data.type} ${res.data.pattern} ${res.data.weight} ในคลังไม่เพียงพอกับการหักยอด (จำนวนที่เหลือในคลัง: ${res.data.stock_remain})`
              this.errorDialog = true
            } else {
              this.errorMsg = 'เกิดข้อผิดพลาด'
              this.errorDialog = true
            }
          })
        } else {
          this.errorMsg = 'โปรดกรอกข้อมูลให้ครบ'
          this.errorDialog = true
        }
      } else {
        this.errorMsg = 'โปรดกรอกข้อมูลให้ครบ'
        this.errorDialog = true
      }
    },
    closeErrorDialog() {
      this.errorDialog = false
      this.errorMsg = null
      this.errorMsg2 = null
    },
    getProdList() {
      axios.post('http://localhost:4000/getProdList', {}).then((res) => {
        this.max_render = res.data.data.length
      })
    },
    onKeyDown(event) {
      if (event.key == '-') {
        event.preventDefault()
      } else if (event.key == '0') {
          if (this.total_sales?.toString().length < 1 || this.total_sales == null) {
            event.preventDefault()
          }
      }
    },
  },
  // created() {
  //   if (!this.date | !this.platform | !this.total_sales) {
  //     this.$router.push('/input_sales')
  //   }
  // },
  mounted() {
    this.$store.commit('setTypeInputSize', this.inputQty - 1)
    this.getProdList()
    this.getPlatformList()
  },
  components: { ProductSelector },
}
</script>

<style>
</style>