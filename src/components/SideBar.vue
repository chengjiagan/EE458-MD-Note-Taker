<template>
  <div style="height: 100%; display: flex; flex-direction: row; align-items: center;  justify-content: space-around;">
    <a-menu theme="dark" :selectedKeys="keys" @select="onSelect" >
      <a-menu-item key="dir">
        <a-icon type="folder" />
        <span>Folder</span>
      </a-menu-item>
      <a-menu-item key="tag">
        <a-icon type="tags" />
        <span>Tags</span>
      </a-menu-item>
      <a-menu-item key="edit">
        <a-icon type="edit" />
        <span>Edit</span>
      </a-menu-item>
      <a-menu-item key="search">
        <a-icon type="search" />
        <span>Search</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    onSelect(info) {
      this.$store.commit('changeTab', info.key)
    }
  },
  computed: {
    keys() {
      return [this.$store.state.currentTab]
    }
  }
};
</script>