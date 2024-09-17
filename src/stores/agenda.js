import { db } from "@/firebase/init";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { defineStore } from "pinia";

export const useAgendaStore = defineStore("agenda", {
	state: () => {
		return {
			agendas: {},
		};
	},
	actions: {
		async getAgendasConsultorio(sector, nombre) {
			if (this.agendas[sector] && this.agendas[sector][nombre]) {
				return this.agendas[sector][nombre];
			} else {
				const col = collection(db, "agendas");
				const q = query(
					col,
					where("consultorio.sector", "==", sector),
					where("consultorio.nombre", "==", nombre)
				);
				const querySnapshot = await getDocs(q);
				if (!this.agendas[sector]) {
					this.agendas[sector] = {};
				}
				this.agendas[sector][nombre] = querySnapshot.docs.map((doc) =>
					doc.data()
				);
				return this.agendas[sector][nombre];
			}
		},
	},
});
