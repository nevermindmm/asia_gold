<template>
  <v-app style="color: white;">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#E33E3F"
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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#E33E3F"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
      {
          icon: ' mdi-monitor-dashboard',
          title: 'แดชบอร์ด',
          to: '/'
        },
        {
          icon: ' mdi-warehouse',
          title: 'คลังสินค้า',
          to: '/warehouse'
        },
        {
          icon: ' mdi-cash-multiple',
          title: 'ยอดขาย',
          to: '/sales'
        },
        {
          icon: 'mdi-text-box-outline',
          title: 'รายงาน',
          to: '/report'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dashboard'
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400&display=swap');
* {
  font-family: "Prompt", sans-serif;
}
.v-application{
  background:#f3f3f3;
  
}
</style>