<template>
  <div>
    <v-container fluid color="white">
      <v-alert
        v-if="errorLogin"
        color="red"
        type="error"
        class="ma-3 mx-auto my-12"
        max-width="374"
        >user name or password error</v-alert
      >
      <v-card color="white" class="mx-auto my-12" max-width="374">
        <v-card-title>
          <v-icon class="ml-3 mr-3">mdi-lock</v-icon>
          Login
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-row class="mt-5">
            <v-text-field
              label="User Name"
              :rules="rules"
              v-model="username"
              hide-details="auto"
              class="ma-5 input-group--focused"
              @keydown.enter="login"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              class="ma-5 input-group--focused"
              @click:append="showPass = !showPass"
              @keydown.enter="login"
              v-model="password"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-btn
                class="primary pa-5 mt-2 mb-2 white--text"
                rounded
                dark
                larg
                block
                :loading="loading"
                @click="login"
                @keydown.enter="login"
                >Login</v-btn
              >
            </v-col>
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
      showPass: false,
      rules: [(value) => !!value || "Required."],
      loading: false,
      errorLogin: false,
    };
  },
  methods: {
    login() {
      this.loading = true;

      if (this.username == "admin" && this.password == "saeed") {
        localStorage.setItem("jwt", 1);
        return this.$router.push({ name: "Post" });
      } else {
        this.loading = false;
        this.errorLogin = true;
      }
    },
  },
};
</script>