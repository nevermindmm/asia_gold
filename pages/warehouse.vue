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

    <v-card class="my-3">
      <v-card-title> สินค้าคงคลัง </v-card-title>
      <v-divider></v-divider>
      <v-row align="center" class="d-flex mx-auto my-3">
        <v-col cols="2">
          <v-select
            hide-details
            item-color="red"
            color="red"
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
            hide-details
            item-color="red"
            color="red"
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
            hide-details
            item-color="red"
            color="red"
            v-model="weight"
            dense
            :items="weight_list"
            label="น้ำหนักสินค้า"
            outlined
            @change="filter_prod()"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$auth.user.role == 'admin'"
          @click="addProd()"
          class="mr-8"
          color="success"
        >
          <v-icon left> mdi-plus </v-icon>
          เพิ่มสินค้า
        </v-btn>
      </v-row>
      <v-divider class="py-2"></v-divider>
      <v-data-table
        :headers="headers"
        :items="filtered_prod"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.pattern }}</td>
            <td>{{ item.weight_all }}</td>
            <td>{{ item.remain }}</td>
            <td>{{ item.status }}</td>
            <td v-if="$auth.user.role == 'admin'">
              <v-btn icon small>
                <v-icon
                  @click="
                    editProd({
                      prod_id: item.id,
                      type: item.type,
                      pattern: item.pattern,
                      weight: item.weight_all,
                      remain: item.remain,
                    })
                  "
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-btn icon small>
                <v-icon
                  @click="
                    delProd({
                      prod_id: item.id,
                      type: item.type,
                      pattern: item.pattern,
                      weight: item.weight_all,
                    })
                  "
                  >mdi-delete</v-icon
                >
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="editDialog" width="auto">
      <v-card class="pb-3">
        <div class="mt-5 px-6 pb-3">
          <v-row align="center">
            <v-col class="justify-center" align-self="center" cols="4">
              <v-card-text class="d-flex justify-end">รหัสสินค้า</v-card-text>
            </v-col>
            <v-col>
              <v-text-field
                disabled
                v-model="prodInfo.code"
                hide-details
                dense
                outlined
                color="red"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="justify-center" align-self="center" cols="4">
              <v-card-text class="d-flex justify-end">ประเภทสินค้า</v-card-text>
            </v-col>
            <v-col>
              <v-text-field
                item-color="red"
                v-model="prodInfo.type"
                hide-details
                dense
                outlined
                color="red"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="justify-center" align-self="center" cols="4">
              <v-card-text class="d-flex justify-end">ลาย</v-card-text>
            </v-col>
            <v-col>
              <v-text-field
                v-model="prodInfo.pattern"
                hide-details
                dense
                outlined
                color="red"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="justify-center" align-self="center" cols="4">
              <v-card-text class="d-flex justify-end">ขนาด</v-card-text>
            </v-col>
            <v-col>
              <v-text-field
                v-model="prodInfo.weight"
                hide-details
                dense
                outlined
                color="red"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="justify-center" align-self="center" cols="4">
              <v-card-text class="d-flex justify-end">คงเหลือ</v-card-text>
            </v-col>
            <v-col>
              <v-text-field
                @keydown="onKeyDown"
                min="0"
                @change="remainHandle()"
                type="number"
                v-model="prodInfo.remain"
                hide-details
                dense
                outlined
                color="red"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center"
            ><v-btn @click="saveEditProd()" color="primary"
              >บันทึก</v-btn
            ></v-row
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="completeDialog" width="auto">
      <v-card>
        <v-card-title
          ><v-icon color="green">mdi-check-bold</v-icon
          >&nbsp;เปลี่ยนแปลงข้อมูลสินค้าแล้ว</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="completeDialog = false">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delDialog" width="auto">
      <v-card>
        <v-card-title
          ><v-icon color="red">mdi-delete-alert</v-icon
          >&nbsp;ยืนยันการลบ</v-card-title
        >
        <v-card-text>
          คุณต้องการจะลบข้อมูลของ สินค้า :
          <b>{{ this.del_prod.name }}</b> หรือไม่
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" @click="saveDelProd()">ตกลง</v-btn>
          <v-btn color="error" @click="delDialog = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData({ $auth }) {
    if ($auth.user.role == 'admin') {
      return {
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
          { text: 'Action', value: '' },
        ],
      }
    }else{
      return {
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
      }
    }
  },
  data: () => ({
    del_prod: {
      id: null,
      name: null,
    },
    delDialog: false,
    completeDialog: false,
    editDialog: false,
    prodInfo: {
      code: null,
      type: null,
      pattern: null,
      weight: null,
      remain: null,
    },
    search: '',
    type: null,
    pattern: null,
    weight: null,
    product_list: [],
    type_list: [],
    pattern_list: [],
    weight_list: [],
    filtered_prod: [],
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
  }),
  methods: {
    getProdList() {
      axios.post('https://asiagoldapi-tz4ljgge7a-as.a.run.app/getProdList').then((res) => {
        let data = [...res.data.data]
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
        this.product_list = [...data]
        this.filtered_prod = data.slice()
        this.type_list = this.type_list.filter(this.onlyUnique)
        this.type_list.unshift('ทั้งหมด')
        this.pattern_list = this.pattern_list.filter(this.onlyUnique)
        this.pattern_list.unshift('ทั้งหมด')
        this.weight_list = this.weight_list.filter(this.onlyUnique)
        this.weight_list.unshift('ทั้งหมด')
        this.filter_prod()
      })
    },
    onKeyDown(event) {
      if (event.key == '-') {
        event.preventDefault()
      }
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    },
    filter_prod() {
      let filtered = [...this.product_list]
      if (filtered.find((item) => item.type == this.type)) {
        if (this.type && this.type != 'ทั้งหมด') {
          filtered = filtered.filter((obj) => obj.type == this.type)
          this.pattern_list = [...new Set(filtered.map((item) => item.pattern))]
          this.pattern_list.unshift('ทั้งหมด')
        }
      } else {
        this.type = 'ทั้งหมด'
      }
      if (filtered.find((item) => item.pattern == this.pattern)) {
        if (this.pattern && this.pattern != 'ทั้งหมด') {
          filtered = filtered.filter((obj) => obj.pattern == this.pattern)
          this.weight_list = [
            ...new Set(filtered.map((item) => item.weight_all)),
          ]
          this.weight_list.unshift('ทั้งหมด')
        }
      } else {
        this.pattern = 'ทั้งหมด'
      }
      if (filtered.find((item) => item.weight_all == this.weight)) {
        if (this.weight && this.weight != 'ทั้งหมด') {
          filtered = filtered.filter((obj) => obj.weight_all == this.weight)
        }
      } else {
        this.weight = 'ทั้งหมด'
      }
      this.filtered_prod = [...filtered]
    },
    editProd(prod) {
      this.prodInfo = {
        code: prod.prod_id,
        type: prod.type,
        pattern: prod.pattern,
        weight: prod.weight,
        remain: prod.remain,
      }
      this.editDialog = true
    },
    saveEditProd() {
      axios
        .post('https://asiagoldapi-tz4ljgge7a-as.a.run.app/editProdData', this.prodInfo)
        .then((res) => {
          if (res.status == 200) {
            this.editDialog = false
            this.completeDialog = true
          }
          this.getProdList()
        })
    },
    delProd(prod) {
      this.del_prod.id = prod.prod_id
      this.del_prod.name = prod.type + ' ' + prod.pattern + ' ' + prod.weight
      this.delDialog = true
    },
    saveDelProd() {
      if (this.del_prod.id) {
        axios
          .post('https://asiagoldapi-tz4ljgge7a-as.a.run.app/delProd', { id: this.del_prod.id })
          .then((res) => {
            if (res.status == 200) {
              this.delDialog = false
              this.completeDialog = true
            }
            this.getProdList()
          })
      }
    },
    remainHandle() {
      if (this.prodInfo.remain < 0) {
        this.prodInfo.remain = 0
      }
    },
    addProd() {
      this.$router.push('/add_prod')
    },
  },
  mounted() {
    this.getProdList()
  },
}
</script>

<style>
</style>