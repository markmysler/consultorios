<template>
  <Button :label="label" class="primaryButton"></Button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    label: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.primaryButton {
  width: 100%;
  background: var(--color-blue);
  color: var(--color-gray);
  border-radius: 0.75rem;
  padding: 0.75rem 0;
}
</style>