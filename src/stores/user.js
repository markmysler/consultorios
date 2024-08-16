import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => {
		return {
			user: null,
			userData: null,
			userRole: null,
			loading: false,
			route_from: null,
		};
	},
	methods: {
		set(val) {
			this.user = val;
		},
	},
});
