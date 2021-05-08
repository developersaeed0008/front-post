<template>
  <div>
    <v-container fluid color="white">
      <v-card color="white" class="mx-auto my-12" max-width="374">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-row>
            <input
              type="text"
              outlined
              filled
              placeholder="username"
              class="pa-2 ma-5"
              v-model="username"
            />
          </v-row>
          <v-row>
            <input
              type="password"
              placeholder="password"
              class="pa-2 ma-5"
              color="primary"
              v-model="password"
            />
          </v-row>
          <v-row>
            <v-btn
              class="primary pa-3 white--text"
              rounded
              block
              dark
              @click="login"
              sm
              >Login</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username == "admin" && this.password == "saeed") {
        localStorage.setItem("jwt", 1);
        return this.$router.push({ name: "Post" });
      }
    },
  },
};
</script>