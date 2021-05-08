<template>
  <div>
    <v-container class="pa-4">
      <v-snackbar v-model="msg.show" :timeout="3000" :color="msg.color">
        {{ msg.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>

      <v-form ref="form">
        <v-row>
          <v-textarea
            v-model="post.text"
            filled
            class="headline text-lg-2 text-right rtl ma-2 mt-4"
            label="What's news , what in your mind"
            rows="8"
            row-height="40"
            shaped
            outlined
            :rules="rules"
          ></v-textarea>
        </v-row>
        <v-flex justify-center md3>
          <v-btn
            color="primary"
            block
            elevation="2"
            :loading="loading"
            rounded
            @click="savePost"
            class="mt-3"
            >Post</v-btn
          >
        </v-flex>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import { postData } from "@/plugins/axios";
export default {
  data() {
    return {
      loading: false,
      post: {
        text: "",
      },
      msg: {
        show: false,
        text: "",
        color: "black",
      },
      rules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 10 || "Minimum length is 10 characters",
      ],
    };
  },
  methods: {
    async savePost() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        this.loading = true;

        await postData("add-post", JSON.stringify(this.post));

        this.loading = false;
        this.post.text = "";
        this.msg.text = "post create success";
        this.msg.show = true;
        this.msg.color = "success";
      } catch (err) {
        this.msg.text = err;
        this.msg.show = true;
        this.msg.color = "danger";
      }
    },
  },
};
</script>
<style>
.rtl {
  direction: rtl;
}
</style>