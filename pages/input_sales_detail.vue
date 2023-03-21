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
      <v-card class="pb-4" width="50%">
        <div class="px-6">
          <v-card-text>จำนวนประเภทที่ขาย</v-card-text>
          <v-row>
            <v-text-field
              v-on:keyup.enter="renderInputField()"
              v-model="inputQty"
              outlined
              color="red"
              hide-spin-buttons
              type="number"
            ></v-text-field>
            <v-btn  color="red" @click="renderInputField()">ตกลง</v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="px-6">
          <div>
            <ProductSelector v-for="n in renderQty" :key="n"></ProductSelector>
            <!-- <v-row v-for="n in renderQty" :key="n">
              <v-col cols="3">
                <v-select variant="solo" label="ประเภท"></v-select>
              </v-col>
              <v-col cols="3">
                <v-select variant="solo" label="ลาย"></v-select>
              </v-col>
              <v-col cols="3">
                <v-select variant="solo" label="ไซส์"></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field type="number" variant="solo" label="จำนวน"></v-text-field>
              </v-col>
            </v-row> -->
          </div>
        </div>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import ProductSelector from '~/components/ProductSelector.vue';

export default {
    data: () => ({
        inputQty: 1,
        renderQty: 1,
        items: [
            {
                text: "หน้าหลัก",
                disabled: false,
                href: "/",
            },
            {
                text: "ยอดขาย",
                disabled: true,
                href: "breadcrumbs_link_1",
            },
        ],
    }),
    methods: {
        renderInputField() {
            if (parseInt(this.inputQty) == 0 | parseInt(this.inputQty) < 0 | this.inputQty == "") {
                this.inputQty = 1;
            }
            this.renderQty = parseInt(this.inputQty);
        },
    },
    components: { ProductSelector }
}
</script>

<style>
</style>