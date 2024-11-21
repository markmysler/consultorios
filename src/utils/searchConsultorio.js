import { db } from "@/firebase/init";
import { getDocs, query, where, collection } from "firebase/firestore";
import { isTimeInRange } from "@/utils/searchProfessionalFS";
import { CONSULTORIOS_LIST } from "@/constants/models";

export async function searchConsultorio(search) {
	const agendasCollection = collection(db, "agendas");

	// Early return cases for single filters
	if (
		search.sector &&
		!Object.values(search).some((v) => v && v !== search.sector)
	) {
		return CONSULTORIOS_LIST.filter(
			(consultorio) => consultorio.sector === search.sector
		);
	}

	if (
		search.numero &&
		!Object.values(search).some((v) => v && v !== search.numero)
	) {
		return CONSULTORIOS_LIST.filter(
			(consultorio) => consultorio.nombre === search.numero
		);
	}

	if (
		search.sector &&
		search.numero &&
		!search.input &&
		!search.especialidad &&
		!search.disponibilidad
	) {
		return CONSULTORIOS_LIST.filter(
			(consultorio) =>
				consultorio.sector === search.sector &&
				consultorio.nombre === search.numero
		);
	}

	if (
		search.input &&
		!search.sector &&
		!search.numero &&
		!search.especialidad &&
		!search.disponibilidad
	) {
		const agendaQuery = query(
			agendasCollection,
			where("nombre_agenda", "==", search.input)
		);
		const agendaDocs = await getDocs(agendaQuery);

		if (agendaDocs.empty) return [];

		const consultorioData = agendaDocs.docs[0].data().consultorio;
		return CONSULTORIOS_LIST.filter(
			(consultorio) =>
				consultorio.nombre === consultorioData.nombre &&
				consultorio.sector === consultorioData.sector
		);
	}

	// Complex cases: build Firestore query
	const filters = [];
	if (search.sector)
		filters.push(where("consultorio.sector", "==", search.sector));
	if (search.numero)
		filters.push(where("consultorio.nombre", "==", search.numero));
	if (search.sector)
		filters.push(where("consultorio.sector", "==", search.sector));
	if (search.especialidad) {
		if (search.disponibilidad === "libre") {
			throw new Error(
				"If disponibilidad is 'libre', especialidad must be empty."
			);
		}
		filters.push(where("especialidad", "==", search.especialidad));
	}
	if (search.fecha)
		filters.push(where("dia", "==", new Date(search.fecha).getDay()));

	// Handle disponibilidad with time filters
	if (search.disponibilidad && search.fecha && search.horario) {
		const dayOfWeek = new Date(search.fecha).getDay();
		if (search.disponibilidad === "libre") {
			const agendaDocs = await getDocs(query(agendasCollection, filters));
			const occupiedConsultorios = agendaDocs.docs
				.filter((doc) =>
					isTimeInRange(search.horario, doc.data().horario)
				)
				.map((doc) => doc.data().consultorio);

			return CONSULTORIOS_LIST.filter(
				(consultorio) =>
					!occupiedConsultorios.some(
						(occupied) =>
							occupied.nombre === consultorio.nombre &&
							occupied.sector === consultorio.sector
					)
			).filter((cons) => {
				if (search.sector && search.numero) {
					return (
						cons.nombre === search.numero &&
						cons.sector === search.sector
					);
				} else if (search.sector && !search.numero) {
					return cons.sector === search.sector;
				} else if (!search.sector && search.numero) {
					return cons.nombre === search.numero;
				} else return true;
			});
		}
		filters.push(where("dia", "==", dayOfWeek));
	}

	// Execute Firestore query if filters are defined
	if (filters.length > 0) {
		const consultorioQuery = query(agendasCollection, ...filters);
		const agendaDocs = await getDocs(consultorioQuery);

		const filteredConsultorios = agendaDocs.docs
			.filter((doc) =>
				search.horario
					? isTimeInRange(search.horario, doc.data().horario)
					: true
			)
			.map((doc) => doc.data().consultorio);

		return CONSULTORIOS_LIST.filter((consultorio) =>
			filteredConsultorios.some(
				(filtered) =>
					filtered.nombre === consultorio.nombre &&
					filtered.sector === consultorio.sector
			)
		);
	}

	return [];
}
