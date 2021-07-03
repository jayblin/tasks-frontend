<template>
    <button @click="increment">You clicked me {{ count }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Counter = defineComponent({
	name: "Counter",
	data() {
		return { count: 4 }
	},
	methods: {
		increment() {
			this.count++;
		}
	},
	template: `
	`,
	created() {
		console.log('created Counter');
	},
	mounted() {
		console.log('mounted Counter');
	},
	updated() {
		console.log('updated Counter');
	},
	unmounted() {
		console.log('unmounted Counter');
	},
});

export default Counter;
</script>
