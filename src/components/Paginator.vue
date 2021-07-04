<template>
	<div class="paginator">
		<button class="btn --prev" @click="back">prev</button>
		<div class="page" >{{ currentPage }}</div>
		<button class="btn --next" @click="forward">next</button>
		<input @change="navigate" v-model.number="limit" type="number" min="1" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type PaginatorEventCallback = (aPage: number, aLimit: number) => void;

const Paginator = defineComponent({
	name: "Paginator",
	props: {
		limit: {
			type: Number,
			required: false,
		},
	},
	data() {
		return {
			currentPage: 1,
			limit: 8,
		};
	},
	emits: ['navigated'],
	methods: {
		back() {
			this.currentPage--;
			this.navigate();
		},
		forward() {
			this.currentPage++;
			this.navigate();
		},
		navigate() {
			this.$emit('navigated', this.currentPage, this.limit);
		}
	},
	mounted() { this.$emit('navigated', 1, this.limit); }
});

export default Paginator;

</script>

<style>
.paginator {
	display: flex;
	justify-content: center;
}
.paginator button.btn {
	cursor: pointer;
	color: aliceblue;
	background-color: #00bcd4;
	width: fit-content;
	padding: 1em;
	appearance: none;
	border: 1px solid;
}
.paginator input[type="number"] {
	max-width: 6ch;
}
</style>
