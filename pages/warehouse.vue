<template>
  <div>
    <v-card class="pa-3" elevation="1">
      <v-card-title
        ><v-icon large>mdi-package-variant-closed</v-icon
        >&nbsp;|&nbsp;คลังสินค้า</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>

    <v-card class="ma-3">
      <v-card-title> สินค้าคงคลัง </v-card-title>
      <v-divider class="py-3"></v-divider>
      <v-row class="d-flex mx-auto">
        <v-col cols="2">
          <v-select
            v-model="type"
            dense
            :items="type_list"
            label="ประเภทสินค้า"
            outlined
            @change="filter_prod()"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="pattern"
            dense
            :items="pattern_list"
            label="ลายสินค้า"
            outlined
            @change="filter_prod()"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="weight"
            dense
            :items="weight_list"
            label="น้ำหนักสินค้า"
            outlined
            @change="filter_prod()"
          ></v-select>
        </v-col>
        <!-- <v-col>
          <v-btn outlined color="success">
            <v-icon left> mdi-magnify </v-icon>
            ค้นหา
          </v-btn>
        </v-col> -->
      </v-row>
      <v-divider class="py-2"></v-divider>
      <v-data-table
        :headers="headers"
        :items="filtered_prod"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    search: '',
    type: null,
    pattern: null,
    weight: null,
    product_list: [],
    type_list: [],
    pattern_list: [],
    weight_list: [],
    filtered_prod: [],
    example: ['choice1', 'choice2', 'choice3', 'choice4', 'choice5', 'choice6'],
    items: [
      {
        text: 'หน้าหลัก',
        disabled: false,
        href: '/',
      },
      {
        text: 'คลังสินค้า',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
    headers: [
      { text: 'รหัสสินค้า', value: 'id', align: 'start' },
      {
        text: 'ประเภท',
        value: 'type',
      },
      { text: 'ลาย', value: 'pattern' },
      { text: 'ขนาด', value: 'weight_all' },
      { text: 'คงเหลือ', value: 'remain' },
      { text: 'สถานะ', value: 'status' },
    ],
    desserts: [
      {
        name: 'สร้อยคอ 1 สลึง(3.8g)',
        texture: 'เบนซ์',
        warehouse: 6.0,
        remain: 24,
        status: 'พร้อมขาย',
      },
    ],
  }),
  methods: {
    getProdList() {
      axios
        .post('http://localhost:4000/getProdList', {
          type: this.type,
          pattern: this.pattern,
        })
        .then((res) => {
          let data = res.data.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].remain == 0) {
              data[i].status = 'ไม่พร้อมจำหน่าย'
            } else {
              data[i].status = 'พร้อมจำหน่าย'
            }
            data[i].weight_all = `${data[i].weight_th}(${data[i].weight}g)`
            //set selcect items
            this.type_list.push(data[i].type)
            this.pattern_list.push(data[i].pattern)
            this.weight_list.push(data[i].weight_all)
          }
          this.product_list = data
          this.filtered_prod = data
          // console.log(data)
          this.type_list = this.type_list.filter(this.onlyUnique)
          this.type_list.unshift('ทั้งหมด')
          this.pattern_list = this.pattern_list.filter(this.onlyUnique)
          this.pattern_list.unshift('ทั้งหมด')
          this.weight_list = this.weight_list.filter(this.onlyUnique)
          this.weight_list.unshift('ทั้งหมด')
        })
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    },
    filter_prod() {
      let filtered = this.product_list
      if(this.type&&this.type!="ทั้งหมด"){
        filtered = filtered.filter(obj => obj.type == this.type);
        this.pattern_list = [...new Set(filtered.map(item => item.pattern))];
        this.pattern_list.unshift('ทั้งหมด')
      }
      if(this.pattern&&this.pattern!="ทั้งหมด"){
        filtered = filtered.filter(obj => obj.pattern == this.pattern);
        this.weight_list = [...new Set(filtered.map(item => item.weight_all))];
        this.weight_list.unshift('ทั้งหมด')
      }
      if(this.weight&&this.weight!="ทั้งหมด"){
        filtered = filtered.filter(obj => obj.weight_all == this.weight);
      }
      console.log(filtered)
      this.filtered_prod = filtered
    },
  },
  mounted() {
    this.getProdList()
  },
}
</script>

<style>
</style>