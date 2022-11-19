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
          <v-select dense :items="example" label="filter1" outlined></v-select>
        </v-col>
        <v-col cols="2">
          <v-select dense :items="example" label="filter2" outlined></v-select>
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
        :items="desserts"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
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

        value: 'name',
      },
      { text: 'ลาย', value: 'texture' },
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
      {
        name: 'สร้อยคอ 1 สลึง(3.8g)',
        texture: 'สามห่วง',
        warehouse: 9.0,
        remain: 37,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 1 สลึง(3.8g)',
        texture: 'ผ่าหวาย',
        warehouse: 16.0,
        remain: 23,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 1 สลึง(3.8g)',
        texture: 'คตกริชทับลาย',
        warehouse: 3,
        remain: 67,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 2 สลึง(7.6g)',
        texture: 'เบนซ์',
        warehouse: 6.0,
        remain: 24,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 2 สลึง(7.6g)',
        texture: 'สามห่วง',
        warehouse: 9.0,
        remain: 37,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 2 สลึง(7.6g)',
        texture: 'ดิสโก้',
        warehouse: 16.0,
        remain: 23,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 2 สลึง(7.6g)',
        texture: 'คตกริชทับลาย',
        warehouse: 3,
        remain: 67,
        status: 'พร้อมขาย',
      },
      {
        name: 'สร้อยคอ 2 สลึง(7.6g)',
        texture: 'ปล่องอ้อย',
        warehouse: 3,
        remain: 67,
        status: 'ไม่พร้อมขาย',
      },
    ],
  }),
}
</script>

<style>
</style>