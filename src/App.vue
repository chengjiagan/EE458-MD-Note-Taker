<template>
  <a-layout style="height: 100%">
    <a-layout-sider v-model="collapsed" collapsible>
      <SideBar />
    </a-layout-sider>
    <a-layout-content>

        <component :is="tabContent" />

    </a-layout-content>
  </a-layout>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Editor from './components/Editor.vue'
import Folder from './components/Folder.vue'
import Tags from './components/Tags.vue'
import Search from './components/Search.vue'

export default {
  name: 'App',
  data() {
    return {
      collapsed: true,
    };
  },
  components: {
    SideBar,
    Editor,
    Folder,
    Tags,
    Search
  },
  computed: {
    tabContent() {
      switch(this.$store.state.currentTab) {
        case 'dir': return Folder;
        case 'tag': return Tags;
        case 'edit': return Editor;
        case 'search': return Search;
        default: return Folder;
      }
    }
  }
}
</script>