<template>
  <div align="center">
    <v-container>
      <div
        v-if="isReady"
        :style="
          viewSize === 'xs'
            ? 'width:100%'
            : viewSize === 'sm' || viewSize === 'md'
            ? 'width:80%'
            : 'width:60%'
        "
      >
        <!-- searchBar -->
        <div id="searchBar" class="searchBar">
          <v-row class="pr-4">
            <v-col cols="10" sm="11">
              <v-text-field
                label="City / Country"
                filled
                rounded
                clearable
                color="black"
                class="roundedSize"
                hide-details="auto"
                v-model="form.Area"
                @keyup.enter="!form.Area || onSearch()"
              ></v-text-field>
            </v-col>

            <v-col cols="2" sm="1" class="px-0">
              <v-btn
                depressed
                color="one"
                dark
                block
                :disabled="!form.Area"
                class="roundedSize"
                height="100%"
                :loading="btnLoading"
                @click="onSearch()"
                ><v-icon>mdi-magnify</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pt-0" v-if="isError">
              <v-alert dense text color="red" style="border-radius:12px">
                Not found
              </v-alert>
            </v-col>
          </v-row>
        </div>

        <!-- resultCard -->
        <div id="resultCard" :style="viewSize === 'xs' ? 'margin:30% 0 15% 0' : 'margin:20% 0 10% 0'">
          <v-card
            color="rgba(255,255,255,0.2)"
            class="card-with-floating-image elevation-0"
            style="border-radius:40px; border: rgba(255,255,255,0.5) solid 1px;"
          >
            <div class="floating-image-container">
              <v-img src="@/assets/image/sun.png"></v-img>
            </div>

            <v-card-text :class="viewSize === 'xs' || 'pa-6'">
              <v-row>
                <v-col cols="12" align="start" justify="start" class="pb-0">
                  <span class="text-body-1 black--text"
                    ><v-icon color="red" small class="mx-1 mb-2"
                      >mdi-map-marker</v-icon
                    >{{ weather.name + ", " + weather.country }}</span
                  >
                  <br />
                  <span class="text-h2 font-weight-bold one--text">{{
                    weather.weather[0].main
                  }}</span>
                </v-col>
                <v-col cols="12" align="start" justify="start" class="pt-2">
                  <v-row>
                    <v-col
                      cols="3"
                      sm="4"
                      :class="viewSize === 'xs' || 'pl-5'"
                      align="start"
                    >
                      <v-icon
                        v-if="viewSize === 'xs'"
                        color="red"
                        class="mr-1"
                        small
                        >mdi-thermometer-low</v-icon
                      >
                      <span v-else class="text-body-2">Temperature: </span>
                      <span class="text-body-2"
                        >{{ Math.round(weather.main.temp) }}°c
                      </span>
                    </v-col>
                    <v-col cols="3" sm="4" align="center">
                      <v-icon
                        v-if="viewSize === 'xs'"
                        color="blue"
                        class="mr-1"
                        small
                        >mdi-water-percent</v-icon
                      >
                      <span v-else class="text-body-2">Humidity: </span>
                      <span class="text-body-2"
                        >{{ weather.main.humidity }}%</span
                      >
                    </v-col>
                    <v-col
                      cols="6"
                      sm="4"
                      align="end"
                      :class="viewSize === 'xs' || 'pr-5'"
                    >
                      <span class="text-body-2">{{
                        new Date() | formatDateTime
                      }}</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <!-- history record list  -->
              <historyCard
                :HistoryList="HistoryList"
                @onSearch="onSearch"
                @onDelete="onDelete"
              />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requiredRule } from "@/validation";
import axios from "axios";
import historyCard from "@/components/HomeC/HistoryCard.vue";

