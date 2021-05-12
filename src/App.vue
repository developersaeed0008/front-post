<template>
  <v-app>
    <navbar></navbar>
    <router-view />
  </v-app>
</template>
<script>
import Navbar from "./views/Navbar";
export default {
  components: { navbar: Navbar },
};
</script>
<style scoped>
#app {
  background-color: rgb(243, 243, 243);
}
</style>
