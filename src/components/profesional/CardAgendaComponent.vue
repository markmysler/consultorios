<template>
  <router-link
    class="agenda bg-dark-gray border-round-md mb-1 no-underline"
    :to="
      routes.ConsultorioDetails +
      '/' +
      agenda.consultorio.sector +
      '/' +
      agenda.consultorio.nombre
    ">
    <div class="rowCenter">
      <div class="sector bg-light-blue py-2 px-3">
        <p class="agendaText text-blue">
          Sector {{ agenda.consultorio.sector }}
          {{ agenda.consultorio.nombre }}
        </p>
      </div>
      <div class="py-2 px-3">
        <p class="agendaText text-blue">
          {{ agenda.horario }}
        </p>
      </div>
    </div>
    <div class="nombreAgenda py-2 px-3">
      <p class="text-blue">Nombre de la agenda: "{{ agenda.nombre_agenda }}"</p>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      agenda: {
        type: Object,
        required: true,
      },
      routes: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .agenda {
    box-shadow: 0px 4px 4px 0px #00000040;
  }

  .agendaText {
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 15.62px;
  }

  .sector {
    border-top-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  .nombreAgenda p {
    font-size: 0.625rem;
    line-height: 13.02px;
  }
</style>
