<template>
  <div>
    <v-container class="mt-5">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="blue"
        :size="70"
        :width="7"
      ></v-progress-circular>
      <div v-else-if="box">
        <v-card
          class="d-flex justify-center ma-5 pa-5"
          flat
          v-for="bx in box"
          :key="bx.id"
          >{{ bx.name }} : {{ bx.amount }}</v-card
        >
      </div>
    </v-container>
  </div>
</template>
<script>
import { getData } from "../plugins/axios";

export default {
  async mounted() {
    this.getBox();
  },
  data() {
    return {
      box: [],
      loading: false,
    };
  },
  computed: {},
  methods: {
    async getBox() {
      this.loading = true;

      const resp = await getData("/box/all");

      if (resp) this.box = resp.data.box;
      this.loading = false;
    },
  },
};
</script>