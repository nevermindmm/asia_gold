<template>
  <v-app>
    <v-navigation-drawer
      dark
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#B81F1F"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark :clipped-left="clipped" fixed app color="#B81F1F">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-avatar tile>
        <img
          height="100"
          alt="Avatar"
          src="../assets/picture/asia_gold_logo.png"
        />
      </v-avatar>
      <v-toolbar-title>ASIAGOLD</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on">
            <v-avatar tile>
              <img
                height="100"
                alt="Avatar"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="mt-1">
          <v-list-item link>
            <v-list-item-title>สร้างบัญชีผู้ใช้</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title class="red--text">ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: ' mdi-monitor-dashboard',
          title: 'แดชบอร์ด',
          to: '/',
        },
        {
          icon: ' mdi-warehouse',
          title: 'คลังสินค้า',
          to: '/warehouse',
        },
        {
          icon: ' mdi-cash-multiple',
          title: 'ยอดขาย',
          submenu:[
            {
              title:'กรอกยอดขาย',
              to: '/input_sales',
            },
            {
              title:'กราฟยอดขาย',
              to: '/sales',
            }
          ]
        },
        {
          icon: 'mdi-text-box-outline',
          title: 'รายงาน',
          to: '/report',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dashboard',
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400&display=swap');
* {
  font-family: 'Prompt', sans-serif;
}
.v-application {
  background: #f3f3f3;
}
</style>