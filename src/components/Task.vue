<template>
	<div class="task">
		<div class="task_id">{{ item.id }}</div>
		<div class="task_title"></div>
		<div class="task_created-at">Создано: {{ readableCreatedAt }}</div>
		<div class="task_description" ref='description'>
			{{ item.description }}
		</div>
		<div class="task_controls">
			<button
				@click="toggleEdit"
				class="btn edit"
			/>
			<button 
				class="btn task_description-expander" 
				v-if="!descriptionFits"
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
			descriptionFits: true,
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

			if (desc.style.getPropertyValue('max-height')) {
				desc.style.setProperty('max-height', null);
			} else {
				desc.style.setProperty('max-height', 'fit-content');
			}
		},
		toggleEdit(): void {
			console.log('edit!');
		}
	},
	computed: {
		readableCreatedAt(): string {
			return this.toReadableDate(this.item.createdAt);
		}
	},
	mounted() {
		const desc = this.$refs.description as HTMLDivElement;

		this.descriptionFits = desc.clientHeight === desc.scrollHeight;
	}
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
	max-height: 3ch;
	min-height: 3ch;
	overflow: hidden;
	position: relative;
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
