<template>
  <router-view />
</template>

<script>
import { OVERRIDE_LAYOUT_CONFIG } from "@/store/modules/config.module";
import AppEvents from "./event";

export default {
  data() {
    return {};
  },

  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
  },

  created() {
    
    AppEvents.forEach((item) => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
};
</script>
