<template>
	<div class="paginator">
		<button ref="prevBtnRef" class="btn --prev" @click="back">prev</button>
		<div class="page" >{{ currentPage }}</div>
		<button ref="nextBtnRef" class="btn --next" @click="forward">next</button>
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
		},
		forward() {
			this.currentPage++;
		},
		navigate() {
			this.$emit('navigated', this.currentPage, this._limit);
		},
		onLimitChange (aValue: number) {
			this._limit = aValue;
			this.navigate();
		},
		toggleButtons() {
			const nextBtnRef = this.$refs.nextBtnRef as HTMLButtonElement;
			const prevBtnRef = this.$refs.prevBtnRef as HTMLButtonElement;

			if (this.currentPage > 1) {
				if (prevBtnRef.hasAttribute('disabled')) {
					prevBtnRef.removeAttribute('disabled');
				}
			}
			else {
				if (!prevBtnRef.hasAttribute('disabled')) {
					prevBtnRef.setAttribute('disabled', '');
				}
			}
		},
	},
	mounted() {
		this.toggleButtons();
		this.$emit('navigated', 1, this._limit);
	},
	watch: {
		currentPage() {
			this.toggleButtons();
			this.navigate();
		}
	},
});

export default Paginator;

</script>

<style>
.paginator {
	display: flex;
	justify-content: center;
	margin-bottom: 1em;
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
.paginator button.btn:disabled {
	background-color: #00bcd444;
	cursor: unset;
}
.paginator .page {
	align-self: center;
	margin: 0.6em;
}
.paginator .number-input {
	margin-left: 1em;
}
</style>
