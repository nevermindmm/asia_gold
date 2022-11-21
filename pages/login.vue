<template>
  <div>
    <v-row no-gutters>
      <v-col cols="7">
        <v-img
          height="100%"
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-6/257412572_490570202490977_8331586111331070479_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGl1NudXt2e7QrJDI-4aD7KO9a0cQ35BRc71rRxDfkFFzwJ6crKD_oCxBCzfdCmcPLSpDqv_dSicB6RnB4YKCPJ&_nc_ohc=bZR2ELBxuEAAX-qwovv&_nc_ht=scontent.fbkk12-2.fna&oh=00_AfDQx5_yD_AQrXMUYpBmxyFPM0MlEcjxVgOdD2cAiotOag&oe=637F6D5F"
        ></v-img>
      </v-col>
      <v-col cols="5" class="d-flex justify-center align-center">
        <v-card width="60%" class="pa-2 ma-3" color="">
            <v-img height="" contain src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/118798459_227735798774420_6187227511864909339_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF2KursHQ8bZExY4b6-b4lX_d-_G_elWFT9378b96VYVCbxLNZFCzxVxEkFYsoHR5zFFO6L1dlOixr-3MnNgr-J&_nc_ohc=uPGyN5VHZPcAX9c6l_4&_nc_ht=scontent.fbkk12-2.fna&oh=00_AfBeWvK8wki9I-TasKXdc9rD6k8GBGu611fuvw_QcH4Iug&oe=63A182AF"></v-img>
          <v-card-title> ASIA GOLD </v-card-title>
          <v-card-subtitle> เข้าสู่ระบบ</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field color="red" v-model="user" label="ชื่อผู้ใช้"
              ><v-icon slot="prepend" color="red">
                mdi-account
              </v-icon></v-text-field
            >
            <v-text-field
              color="red"
              v-model="password"
              v-on:keyup.enter="authen()"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="รหัสผ่าน"
              @click:append="show1 = !show1"
              ><v-icon slot="prepend" color="red">
                mdi-lock
              </v-icon></v-text-field
            >
            <!-- <v-checkbox v-model="remember" label="จดจำฉันไว้?"></v-checkbox> -->
            <div class="d-flex justify-center align-center">
              <v-btn
                @click="authen()"
                :disabled="this.loading"
                :loading="this.loading"
                color="red"
                style="color: white"
                >เข้าสู่ระบบ</v-btn
              >
              <v-divider class="mx-3" vertical light></v-divider>
              <a href="">ลืมรหัสผ่าน?</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'loginLayout',
  data() {
    return {
      show1: false,
      loading:false,
      user:null,
      password:null
    }
  },
}
</script>

<style>
</style>