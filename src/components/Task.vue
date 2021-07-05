<template>
	<div class="task">
		<div class="task_id">{{ item.id }}</div>
		<div class="task_title"></div>
		<div class="task_created-at">Создано: {{ readableCreatedAt }}</div>
		<div class="task_description">{{ item.description }}</div>
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
	methods: {
		toReadableDate(aDate: string): string {
			const format = Intl.DateTimeFormat('ru-RU', {
				dateStyle: 'medium',
				timeStyle: 'medium',
			} as Intl.DateTimeFormatOptions);
			const date = new Date(aDate);

			return format.format(date);
		}
	},
	computed: {
		readableCreatedAt(): string {
			return this.toReadableDate(this.item.createdAt);
		}
	},
});

export default Task;
</script>

<style>
.task {
	display: grid;
	grid-template-columns: 4ch auto;
	grid-template-areas: 
		"id created"
		"descr descr";
	text-align: start;
	row-gap: 0.5em;
}
.task_id {
	margin-right: 1em;
	grid-area: id;
}
.task_description {
	margin-right: 1em;
	grid-area: descr;
}
.task_created-at {
	margin-right: 1em;
	grid-area: created;
}
</style>
