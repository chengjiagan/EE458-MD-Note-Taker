<template>
  <div class="info-box">
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="Name">
        <a-input
          v-if="isEditName"
          ref="nameInput"
          type="text"
          size="small"
          v-model="newName"
          @keyup.enter="handleNameComfirm"
        />
        <span v-else>
          {{selectedItem.name}}
          <a-icon type="edit" @click="editName" />
        </span>
      </a-descriptions-item>

      <a-descriptions-item label="Last Change" v-if="selectedItem.lastChange">
        {{selectedItem.lastChange.toTimeString()}}
      </a-descriptions-item>

      <a-descriptions-item label="Tags" v-if="selectedItem.tags">
        <a-tag
          v-for="tag in selectedItem.tags"
          :key="tag"
          closable
          @close="() => removeNoteTag(tag)"
        >
          {{tag}}
        </a-tag>
        <a-input
          v-if="isaddNoteTag"
          ref="tagInput"
          type="text"
          size="small"
          style="width: 78px"
          v-model="newTagName"
          @keyup.enter="handleTagComfirm"
        />
        <a-tag
          v-else
          style="background: #fff; borderStyle: dashed;"
          @click="addNoteTag"
        >
          <a-icon type="plus" /> New Tag
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  name: "ItemInfo",
  props: ['itemKey'],
  data() {
    return {
      isEditName: false,
      isaddNoteTag: false,
      newTagName: "",
      newName: ""
    };
  },
  computed: {
    selectedItem() {
      return this.$store.state.items[this.itemKey];
    }
  },
  methods: {
    editName() {
      this.isEditName = true;
      this.newName = this.selectedItem.name;
      this.$nextTick(function() {
        this.$refs.nameInput.focus();
      });
    },
    handleNameComfirm() {
      this.isEditName = false;
      const inputValue = this.newName;
      this.$store.commit('changeName', {key: this.itemKey, name: inputValue})
      this.newName = "";
    },
    addNoteTag() {
      this.isaddNoteTag = true;
      this.$nextTick(function() {
        this.$refs.tagInput.focus();
      });
    },
    removeNoteTag(t) {
      this.$store.commit('removeNoteTag', {key: this.itemKey, tag: t});
    },
    handleTagComfirm() {
      const inputValue = this.newTagName;
      this.$store.commit('addNoteTag', {key: this.itemKey, tag: inputValue});
      
      this.isaddNoteTag = false;
      this.newTagName = "";
    }
  }
};
</script>

<style scoped>
.info-box {
  margin: 0 10px 10px 10px;
}
</style>