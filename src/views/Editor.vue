<template>
  <div>
    <editor
      v-model="editorText"
      api-key="no-api-key"
      @input="editorInput"
      :init="config"
      v-if="enabled"
    />
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  props: ["text", "enabled"],
  components: {
    editor: Editor,
  },
  mounted() {
    this.editorText = this.text;
  },
  data() {
    return {
      editorText: "",
      config: {
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount emoticons link directionality",
        ],
        toolbar:
          "undo redo | formatselect | bold italic forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | rtl ltr \
           bullist numlist outdent indent  | link | emoticons",
      },
    };
  },
  methods: {
    editorInput() {
      this.$emit("updateText", this.editorText);
    },
  },
};
</script>