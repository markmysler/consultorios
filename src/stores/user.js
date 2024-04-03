import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => {
		return { user: null };
	},
	methods: {
		set(val) {
			this.user = val;
		},
	},
});
