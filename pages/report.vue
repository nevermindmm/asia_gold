<template>
  <div>
    <v-card class="pa-3 mb-6" elevation="1">
      <v-card-title
        ><v-icon large>mdi-text-box</v-icon
        >&nbsp;|&nbsp;รายงาน</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>

    <v-card>
      <v-row justify="center" class="pa-3">
        <v-col cols="2">
          <v-select dense :items="example" label="เดือน" outlined></v-select>
        </v-col>
        <v-col cols="2">
          <v-select dense :items="example" label="ปี" outlined></v-select>
        </v-col>
        <v-col>
          <v-btn outlined color="success">
            <v-icon left> mdi-magnify </v-icon>
            แสดงรายงาน
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'หน้าหลัก',
        disabled: false,
        href: '/',
      },
      {
        text: 'รายงาน',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
    example: ['choice1', 'choice2', 'choice3', 'choice4', 'choice5', 'choice6'],
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        value: 'date',
      },
      { text: 'Shopee', value: 'shopee' },
      { text: 'Lazada', value: 'lazada' },
      { text: 'Line Shop', value: 'lineshop' },
      { text: 'JD Central', value: 'jd' },
      { text: 'ยอดรวม', value: 'sum' },
    ],
    data: [
      {
        date: 1,
        shopee: 200000,
        lazada: 50000,
        lineshop: 30000,
        jd: 0,
        sum: 280000,
      },
      {
        date: 2,
        shopee: 200000,
        lazada: 20000,
        lineshop: 30000,
        jd: 0,
        sum: 250000,
      },
      {
        date: 3,
        shopee: 20000,
        lazada: 100000,
        lineshop: 80000,
        jd: 50000,
        sum: 250000,
      },
      {
        date: 4,
        shopee: 200000,
        lazada: 50000,
        lineshop: 0,
        jd: 30000,
        sum: 280000,
      },
      {
        date: 5,
        shopee: 30000,
        lazada: 200000,
        lineshop: 50000,
        jd: 0,
        sum: 280000,
      },
      
    ],
  }),
}
</script>

<style>
</style>