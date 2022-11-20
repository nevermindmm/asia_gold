<template>
  <v-app>
    <v-app-bar dense elevation="1" fixed color="#E33E3F"></v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer dark padless elevation="1">
      <v-card color="#E33E3F" flat tile class="white--text text-center">
        <v-card-text>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@100;300;500&display=swap');
* {
  font-family: 'Prompt', sans-serif;
}
.v-application {
  /* background:#ff964f; */
}
</style>