import { db } from "@/firebase/init";
import { collection, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";

export const useLicenciaStore = defineStore("licencia", {
	state: () => {
		return {
			licencias: {},
		};
	},
	actions: {
		async getLicenciasUser(cuil) {
			if (this.licencias[cuil]) {
				return this.licencias[cuil];
			} else {
				const col = collection(db, "licencias");
				const q = query(col, where("cuil", "==", Number(cuil)));
				const querySnapshot = await getDocs(q);
				this.licencias[cuil] = querySnapshot.docs.map((doc) =>
					doc.data()
				);
				return this.licencias[cuil];
			}
		},
		async getLicenciasUsers(cuils) {
			const newCuils = cuils.filter(
				(cuil) => !Object.keys(this.licencias).includes(cuil)
			);

			const col = collection(db, "licencias");
			const q = query(col, where("cuil", "in", newCuils));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((snap) => {
				this.licencias[snap.data()["cuil"]] = snap.data();
			});
			return this.licencias;
		},
	},
});