export default {
  name: "home",

  components: {
    historyCard,
  },

  data() {
    return {
      btnLoading: false,
      api_key: process.env.VUE_APP_APIKEY,
      api_url: process.env.VUE_APP_APIURL,
      form: {
        Area: null,
      },
      weather: {},
      HistoryList: [],
      isReady: false,
      isError: false,
    };
  },

  props: {},

  methods: {
    requiredValidation(args) {
      return requiredRule(args);
    },

    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // default binding weather depends on geoLocation
            this.searchLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            // if geoLocation is not supported; default set lat, lng value
            this.searchLatLng(1.2732, 103.8453);
            console.log(error);
          }
        );
      } else {
        // if geoLocation is not supported; default set lat, lng value
        this.searchLatLng(1.2732, 103.8453);
        console.log("Geolocation is not supported by this browser.");
      }
    },

    async searchLatLng(lat, lng) {
      const apiUrl = `${this.api_url}?lat=${lat}&lon=${lng}&appid=${this.api_key}`;

      await axios
        .get(apiUrl)
        .then((response) => {
          const resp = response.data;
          if (resp != null) {
            this.weather = resp;
            this.weather.country = this.weather.sys.country;
            this.isReady = true;
          }
        })
        .catch((error) => {
          window.getApp.$emit("FAILED_ALERT", error);
        });
    },

    async onSearch(e) {
      if (e) {
        this.form.Area = e;
      }

      this.isError = false;
      this.btnLoading = true;

      const apiUrl = `${this.api_url}?q=${this.form.Area}&appid=${this.api_key}`;

      await axios
        .get(apiUrl)
        .then((response) => {
          const resp = response.data;
          if (resp != null) {
            this.weather = resp;
            this.weather.country = this.weather.sys.country;

            //create added date and push
            this.weather.createdDate = new Date();
            this.HistoryList.push(this.weather);

            //after added in history list clear searchBar
            setTimeout(() => {
              this.clearSearchBar();
            }, 500);
          }

          this.btnLoading = false;
        })
        .catch((error) => {
          this.isError = true;
          this.btnLoading = false;
          console.log(error);
          // window.getApp.$emit("FAILED_ALERT", error);
        });
    },

    onDelete(e) {
      const splitValue = this.HistoryList.indexOf(e);
      this.HistoryList.splice(splitValue, 1);
    },

    clearSearchBar() {
      this.form.Area = null;
    },
  },

  created() {
    this.getCurrentLocation();
  },

  computed: {
    ...mapGetters({
      isXs: "isXs",
      viewSize: "viewSize",
      layoutConfig: "layoutConfig",
    }),
  },

  metaInfo() {
    return {
      title: "Today's Weather",
      meta: [
        {
          name: "description",
          content:
            "The description is set to inform users about checking today's weather forecast, planning their day, and staying informed about temperature and conditions.",
        },
        {
          name: "keywords",
          content: "weather, forecast, today",
        },
        { property: "og:title", content: "Today's Weather" },
        { property: "og:site_name", content: "Today's Weather" },
        {
          property: "og:description",
          content:
            "The description is set to inform users about checking today's weather forecast, planning their day, and staying informed about temperature and conditions.",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    };
  },
};
</script>

<style>
.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background: rgba(256, 256, 256, 0.2) !important;
}

.roundedSize {
  border-radius: 20px !important;
}

.card-with-floating-image {
  position: relative;
}

.floating-image-container {
  position: absolute;
  width: 40% !important;
  top: -120px;
  right: 5% !important;
  z-index: 1;
}

.searchBar {
  margin: 5% 0;
}

@media only screen and (min-width: 2550px) {
  .floating-image-container {
    width: 35% !important;
    top: -160px !important;
  }
}

@media only screen and (max-width: 1024px) {
  .floating-image-container {
    width: 40% !important;
    top: -120px !important;
  }
}

@media only screen and (max-width: 768px) {
  .floating-image-container {
    width: 40% !important;
    top: -100px !important;
  }
}

@media only screen and (max-width: 599px) {
  .roundedSize {
    border-radius: 8px !important;
  }

  .floating-image-container {
    width: 45% !important;
    top: -70px !important;
    right: 0% !important;
  }
}
</style>
