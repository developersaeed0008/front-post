<template>
  <div>
    <v-container class="mt-5">
      <v-row>
        <v-col cols="8">
          <v-text-field
            type="text"
            v-model="keywords"
            @keydown.enter="search"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="primary"
            elevation="2"
            @click.prevent="search"
            type="button"
            >search
          </v-btn>
        </v-col>
      </v-row>

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="blue"
        :size="70"
        :width="7"
      ></v-progress-circular>
      <v-row v-else>
        <v-card
          class="mx-auto my-2"
          max-width="374"
          v-for="(video, i) in videos"
          :key="i"
        >
          <a :href="video.src" :target="'new-' + video.src">
            <v-lazy-image
              height="250"
              :src="video.img"
              @intersect="getThumbnail(video)"
            />
          </a>

          <v-card-title>
            <a
              :href="video.link"
              :target="'new-' + video.link"
              class="text-subtitle-1"
              >{{ video.title }}</a
            >
          </v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ms-1">4.5 (413)</div>
            </v-row>

            <v-row class="my-1 text-subtitle-1">
              <v-col cols="6" class="text-center">{{ video.date }}</v-col>
              <v-col cols="6" class="text-center">{{
                humanDate(video.date)
              }}</v-col>
            </v-row>
          </v-card-text>

          <v-divider class="mx-1"></v-divider>

          <v-chip-group
            active-class="deep-purple accent-4 white--text"
            class="pa-2"
            column
          >
            <v-chip v-if="video.series">{{ video.series }}</v-chip>
            <v-chip v-if="video.quality">{{ video.quality }}</v-chip>
          </v-chip-group>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { postData } from "../plugins/axios";
import moment from "moment";
import VLazyImage from "v-lazy-image/v2";

export default {
  components: {
    VLazyImage,
  },
  async mounted() {},
  data() {
    return {
      moment: moment,
      videos: [],
      keywords: "",
      loading: false,
    };
  },
  computed: {},
  methods: {
    async search() {
      if (!this.keywords) return;

      this.loading = true;

      const resp = await postData("/links", {
        keywords: this.keywords.replace(" ", "+"),
      });
      this.videos = resp;
      this.loading = false;
    },
    async getThumbnail(video) {
      if (video.img) return;

      let imgLink = await postData("/image", { link: video.link });

      video.img = imgLink.link;
      video.src = imgLink.src;
    },
    humanDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
<style scoped>
.v-lazy-image {
  width: 100%;
}
</style>