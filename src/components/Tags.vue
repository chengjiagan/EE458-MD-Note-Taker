<template>
  <div style="position: relative; height: 100%">
    <a-button @click="onAddTag">Add Tag</a-button>
    <a-button @click="onDelete">Delete</a-button>
    <a-directory-tree :tree-data="tags" @select="onSelect" />
    <ItemInfo v-if="this.selectedKey && this.isNote" class="item-info" :itemKey="selectedKey" />
    <a-modal title="Input New Tag Name" :visible="inputVisible" @ok="onOK" @cancel="inputVisible = false">
      <a-input v-model="tagName" />
    </a-modal>
  </div>
</template>

<script>
import ItemInfo from "./ItemInfo.vue";

export default {
  name: "Folder",
  data() {
    return {
      selectedKey: "",
      inputVisible: false,
      tagName: ""
    };
  },
  computed: {
    tags() {
      return this.$store.getters.tagTree;
    },
    isNote() {
      return this.$store.state.items[this.selectedKey];
    }
  },
  methods: {
    onSelect(keys) {
      if (keys[0] === this.selectedKey) {
        this.$store.commit("openNote", this.selectedKey);
      }
      this.selectedKey = keys[0];
    },
    onAddTag() {
      this.inputVisible = true;
      this.tagName = "";
    },
    onOK() {
      this.inputVisible = false;
      this.$store.commit('addTag', this.tagName);
    },
    onDelete() {
      if (!this.isNote) {
        this.$store.commit('removeTag', this.selectedKey);
      } else {
        this.$store.commit('removeItem', this.selectedKey);
      }
    }
  },
  components: {
    ItemInfo
  }
};
</script>

<style scoped>
.item-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
