import Vue from "vue";
import Vuex from "vuex";

import config from "./modules/config.module";
import setting from "./modules/setting.module";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		config,
		setting,
	},
});

export default store;
