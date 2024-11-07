import { db } from "@/firebase/init";
import { getDocs, query, where, collection, or } from "firebase/firestore";

export default async function searchProfessional(search) {
	const usersRef = collection(db, "users");
	let q = query(usersRef);

	// Apply input_text filter (checks nombre, apellido, or cuil)
	if (search.input_text) {
		q = query(
			q,
			or(
				where("nombre", "==", search.input_text),
				where("apellido", "==", search.input_text),
				where("cuil", "==", search.input_text)
			)
		);
	}

	// Separate specialty query to work around Firestore limitations
	if (search.specialty) {
		q = query(
			q,
			where("especialidades", "array-contains", search.specialty)
		);
	}

	const userDocs = await getDocs(q);
	let users = userDocs.docs.map((doc) => doc.data());

	// Apply shift filter in memory if both specialty and shift are provided
	if (search.shift && search.shift.length > 0) {
		users = users.filter((user) =>
			search.shift.every((shift) => user.turnos.includes(shift))
		);
	}

	// Apply date and time filter if provided
	if (search.date_string && search.time) {
		const date = new Date(search.date_string);
		const dayOfWeek = date.getDay();

		const agendaPromises = users.map((user) => {
			const agendasRef = collection(db, "agendas");
			const agendaQuery = query(
				agendasRef,
				where("cuil", "==", user.cuil),
				where("dia", "==", dayOfWeek)
			);
			return getDocs(agendaQuery);
		});

		const licenciaPromises = users.map((user) => {
			const licenciasRef = collection(db, "licencias");
			const licenciaQuery = query(
				licenciasRef,
				where("cuil", "==", user.cuil),
				where("estado", "==", "aprobada")
			);
			return getDocs(licenciaQuery);
		});

		const [agendaResults, licenciaResults] = await Promise.all([
			Promise.all(agendaPromises),
			Promise.all(licenciaPromises),
		]);

		users = users.filter((user, index) => {
			const agendas = agendaResults[index].docs;
			const licencias = licenciaResults[index].docs;

			const hasValidTimeRange = agendas.some((doc) => {
				const agendaData = doc.data();
				return isTimeInRange(search.time, agendaData.horario);
			});

			const isOnLicencia = licencias.some((doc) => {
				const lic = doc.data();
				return (
					new Date(search.date_string) > new Date(lic.inicio) &&
					new Date(search.date_string) < new Date(lic.fin)
				);
			});

			return hasValidTimeRange && !isOnLicencia;
		});
	}

	// Return the filtered users, capped at a maximum of 5 results
	return users.slice(0, 5);
}

// Helper function to check if a time is within a given time range
function isTimeInRange(time, range) {
	const [inputHours, inputMinutes] = time.split(":").map(Number);
	const [startTime, endTime] = range.split("-");
	const [startHours, startMinutes] = startTime.split(":").map(Number);
	const [endHours, endMinutes] = endTime.split(":").map(Number);

	const inputTotalMinutes = inputHours * 60 + inputMinutes;
	const startTotalMinutes = startHours * 60 + startMinutes;
	const endTotalMinutes = endHours * 60 + endMinutes;

	return (
		inputTotalMinutes >= startTotalMinutes &&
		inputTotalMinutes <= endTotalMinutes
	);
}
