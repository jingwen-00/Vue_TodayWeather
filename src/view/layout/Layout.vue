<template>
  <v-app>
    <v-main>
      <Transition name="fade">
        <router-view />
      </Transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      isXs: "isXs",
      viewSize: "viewSize",
    }),
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      let e = window.innerWidth;
      this.$store.dispatch("ChangeViewSize", e);
    },
  },
};
</script>

<style>
.v-main {
  background-image: url("~@/assets/image/bgLight.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
