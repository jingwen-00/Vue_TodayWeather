<template>
  <div>
    <v-row>
      <v-col cols="12"
        ><v-card
          color="rgba(255,255,255,0.2)"
          class="elevation-0 pa-4"
          style="border-radius: 24px;"
        >
          <v-card-title class="text-body-2 pt-2 px-0"
            >Search History</v-card-title
          >

          <!--History List-->
          <v-row class="pt-2">
            <v-col cols="12">
              <div v-if="HistoryList.length > 0">
                <v-card
                  color="rgba(255,255,255,0.4)"
                  class="elevation-0 px-4 mb-5"
                  style="border-radius: 16px;"
                  v-for="(item, i) in HistoryList"
                  :key="i"
                >
                  <v-row align="center">
                    <v-col cols="8" sm="9">
                      <v-row no-gutters>
                        <v-col cols="12" sm="6" align="start"
                          ><span class="text-body-2"
                            >{{ item.name }}, {{ item.sys.country }}</span
                          ></v-col
                        >
                        <v-col
                          cols="12"
                          sm="6"
                          :align="viewSize === 'xs' ? 'start' : 'end'"
                          ><span v-if="viewSize != 'xs'" class="text-body-2">{{
                            item.createdDate | formatDateTime
                          }}</span>

                          <small v-else>{{
                            item.createdDate | formatDateTime
                          }}</small></v-col
                        >
                      </v-row>
                    </v-col>

                    <!-- Action -->
                    <v-col
                      cols="4"
                      sm="3"
                      align="end"
                      :class="viewSize != 'xs' || 'px-0'"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="mr-2"
                            depressed
                            fab
                            x-small
                            color="white"
                            v-bind="attrs"
                            v-on="on"
                            @click="$emit('onSearch', item.name)"
                            ><v-icon color="#616161">mdi-magnify</v-icon></v-btn
                          >
                        </template>
                        <span>Search</span>
                      </v-tooltip>

                      <v-tooltip color="red" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="mr-2"
                            depressed
                            fab
                            x-small
                            color="white"
                            v-bind="attrs"
                            v-on="on"
                            @click="$emit('onDelete', item)"
                            ><v-icon color="#616161">mdi-delete</v-icon></v-btn
                          >
                        </template>
                        <span>Delete</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              <div v-else>
                <v-card
                  color="rgba(255,255,255,0.4)"
                  class="elevation-0 mb-5 px-4"
                  width="100%"
                  style="border-radius: 16px;"
                >
                  <v-row align="center">
                    <v-col cols="12">
                      <span class="text-body-2">No Record !</span>
                    </v-col>
                  </v-row></v-card
                >
              </div>
            </v-col>
          </v-row>
        </v-card></v-col
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HistoryCard",

  components: {},

  data() {
    return {};
  },

  props: {
    HistoryList: {
      type: Array,
    },
  },

  methods: {},

  computed: {
    ...mapGetters({
      isXs: "isXs",
      layoutConfig: "layoutConfig",
      viewSize: "viewSize",
    }),
  },
};
</script>
