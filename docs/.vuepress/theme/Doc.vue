<template>
  <main class="page-doc">
    <Content :custom="false" ref="content" class="doc-content" />
  </main>
</template>

<script>
import Sidebar from "./Sidebar";
export default {
  components: {
    Sidebar
  },
  props: ["items"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="stylus">
.page-doc {
  padding-left: 20rem;
  padding-top: 4.4rem;
}

.doc-content:not(.custom) {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 2.5rem;

  > h1:first-child, .content__default > h2:first-child, .content__default > h3:first-child, .content__default > h4:first-child, .content__default > h5:first-child, .content__default > h6:first-child {
    text-align: left ;
  }
}

@media (max-width: 959px) {
  .doc-content:not(.custom) {
    padding: 2rem;
  }
}

@media (max-width: 419px) {
  .doc-content:not(.custom) {
    padding: 1.5rem;
  }
}
</style>
