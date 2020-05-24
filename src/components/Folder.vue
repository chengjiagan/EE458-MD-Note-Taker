<template>
  <div style="height: 100%; position: relative">
    <a-button @click="onNewNote">New Note</a-button>
    <a-button @click="onNewDir">New Folder</a-button>
    <a-button @click="onDelete">Delete</a-button>
    <a-directory-tree
      :tree-data="dirRoot"
      :selectedKeys="[selectedKey]"
      draggable
      @drop="onDrop"
      @select="onSelect"
    />
    <ItemInfo v-if="selectedKey" class="item-info" :itemKey="selectedKey" />
  </div>
</template>

<script>
import ItemInfo from "./ItemInfo.vue";
import { mapState } from 'vuex'

export default {
  name: "Folder",
  data() {
    return {
      selectedKey: ""
    };
  },
  computed: {
    dirRoot() {
      return this.$store.getters.dirTree;
    },
    ...mapState(['items'])
  },
  methods: {
    onSelect(keys) {
      if (keys[0] === this.selectedKey) {
        this.$store.commit('openNote', this.selectedKey);
      }
      this.selectedKey = keys[0];
    },
    onDrop({dragNode, node}) {
      this.$store.commit('changeNoteParent', {key: dragNode.eventKey, parent: node.eventKey});
    },
    isDir() {
      return this.items[this.selectedKey].isDir;
    },
    onNewNote() {
      if (this.selectedKey) {
        let parent = this.selectedKey;
        if (!this.isDir()) {
          parent = this.items[this.selectedKey].parent;
        }
        let key = 'note-' + (Object.keys(this.items).length + 1);
        this.$store.commit('addNote', {key, parent});
        this.selectedKey = key;
      }
    },
    onNewDir() {
      let parent = "";
      if (this.selectedKey) {
        if (!this.isDir()) {
          parent = this.items[this.selectedKey].parent;
        } else {
          parent = this.selectedKey;
        }
      } else {
        parent = "root";
      }

      let key = 'dir-' + (Object.keys(this.items).length + 1);
      this.$store.commit('addDir', {key, parent});
      this.selectedKey = key;
    },
    onDelete() {
      if (this.selectedKey) {
        this.$store.commit('removeItem', this.selectedKey);
      }
      this.selectedKey = "";
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
