import { db } from "@/firebase/init";
import { getDocs, query, where, collection } from "firebase/firestore";
import { alogliaClient } from "@/firebase/algolia.js";

export default async function searchProfessional(search) {
	// Apply input_text filter (checks nombre, apellido, or cuil)
	let queryStr = "";
	if (search.input_text) {
		queryStr = search.input_text;
	}
	if (search.specialty) {
		queryStr += `, ${search.specialty}`;
	}
	if (search.subspecialty) {
		queryStr += `, ${search.subspecialty}`;
	}
	if (search.shift) {
		search.shift.forEach((sh) => {
			queryStr += `, ${sh}`;
		});
	}
	const { results } = await alogliaClient.search({
		requests: [
			{
				indexName: "users",
				query: queryStr,
			},
		],
	});

	let users = results[0].hits;

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

// Search for "test"
// const { results } = await alogliaClient.search({
// 	requests: [
// 		{
// 			indexName: "users",
// 			query: "mark",
// 		},
// 	],
// });

// console.log(results);
