<template>
	<div class="fold" ref="self">
		<slot name="content"></slot>
		<slot name="toggler">
			<button 
				class="btn fold_toggler" 
				v-if="!contentFits"
				@click="toggle"
			/>
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

const Fold = defineComponent({
	name: "Fold",
	props: {
	},
	data() {
		return {
			contentFits: true,
		};
	},
	watch: {
	},
	methods: {
		toggle() {
			if (this.opened()) {
				this.close();
			}
			else {
				this.open();
			}
		},
		opened(): boolean {
			const element = this.$refs.self as HTMLDivElement;

			if (element) {
				const content = element.children[0] as HTMLElement;
				return !!content.style.getPropertyValue('height');
			}

			return false;
		},
		open() {
			const element = this.$refs.self as HTMLDivElement;

			if (element) {
				const content = element.children[0] as HTMLElement;
				content.style.setProperty('height', `${content.scrollHeight}px`);
			}
		},
		close() {
			const element = this.$refs.self as HTMLDivElement;

			if (element) {
				const content = element.children[0] as HTMLElement;
				content.style.removeProperty('height');
			}
		},
		resize() {
			if (!this.doesFit()) {
				const element = this.$refs.self as HTMLDivElement;

				if (element) {
					const content = element.children[0] as HTMLElement;
					content.style.setProperty('height', `${content.scrollHeight}px`);
				}
			}
		},
		doesFit(): boolean {
			const element = this.$refs.self as HTMLDivElement;

			if (element) {
				const content = element.children[0];
				return content.clientHeight === content.scrollHeight;
			}
			
			return true;
		},
	},
	mounted() {
		this.contentFits = this.doesFit();
	},
});

export default Fold;
</script>

<style>
.fold {
	position: relative;
}
.fold > :not(.fold_toggler) {
	overflow: hidden;
	position: relative;
	width: 100%;
}
.fold_toggler {
	position: absolute;
	top: 0;
	right: 0;
	width: 3ch;
	height: 3ch;
	padding: 0;
	border: 1px solid #cccccc;
	width: 20px;
	height: 20px;

	appearance: none;
	background-color: transparent;
	cursor: pointer;
}
.fold_toggler::after {
	content: "+";
	font-size: 20px;
	line-height: 0.9em;
}
</style>
