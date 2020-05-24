<template>
  <div class="search-box">
    <a-input v-model="searchInput" class="search-input" />
    <a-list layout="vertical" :data-source="result">
      <a-list-item slot="renderItem" :key="item.key" slot-scope="item">
        <a-list-item-meta :title="item.name">
          <template slot="description">
            <a-tag v-for="tag in item.tags" :key="tag">{{tag}}</a-tag>
          </template>
        </a-list-item-meta>
        {{item.content.substring(0, 100)}}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "underscore";

export default {
  Name: "Search",
  data() {
    return {
      searchInput: ""
    };
  },
  computed: {
    ...mapState(["items"]),
    result() {
      let res = _.filter(this.items, e => {
        if (!e.isDir) {
          let keywords = this.searchInput.split(" ").filter(s => s);
          if (keywords.length === 0) {
            return false;
          } else {
            return keywords.every(s => e.haveKeyword(s));
          }
        } else {
          return false;
        }
      });
      return res;
    }
  }
};
</script>

<style scoped>
.search-box {
  padding: 10px;
}

.search-input {
  margin-bottom: 10px;
}
</style>
