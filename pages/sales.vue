<template>
  <div>
    <v-card class="pa-3 mb-6" elevation="1">
      <v-card-title
        ><v-icon large>mdi-cash-multiple</v-icon>&nbsp;|&nbsp;ยอดขาย</v-card-title
      >
      <v-breadcrumbs :items="items" class="pa-0 ml-5">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
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
        text: 'ยอดขาย',
        disabled: true,
        href: 'breadcrumbs_link_1',
      },
    ],
  }),
}
</script>

<style>
</style>