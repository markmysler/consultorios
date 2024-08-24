export default function fillTimeRanges(start_time, end_time, schedules) {
	const parseTime = (timeStr) => {
		const [hours, minutes] = timeStr.split(":").map(Number);
		return hours * 60 + minutes;
	};

	const formatTime = (minutes) => {
		const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
		const mins = String(minutes % 60).padStart(2, "0");
		return `${hours}:${mins}`;
	};

	const startTime = parseTime(start_time);
	const endTime = parseTime(end_time);
	let extendedList = [];
	let lastEndTime = startTime;

	schedules.forEach((schedule) => {
		const [currentStart, currentEnd] = schedule.horario
			.split("-")
			.map(parseTime);

		if (lastEndTime < currentStart) {
			extendedList.push({
				horario: `${formatTime(lastEndTime)}-${formatTime(
					currentStart
				)}`,
			});
		}

		extendedList.push(schedule);
		lastEndTime = currentEnd;
	});

	if (lastEndTime < endTime) {
		extendedList.push({
			horario: `${formatTime(lastEndTime)}-${formatTime(endTime)}`,
		});
	}

	return extendedList;
}
