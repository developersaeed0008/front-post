<template>
  <div>
    <v-container class="mt-5">
      <v-snackbar v-model="msg.show" :timeout="3000" :color="msg.color">
        {{ msg.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      <div v-for="(post, i) in Posts" :key="i" class="mt-5">
        <v-card :color="post.color">
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
          <v-card-text class="headline text-lg-2 text-right rtl black--text">
            <div
              v-if="post.text.length <= textLength || post.showMore"
              v-html="
                post.text
                  .replace(/\n/g, '<br />')
                  .replaceAll(
                    keywords,
                    `<span class='purple lighten-2 white--text'>${keywords}</span>`
                  )
              "
            ></div>

            <div
              v-else
              v-html="
                post.text
                  .replace(/\n/g, '<br />')
                  .substr(0, textLength)
                  .replaceAll(
                    keywords,
                    `<span class='purple lighten-2 white--text'>${keywords}</span>`
                  ) + ' ...'
              "
            ></div>
            <v-btn
              v-if="post.text.length > textLength && !post.showMore"
              class="ma-4 font-weight-bold"
              small
              text
              @click="post.showMore = true"
              >See More</v-btn
            >

            <v-btn
              v-if="post.text.length > textLength && post.showMore"
              class="ma-4 font-weight-bold"
              small
              text
              @click="post.showMore = false"
              >See Less</v-btn
            >
          </v-card-text>

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
                  @click="editingPost = post"
                  ><v-icon> mdi-square-edit-outline </v-icon>
                </v-btn>

                <v-btn
                  color="warning"
                  icon
                  depressed
                  class="mr-4"
                  @click="updatePostDialog(post)"
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
      <color-palette
        :show="showPalette"
        @updateView="updatePaletteState"
        @selectColor="setPostColor"
      ></color-palette>
    </v-container>
    <edit-post
      v-if="editingPost"
      :post="editingPost"
      @updated="updatePostText"
      @cancelEditing="cancelEdit"
    ></edit-post>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ColorPalette from "./ColorPalette.vue";
import EditPost from "./EditPost.vue";
import moment from "moment";

export default {
  async mounted() {
    this.restPosts();
    this.keywords = this.$route.query.keywords;

    window.addEventListener("scroll", this.handleScroll);

    if (this.isAuth) {
      this.$store.dispatch("getPosts");
    }
  },
  components: {
    "color-palette": ColorPalette,
    "edit-post": EditPost,
  },
  data() {
    return {
      moment: moment,
      keywords: "",
      textLength: 300,
      showPalette: false,
      rules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 10 || "Minimum length is 10 characters",
      ],
      editingPost: "",
    };
  },
  computed: {
    avatar() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
    },
    ...mapGetters(["Posts", "loading", "msg", "isAuth"]),
  },
  methods: {
    ...mapActions(["updatePost", "likePost", "updateColor", "deletePost"]),
    ...mapMutations(["restPosts"]),
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
          if (this.isAuth) this.$store.dispatch("getPosts");
        }
      } catch (err) {
        this.status = err;
      }
    },
    updatePostDialog(post) {
      this.showPalette = true;
      this.postEditColor = post._id;
    },
    updatePaletteState(newState) {
      this.showPalette = newState;
    },
    setPostColor(color) {
      const post = this.Posts.find((post) => post._id == this.postEditColor);
      post.color = color;
      this.updateColor(post);
      this.postEditColor = "";
    },
    updatePostText(text) {
      this.editingPost.text = text;
      this.updatePost(this.editingPost);
      this.editingPost = null;
    },
    cancelEdit() {
      this.editingPost = null;
    },
  },
};
</script>
<style>
/*
 * Droid Arabic Kufi (Arabic) http://www.google.com/fonts/earlyaccess
 */
body {
  font-size: 1rem;
}
@font-face {
  font-family: "Droid Arabic Kufi";
  font-style: normal;
  font-weight: 400;
  src: url(//fonts.gstatic.com/ea/droidarabickufi/v6/DroidKufi-Regular.eot);
  src: url(//fonts.gstatic.com/ea/droidarabickufi/v6/DroidKufi-Regular.eot?#iefix)
      format("embedded-opentype"),
    url(//fonts.gstatic.com/ea/droidarabickufi/v6/DroidKufi-Regular.woff2)
      format("woff2"),
    url(//fonts.gstatic.com/ea/droidarabickufi/v6/DroidKufi-Regular.woff)
      format("woff"),
    url(//fonts.gstatic.com/ea/droidarabickufi/v6/DroidKufi-Regular.ttf)
      format("truetype");
}
.rtl {
  direction: rtl;
}
body,
.v-application .headline {
  font-family: "Droid Arabic Kufi", serif !important;
  font-size: 1rem !important;
}
.v-application p {
  margin-bottom: 0;
}
.v-card__text br {
  display: block;
  margin-bottom: 2px;
  font-size: 2px;
  line-height: 2px;
}
</style>

