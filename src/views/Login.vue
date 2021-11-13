<template>
  <div>
    <v-container fluid color="white">
      <v-alert
        v-if="errorLogin"
        color="red"
        type="error"
        class="ma-3 mx-auto my-12"
        max-width="374"
        >{{ errorLogin }}</v-alert
      >
      <v-card color="white" class="mx-auto my-12" max-width="374">
        <v-card-title>
          <v-icon class="ml-3 mr-3">mdi-lock</v-icon>
          Login
        </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-divider></v-divider>
            <v-row class="mt-5">
              <v-text-field
                label="User Name"
                :rules="rules"
                v-model="user.email"
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
                v-model="user.password"
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
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    if (this.isAuth) this.$router.push("/feeds");
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      showPass: false,
      rules: [(value) => !!value || "Required."],
      loading: false,
      errorLogin: "",
    };
  },
  methods: {
    ...mapActions(["auth"]),
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;

      try {
        await this.auth(this.user);
      } catch (error) {
        this.errorLogin = error.message;
      }

      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
};
</script>