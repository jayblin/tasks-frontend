<template>
	<div class="paginator">
		<button class="btn --prev" @click="back">prev</button>
		<div class="page" >{{ currentPage }}</div>
		<button class="btn --next" @click="forward">next</button>
		<NumberInput :default="_limit" :onChange="onLimitChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInput from '@/components/NumberInput.vue';

export type PaginatorEventCallback = (aPage: number, aLimit: number) => void;

const Paginator = defineComponent({
	name: "Paginator",
	components: {
		NumberInput,
	},
	props: {
		limit: {
			type: Number,
			required: false,
		},
	},
	data() {
		return {
			currentPage: 1,
			_limit: this.limit,
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
			this.$emit('navigated', this.currentPage, this._limit);
		},
		onLimitChange (aValue: number) {
			console.log();
			this._limit = aValue;
			this.navigate();
		},
	},
	mounted() {
		this.$emit('navigated', 1, this._limit);
	},
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
</style>
