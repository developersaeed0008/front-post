<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" width="500" @click:outside="hideDialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Post Color </v-card-title>

        <v-color-picker
          dot-size="25"
          mode="rgba"
          swatches-max-height="200"
          class="ma-5"
          v-model="value"
        ></v-color-picker>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="selectColor">Change Color</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return { value: "" };
  },
  methods: {
    hideDialog() {
      this.$emit("updateView", false);
    },
    selectColor() {
      this.$emit("selectColor", this.value.substr(0, 7));
      this.hideDialog();
    },
  },
  computed: {
    showDialog() {
      return this.show;
    },
  },
};
</script>