<template>
	<Button :label="label" :loading="loading"></Button>
</template>

<script>
export default {
	name: "ButtonComponent",
	props: {
		label: {
			type: String,
			required: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
