<template>
	<div class="task">
		<div class="task_id">{{ item.id }}</div>
		<div class="task_title"></div>
		<div class="task_created-at">Создано: {{ readableCreatedAt }}</div>
		<textarea 
			class="task_description" 
			v-model="item.description" 
			ref='description'
			:disabled="inInputMode"
			resize="none"
			@input="onDescriptionInput"
		/>
		<div class="task_controls">
			<button
				@click="toggleEdit"
				class="btn edit"
			/>
			<button 
				class="btn task_description-expander" 
				v-if="!doesDescriptionFit()"
				@click="toggleDescription"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type TaskObject = {
	id: number,
	description: string,
	status: number,
	createdAt: string,
};

const Task = defineComponent({
	name: "Task",
	props: {
		item: {
			type: Object as PropType<TaskObject>,
			required: true,
		},
	},
	data() {
		return {
			inInputMode: true,
		} as {
			inInputMode: boolean,
		};
	},
	methods: {
		toReadableDate(aDate: string): string {
			const format = Intl.DateTimeFormat('ru-RU', {
				dateStyle: 'medium',
				timeStyle: 'medium',
			} as Intl.DateTimeFormatOptions);
			const date = new Date(aDate);

			return format.format(date);
		},
		toggleDescription(): void {
			const desc = this.$refs.description as HTMLDivElement;

			if (desc.style.getPropertyValue('height')) {
				this.shrinkDescription();
			}
			else {
				this.expandDescription();
			}
		},
		expandDescription(): void {
			const desc = this.$refs.description as HTMLDivElement;
			desc.style.setProperty('height', `${desc.scrollHeight}px`);
		},
		shrinkDescription(): void {
			const desc = this.$refs.description as HTMLDivElement;
			desc.style.setProperty('height', null);
		},
		toggleEdit(): void {
			this.inInputMode = !this.inInputMode;

			if (this.inInputMode) {
				this.shrinkDescription();
			}
			else {
				this.expandDescription();
			}
		},
		doesDescriptionFit(): boolean {
			const desc = this.$refs.description as HTMLDivElement;

			return desc && desc.clientHeight === desc.scrollHeight;
		},
		onDescriptionInput(): void {
			if (!this.doesDescriptionFit()) {
				this.expandDescription();
			}
		},
	},
	computed: {
		readableCreatedAt(): string {
			return this.toReadableDate(this.item.createdAt);
		}
	},
	mounted() {}
});

export default Task;
</script>

<style>
.task {
	display: grid;
	grid-template-columns: 4ch auto 3ch;
	grid-template-rows: 1em auto;
	grid-template-areas: 
		"id created controls"
		"descr descr controls";
	text-align: start;
	row-gap: 1em;
	min-height: 9ch;
}
.task_id {
	margin-right: 1em;
	grid-area: id;
}
.task_description {
	margin-right: 1em;
	grid-area: descr;
	white-space: break-spaces;
	min-height: 3ch;
	overflow: hidden;
	position: relative;
	resize: none;
	font: inherit;
	background-color: transparent;
	border: none;
	outline: 1px solid #cccccc;
	outline-offset: -1px;
}
.task_description:disabled {
	outline: none;
}
.task_created-at {
	margin-right: 1em;
	grid-area: created;
}
.task_controls {
	grid-area: controls;
	display: grid;
	grid-template-columns: 3ch;
	grid-auto-flow: row;
	row-gap: 2px;
	height: fit-content;
}
.task_controls .btn {
	width: 3ch;
	height: 3ch;
	cursor: pointer
}
</style>
