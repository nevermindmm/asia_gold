<template>
  <div>
    <v-card class="pa-3 mb-6" elevation="1">
      <v-card-title
        ><v-icon large>mdi-cash-multiple</v-icon
        >&nbsp;|&nbsp;ยอดขาย</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    
      <v-row justify="center">
        <v-card width="50%" class="pa-5">
          <v-card-title class="mx-auto"> กรอกยอดขาย </v-card-title>
          <v-card-text>วัน/เดือน/ปี</v-card-text>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="100"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatDate()"
                color="red"
                label="เลือกวันที่"
                prepend-icon="mdi-calendar-range"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="red"
              v-model="date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-card-text>สาขา</v-card-text>
          <v-select
            v-model="select_branch"
            dense
            :items="branch_list"
            label="ประเภทสินค้า"
            outlined
          ></v-select>
        </v-card>
      </v-row>
   
  </div>
</template>

<script>
export default {
  data: () => ({
    branch:null,
    branch_list:[],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: [
      {
        text: 'หน้าหลัก',
        disabled: false,
        href: '/',
      },
      {
        text: 'ยอดขาย',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
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
  },
}
</script>

<style>
</style>