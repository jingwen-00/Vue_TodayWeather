import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import moment from "moment";

Vue.config.productionTip = false;

//dataTime
Vue.filter("formatDateTime", function (value) {
	if (value) {
		return moment(value).format("DD-MM-YYYY hh:mm A");
	}
});

new Vue({
	router,
	vuetify,
	store,
	render: (h) => h(App),
}).$mount("#app");
