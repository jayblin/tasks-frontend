<template>
	<div class="task">
		<div class="task_id">{{ item.id }}</div>
		<div class="task_title"></div>
		<div class="task_created-at">Создано: {{ readableCreatedAt }}</div>
		<div class="task_description" ref='description'>
			<button 
				class="btn task_description-expander" 
				v-if="!descriptionFits"
				@click="toggleDescription"
			/>
			{{ item.description }}
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
	white-space: break-spaces;
	max-height: 3ch;
	overflow: hidden;
	position: relative;
}
.task_created-at {
	margin-right: 1em;
	grid-area: created;
}
.btn.task_description-expander {
	width: 24px;
	height: 24px;
	position: absolute;
	top: 0;
	right: 0px;
}
</style>
