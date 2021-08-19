<template>
  <div>
    <v-dialog v-model="showDialog" @click:outside="hideDialog" max-width="80%">
      <v-card>
        <v-card-title class="text-h5 primary lighten-2"
          >Create New Post</v-card-title
        >
        <v-snackbar v-model="msg.show" :timeout="3000" :color="msg.color">
          {{ msg.text }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>

        <editor
          :text="post.text"
          :enabled="enabled"
          @updateText="updateText"
        ></editor>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            block
            elevation="2"
            :loading="loading"
            :disabled="post.text.length < 20"
            rounded
            @click="savePost"
            class="mt-3 btn-md"
            >Post</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Editor from "./Editor.vue";
export default {
  props: ["show"],
  components: {
    editor: Editor,
  },
  mounted() {
    this.enabled = true;
  },
  data() {
    return {
      loading: false,
      enabled: false,
      post: {
        text: "",
      },
      msg: {
        show: false,
        text: "",
        color: "black",
      },
    };
  },
  methods: {
    ...mapActions(["createPost"]),
    async savePost() {
      try {
        if (!this.post.text) {
          return;
        }
        this.loading = true;
        await this.createPost(this.post);
        this.loading = false;

        this.msg.text = "post created successfully !";
        this.msg.show = true;
        this.msg.color = "success";
        setTimeout(() => {
          this.editor = "";
          this.$emit("updateDg", false);
        }, 500);
      } catch (err) {
        this.msg.text = err;
        this.msg.show = true;
        this.msg.color = "danger";
      }
    },
    updateText(value) {
      this.post.text = value;
    },
    hideDialog() {
      this.$emit("updateDg", false);
    },
  },
  computed: {
    showDialog() {
      return this.show;
    },
  },
};
</script>