<template>
  <div>
    <v-container>
      <v-snackbar v-model="msg.show" :timeout="3000" :color="msg.color">
        {{ msg.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      <div v-for="(post, i) in Posts" :key="i" class="mt-5">
        <v-card color="white">
          <v-card-title class="pt-0 pb-0">
            <v-list-item-avatar color="grey darken-3">
              <v-img class="elevation-6" alt="" :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <v-icon> mdi-clock </v-icon>
            <span
              class="pa-2"
              :title="moment(post.postDate).format('DD-MMM YYYY')"
              >{{ getDate(post.postDate) }}</span
            >
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="headline text-lg-2 text-right rtl black--text"
            v-if="!post.edit"
          >
            <div v-html="post.text.replace(/\n/g, '<br />')"></div>
          </v-card-text>
          <v-form v-else>
            <v-textarea
              v-model="post.text"
              :rules="rules"
              class="headline text-lg-2 text-right rtl ma-2"
              bordered
              outlined
            ></v-textarea>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-list-item>
              <v-row class="d-flex justify-end">
                <v-btn
                  color="red"
                  icon
                  depressed
                  class="mr-4"
                  v-if="!post.edit"
                  @click="delPost(post)"
                  ><v-icon> mdi-delete-outline </v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  icon
                  depressed
                  class="mr-4"
                  v-if="!post.edit"
                  @click="post.edit = true"
                  ><v-icon> mdi-square-edit-outline </v-icon>
                </v-btn>

                <v-btn
                  color="red"
                  icon
                  depressed
                  class="mr-4"
                  v-if="post.edit"
                  @click="post.edit = false"
                  ><v-icon> mdi-cancel </v-icon>
                </v-btn>
                <v-btn
                  color="success"
                  icon
                  depressed
                  class="mr-4"
                  v-if="post.edit"
                  @click="updatePost(post)"
                  ><v-icon> mdi-content-save-outline </v-icon>
                </v-btn>
                <v-btn
                  color="warning"
                  icon
                  depressed
                  class="mr-4"
                  v-if="!post.edit"
                  ><v-icon> mdi-palette </v-icon>
                </v-btn>
                <v-btn color="info" icon depressed class="mr-4 d-none">
                  <v-icon> mdi-share-variant </v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  depressed
                  dark
                  class="mr-4"
                  :icon="!post.liked"
                  v-if="!post.edit"
                  @click="likePost(post)"
                  ><v-icon :left="post.liked"> mdi-heart </v-icon>
                  {{ post.liked ? " liked" : "" }}
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
      <v-card class="d-flex justify-center ma-5 pa-5" flat>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="blue"
          :size="70"
          :width="7"
        ></v-progress-circular>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import moment from "moment";

export default {
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("getPosts");
  },
  data() {
    return {
      moment: moment,
      colors: [
        "#26c6da",
        "primary",
        "red lighten-2",
        "blue-grey",
        "success",
        "warning",
      ],
      rules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 10 || "Minimum length is 10 characters",
      ],
    };
  },
  computed: {
    avatar() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
    },
    ...mapGetters(["Posts", "loading", "msg"]),
  },
  methods: {
    ...mapActions(["updatePost", "likePost", "deletePost"]),
    delPost(post) {
      try {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.deletePost(post._id);
            }
          });
      } catch (err) {
        this.$store.commit("setMsg", {
          text: err.message,
          show: true,
          color: "red",
        });
      }
    },

    getDate(date) {
      if (moment(date) > moment().add(-1, "years"))
        return moment(date).fromNow();
      else return moment(date).format("DD-MMM YYYY");
    },
    handleScroll() {
      try {
        let dom = document.documentElement || document.body;
        const { scrollHeight, clientHeight, scrollTop } = dom;

        if (scrollTop + clientHeight >= scrollHeight - scrollHeight * 0.05) {
          this.$store.dispatch("getPosts");
        }
      } catch (err) {
        this.status = err;
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

