import { db } from "@/firebase/init";
import { collection, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";

export const useProfesionalStore = defineStore("profesional", {
	state: () => {
		return {
			profesionales: {},
		};
	},
	actions: {
		async getProfesional(cuil) {
			if (this.profesionales[cuil]) {
				return this.profesionales[cuil];
			} else {
				const col = collection(db, "users");
				const q = query(col, where("cuil", "==", Number(cuil)));
				const querySnapshot = await getDocs(q);
				this.profesionales[cuil] = querySnapshot.docs[0].data();
				return this.profesionales[cuil];
			}
		},
		async getProfesionales(cuils) {
			const newCuils = cuils.filter(
				(cuil) => !Object.keys(this.profesionales).includes(cuil)
			);

			const col = collection(db, "users");
			const q = query(col, where("cuil", "in", newCuils));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((snap) => {
				this.profesionales[snap.data()["cuil"]] = snap.data();
			});
			return this.profesionales;
		},
	},
});
