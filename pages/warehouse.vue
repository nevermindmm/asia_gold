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
      <v-row>
        <v-col cols="6" class="ml-4">
          <v-text-field
            dense
            solo
            label="ค้นหา"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="type"
            dense
            :items="example"
            label="ประเภทสินค้า"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="pattern"
            dense
            :items="example"
            label="ลายสินค้า"
            outlined
          ></v-select>
        </v-col>
        <v-col>
          <v-btn outlined color="success">
            <v-icon left> mdi-magnify </v-icon>
            ค้นหา
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="py-2"></v-divider>
      <v-data-table
        :headers="headers"
        :items="product_list"
        :items-per-page="10"
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
    type: '',
    pattern: '',
    product_list: [],
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
      {
        text: 'ประเภท',
        align: 'start',
        value: 'type',
      },
      { text: 'ลาย', value: 'pattern' },
      { text: 'คลัง', value: 'warehouse' },
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
          console.log(res)
          this.product_list = res.data.data
        })
    },
  },
  mounted() {
    this.getProdList()
  },
}
</script>

<style>
</style>