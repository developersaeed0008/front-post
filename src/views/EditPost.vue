<template>
  <div>
    <v-dialog v-model="post" @click:outside="hideDialog" max-width="80%">
      <v-card>
        <v-card-title class="text-h5 primary lighten-2"
          >Editing Post</v-card-title
        >
        <v-snackbar v-model="msg.show" :timeout="3000" :color="msg.color">
          {{ msg.text }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>

        <editor
          v-if="post"
          :text="post.text"
          :enabled="enabled"
          @updateText="updateText"
        ></editor>

        <v-card-actions>
          <v-flex>
            <v-btn
              color="success"
              class="white--text ma-2"
              depressed
              @click="updatePost(post)"
              ><v-icon> mdi-content-save-outline </v-icon> Save
            </v-btn>
            <v-btn color="red" @click="hideDialog" class="white--text ma-2"
              ><v-icon> mdi-cancel </v-icon> Cancel
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
//import Editor from ;
export default {
  props: ["post"],
  components: {
    editor: () => import("./Editor.vue"),
  },
  data() {
    return {
      loading: false,
      text: "",
      enabled: false,
      msg: {
        show: false,
        text: "",
        color: "black",
      },
    };
  },
  mounted() {
    this.text = this.post.text;
    this.enabled = true;
  },
  methods: {
    updateText(value) {
      this.text = value;
    },
    updatePost() {
      this.$emit("updated", this.text);
    },
    hideDialog() {
      this.$emit("cancelEditing", false);
    },
  },
};
</script>