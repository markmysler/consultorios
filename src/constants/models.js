const profesionales = [
	{
		nombre: "Javier",
		apellido: "Milei",
		cuil: 20182930584,
		mail: "javiermilei@gmail.com",
		especialidades: ["traumatologia"],
		subespecialidades: ["general", "columna"],
		jefes: [20320987894],
		turnos: ["matutino"],
		anticipacion_licencia: 36,
		rol: "profesional",
	},
	{
		nombre: "Nicolas",
		apellido: "Maduro",
		cuil: 20123456784,
		mail: "nicolasmaduro@gmail.com",
		especialidades: ["traumatologia"],
		subespecialidades: ["cadera", "rodilla"],
		jefes: [20320987894],
		turnos: ["matutino", "vespertino"],
		anticipacion_licencia: 10,
		rol: "profesional",
	},
	{
		nombre: "Hugo",
		apellido: "Chavez",
		cuil: 20123451214,
		mail: "hugochavez@gmail.com",
		especialidades: ["traumatologia"],
		subespecialidades: ["miembro superior"],
		jefes: [20320987894],
		turnos: ["vespertino"],
		anticipacion_licencia: 36,
		rol: "profesional",
	},
	{
		nombre: "Joe",
		apellido: "Biden",
		cuil: 20000000014,
		mail: "joebiden@gmail.com",
		especialidades: ["cirugia"],
		subespecialidades: ["torax"],
		jefes: [20987347294],
		turnos: ["vespertino"],
		anticipacion_licencia: 10,
		rol: "profesional",
	},
	{
		nombre: "Donald",
		apellido: "Trump",
		cuil: 20222222224,
		mail: "donaldtrump@gmail.com",
		especialidades: ["cirugia"],
		subespecialidades: ["general", "paredes"],
		jefes: [20987347294],
		turnos: ["matutino"],
		anticipacion_licencia: 36,
		rol: "profesional",
	},
	{
		nombre: "Justin",
		apellido: "Trudeau",
		cuil: 20121212124,
		mail: "justintrudeau@gmail.com",
		especialidades: ["cirugia"],
		subespecialidades: ["vias biliares"],
		jefes: [20987347294],
		turnos: ["matutino", "vespertino"],
		anticipacion_licencia: 10,
		rol: "profesional",
	},
	{
		nombre: "Mohamed",
		apellido: "Bin Salman",
		cuil: 20987347294,
		mail: "mbs@gmail.com",
		especialidades: ["cirugia"],
		subespecialidades: ["general"],
		jefes: [],
		turnos: ["matutino", "vespertino"],
		anticipacion_licencia: 36,
		rol: "jefes_especialidad",
	},
	{
		nombre: "Jair",
		apellido: "Bolsonaro",
		cuil: 20320987894,
		mail: "jairbolsonaro@gmail.com",
		especialidades: ["traumatologia"],
		subespecialidades: ["general"],
		jefes: [],
		turnos: ["matutino", "vespertino"],
		anticipacion_licencia: 36,
		rol: "jefes_especialidad",
	},
	{
		nombre: "Mark",
		apellido: "Mysler",
		cuil: 20430843134,
		mail: "myslermark@gmail.com",
		especialidades: [],
		subespecialidades: [],
		jefes: [],
		turnos: [],
		anticipacion_licencia: null,
		rol: "admin",
	},
	{
		nombre: "Emilio",
		apellido: "Bensignor",
		cuil: 20124532674,
		mail: "liobensignor@gmail.com",
		especialidades: ["Capo total"],
		subespecialidades: ["Super capo"],
		jefes: [],
		turnos: ["Vespertino"],
		anticipacion_licencia: null,
		rol: "admin",
	},
	{
		nombre: "Ana",
		apellido: "Barrionuevo",
		cuil: 20171717174,
		mail: "anabsalud@gmail.com",
		especialidades: ["traumatologia"],
		subespecialidades: ["general"],
		jefes: [],
		turnos: ["vespertino"],
		anticipacion_licencia: 10,
		rol: "admin",
	},
];
const consultorios = {
	A: [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"19",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
	],
	B: [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"19",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
	],
	C: [
		"0A",
		"0B",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"18",
	],
	Infectologia: ["1", "2", "3", "4", "5", "6", "7"],
	OncologiaCuidadosPaliativos: ["1", "2", "3", "4"],
	CentralPracticas: [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
	],
	PasilloRuggeri: ["18", "19", "20", "21"],
};

const agendas = [
	{
		cuil: 20182930584,
		dia: 1,
		horario: "7:00-11:30",
		consultorio: { sector: "A", nombre: "1" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20182930584,
		dia: 1,
		horario: "13:00-16:30",
		consultorio: { sector: "A", nombre: "1" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20182930584,
		dia: 3,
		horario: "7:00-11:30",
		consultorio: { sector: "A", nombre: "1" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20182930584,
		dia: 5,
		horario: "7:00-11:30",
		consultorio: { sector: "A", nombre: "1" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20123456784,
		dia: 2,
		horario: "12:00-16:30",
		consultorio: { sector: "B", nombre: "2" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20123456784,
		dia: 4,
		horario: "12:00-16:30",
		consultorio: { sector: "B", nombre: "2" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20123456784,
		dia: 5,
		horario: "9:00-12:30",
		consultorio: { sector: "B", nombre: "4" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
	{
		cuil: 20123456784,
		dia: 5,
		horario: "13:00-17:30",
		consultorio: { sector: "B", nombre: "4" },
		nombre_agenda: "Consulta Traumatologia",
		especialidad: "traumatologia",
	},
];
const licencias = [
	{
		cuil: 20182930584,
		inicio: "2024-08-10T03:00:00.000Z",
		fin: "2024-08-27T03:00:00.000Z",
		estado: "pendiente",
	},
	{
		cuil: 20182930584,
		inicio: "2024-09-15T03:00:00.000Z",
		fin: "2024-10-30T03:00:00.000Z",
		estado: "aprobada",
	},
	{
		cuil: 20182930584,
		inicio: "2024-09-01T03:00:00.000Z",
		fin: "2024-09-13T03:00:00.000Z",
		estado: "rechazada",
	},
];

export { profesionales, consultorios, agendas, licencias };
