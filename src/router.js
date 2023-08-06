import Vue from "vue";
import Router from "vue-router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: "/home",
			component: () => import("@/view/layout/Layout.vue"),
			children: [
				{
					path: "/home",
					name: "home",
					meta: {
						deepth: 1,
						name: "home",
					},
					component: () => import("@/view/pages/Home/Index.vue"),
				},
			],
		},
		{
			path: "*",
			redirect: "/404",
		},
		{
			path: "/error404",
			name: "404",
			component: () => import("@/view/pages/Error/Error.vue"),
			children: [
				{
					path: "/404",
					name: "error",
					component: () => import("@/view/pages/Error/Error404.vue"),
				},
			],
		},
	],
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((error) => { });
};

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach((transition) => {
	NProgress.done();
});

export default router;
