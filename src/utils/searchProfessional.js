import { profesionales, agendas, licencias } from "@/constants/models";

export default function searchProfessional(search) {
	if (search.date_string && !search.time) {
		const now = new Date();
		search.time = `${now.getHours()}:${now.getMinutes()}`;
	}
	const reservationsMap = new Map();
	const licencesMap = new Map();
	agendas.forEach((res) => {
		if (!reservationsMap.has(res.cuil)) {
			reservationsMap.set(res.cuil, []);
		}
		reservationsMap.get(res.cuil).push(res);
	});
	licencias.forEach((lic) => {
		if (!licencesMap.has(lic.cuil)) {
			licencesMap.set(lic.cuil, []);
		}
		if (lic.estado === "aprobada") {
			licencesMap.get(lic.cuil).push(lic);
		}
	});

	const searchDay = search.date_string
		? new Date(search.date_string).getDay()
		: null;

	return profesionales.filter((prof) => {
		// Filter by input_text
		if (
			search.input_text &&
			!prof.nombre.includes(search.input_text) &&
			!prof.apellido.includes(search.input_text) &&
			!prof.cuil.toString().includes(search.input_text)
		) {
			return false;
		}

		// Filter by specialty
		if (search.specialty) {
			if (
				prof.especialidades === null ||
				!prof.especialidades.includes(search.specialty)
			) {
				return false;
			}
		}

		// Filter by shift
		if (search.shift) {
			if (
				prof.turnos === null ||
				!search.shift.every((shift) => prof.turnos.includes(shift))
			) {
				return false;
			}
		}

		// Filter by date and time
		if (searchDay !== null && search.time) {
			const agendas = reservationsMap.get(prof.cuil);
			const lics = licencesMap.get(prof.cuil);
			if (
				!agendas ||
				!agendas.some(
					(agenda) =>
						agenda.dia === searchDay &&
						isTimeInRange(search.time, agenda.horario)
				) ||
				lics?.some(
					(lic) =>
						new Date(search.date_string) > new Date(lic.inicio) &&
						new Date(search.date_string) < new Date(lic.fin)
				)
			) {
				return false;
			}
		}

		return true;
	});
}

function isTimeInRange(time, range) {
	// Parse the input time
	const [inputHours, inputMinutes] = time.split(":").map(Number);

	// Parse the start and end times in the range
	const [startTime, endTime] = range.split("-");
	const [startHours, startMinutes] = startTime.split(":").map(Number);
	const [endHours, endMinutes] = endTime.split(":").map(Number);

	// Convert the times to minutes since midnight for easy comparison
	const inputTotalMinutes = inputHours * 60 + inputMinutes;
	const startTotalMinutes = startHours * 60 + startMinutes;
	const endTotalMinutes = endHours * 60 + endMinutes;

	// Check if the input time is within the range
	return (
		inputTotalMinutes >= startTotalMinutes &&
		inputTotalMinutes <= endTotalMinutes
	);
}
