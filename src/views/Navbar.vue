<template>
  <div v-if="isAuth">
    <v-app-bar color="primary accent-4" dense dark fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title
        ><v-btn class="primary" to="/feeds"><v-icon>mdi-home</v-icon></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center ma-5">
        <v-text-field
          placeholder="post search"
          clearable
          class="mt-4"
          v-model="search"
          @keydown.enter="searching"
        ></v-text-field>
        <v-btn icon class="mx-1 d-none d-sm-flex mt-3" @click="searching">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
      <v-btn @click="showCreatePost = true" class="success mx-1 mr-4">
        <v-icon left>mdi-plus-circle-outline</v-icon>
        new post
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex" to="/liked">
        <v-icon :color="$route.name == 'Liked' ? 'red' : ''">mdi-heart</v-icon>
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex" to="/box">
        <v-icon>mdi-currency-usd</v-icon>
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex" d-none>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <span class="ml-2">{{ userName }}</span>
      <v-btn class="primary" icon @click="logout">
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <create-post
      v-if="showCreatePost"
      :show="showCreatePost"
      @updateDg="updateDialogState"
    ></create-post>

    <v-toolbar flat color="transparent">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CreatePost from "./CreatePost";
export default {
  components: {
    "create-post": CreatePost,
  },
  data() {
    return {
      showCreatePost: false,
      search: "",
    };
  },
  methods: {
    logout() {
      this.$store.commit("clearToken");
      this.$router.push({ name: "login" });
    },
    updateDialogState(value) {
      this.showCreatePost = value;
    },
    searching() {
      if (this.search) this.$router.push("/search/?keywords=" + this.search);
    },
  },
  computed: {
    ...mapGetters(["isAuth", "userName"]),
  },
};
</script>
