<template>
  <div>
    <v-container class="mt-5" id="boobs">
      <v-row class="white pa-5">
        <v-col cols="5">
          <v-text-field
            type="text"
            v-model="keywords"
            @keydown.enter="search"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="vidSource"
            :items="targetList"
            label="select source"
            item-text="name"
            item-value="link"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="2" v-if="vidSource.indexOf('vk') != -1">
          <v-select
            v-model="vkPage"
            :items="vkPages"
            label="select page"
            item-text="name"
            item-value="link"
            outlined
          ></v-select>
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

      <v-row class="white--bg pa-3 white">
        <v-chip
          v-for="star in stars"
          :key="star"
          class="ma-1 white--text"
          color="blue"
          @click="keywords = star"
          >{{ star }}</v-chip
        >
      </v-row>
      <v-row class="white--bg pa-3 white">
        <v-chip
          v-for="channel in channels"
          :key="channel"
          class="ma-1 white--text"
          color="red"
          @click="keywords = channel"
          >{{ channel }}</v-chip
        >
      </v-row>
      <v-progress-circular
          v-if="loading"
          indeterminate
          color="blue"
          :size="70"
          :width="7"
          class="mt-5"
        ></v-progress-circular>
      <v-row class="mt-5" v-if="!loading">
        <v-card
          class="mx-auto my-2"
          max-width="374"
          v-for="(video, i) in videos"
          :key="i"
          @mouseenter="video.info = true"
          @mouseleave="video.info = false"
        >
          <a :href="video.src" :target="'new-' + video.src">
            <v-lazy-image
              height="250"
              src=""
              @intersect="getThumbnail(video)"
             
            />
            <img :src="video.img"  @key="video.href" v-if="video.img" style="width:100%" class="pa-1">
          </a>

          <v-card-title>
            <a
              :href="video.href"
              :target="'new-' + video.href"
              class="text-subtitle-1"
              >{{ video.title }}</a
            >
          </v-card-title>

          <v-card-text v-if="video.info">
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

            <v-row class="text-subtitle-1">
              <v-col cols="6" class="text-center">{{ video.date }}</v-col>
              <v-col cols="6" class="text-center">{{
                humanDate(video.date)
              }}</v-col>
            </v-row>
          </v-card-text>

          <v-divider class="mx-1" v-if="video.info"></v-divider>

          <v-chip-group
            v-if="video.info"
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
import VLazyImage from "v-lazy-image";

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
      vidSource: "",
      vkPage: "",
      loading: false,
      baseUrl: process.env.VUE_APP_SRCAPING,
      targetList: [
        { name: "hot", link: "hot/links" },
        { name: "VK", link: "vk/links" },
      ],
      vkPages: [
        { name: "Plumperpass", link: "@world_bbw" },
        { name: "PORNO Full HD ", link: "@public172454327" },
        { name: "KAMASTETICA", link: "@zzprn" },
        { name: "clubporn school", link: "@clubporn_school" },
        { name: "COZI ", link: "@thecozi" },
        { name: "COZY ", link: "@thecozy" },
        { name: "legal porno", link: "@i_love_pornn" },
        { name: "+18 ", link: "@lvnprn18" },
        { name: "porno ", link: "@club170274984" },
        { name: "club ", link: "@clubanal_school" },
      ],
      stars: [
        "Skylar Vox",
        "Lucie Wilde",
        "Alyx Star",
        "Jakie hoff",
        "Krystal Swift",
        "Abigaiil Morris",
        "Skylar Snow",
        "Kate Dee",
        "Ava Addams",
        "Angela White",
        "Angel Deluca",
        "Nyx Monroe",
        "Harmony White",
        "Milly Marx",
        "Stella Daniels",
        "Andi Ray",
        "Briana Black",
        "CHANEL BARBIE",
        "Elisa Mae",
        "REFLEXION",
      ],
      channels: [
        "BrazzersExxtra",
        "rkprime",
        "pornworld",
        "PenthouseGold",
        "PornMegaLoad",
        "PlumperPass",
        "Private",
        "blacked",
        "LegalPorno",
        "analvids",
        "naughtyamerica",
        "Inserted",
        "FamilyTherapyXXX",
        "AssParade",
        "ArchAngel",
        "Bang",
        "GotMylf",
        "RodneyMoore",
      ],
    };
  },
  computed: {},
  methods: {
    async search() {
      if (!this.vidSource) return;

      this.loading = true;

      const resp = await postData(this.baseUrl + this.vidSource, {
        keywords: this.keywords,
        page: this.vkPage,
      });

      resp.forEach((res) => (res.info = false));

      this.videos = resp;
      this.loading = false;
    },
    async getThumbnail(video) {
      if (video.img || this.vkPage) return;
      
      let imgLink = await postData(this.baseUrl + "hot/image", {
        link: video.href,
      });

      video.img = imgLink.link;
      video.src = imgLink.src;
    },
    humanDate(date) {
      let dt = moment(date);
      if (dt.isValid()) return dt.fromNow();
    },
  },
};
</script>
<style scoped>
.v-lazy-image {
  width: 100%;
}
#boobs a.text-subtitle-1 {
  white-space: nowrap;
  overflow: hidden;
}
#boobs a.text-subtitle-1:hover {
  white-space: normal;
  overflow: none;
}
#boobs .v-card__title {
  padding: 0.5rem;
}
</style>