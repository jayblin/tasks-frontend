<template>
	<div class="task">
		<div class="task_id">{{ item.id }}</div>
		<div class="task_title"></div>
		<div class="task_created-at">Создано: {{ readableCreatedAt }}</div>
		<Fold :opened="foldOpened" ref="fold">
			<template v-slot:content>
				<textarea 
					class="task_description" 
					v-model="item.description" 
					ref='description'
					:disabled="!inInputMode"
					@input="onDescriptionInput"
				/>
			</template>
		</Fold>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Fold from '@/components/Fold.vue';

export type TaskObject = {
	id: number,
	description: string,
	status: number,
	createdAt: string,
};

const Task = defineComponent({
	name: "Task",
	components: {
		Fold,
	},
	props: {
		item: {
			type: Object as PropType<TaskObject>,
			required: true,
		},
	},
	data() {
		return {
			inInputMode: false,
			foldOpened: false,
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
		toggleEdit(): void {
			this.inInputMode = !this.inInputMode;

			const fold = this.$refs.fold as any;
			if (this.inInputMode) {
				fold.open();
			}
			else {
				fold.close();
			}
		},
		onDescriptionInput() {
			const fold = this.$refs.fold as any;
			fold.resize();
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
	grid-template-columns: 4ch auto;
	grid-template-rows: 1em auto;
	grid-template-areas: 
		"id created"
		"descr descr";
	text-align: start;
	row-gap: 1em;
	min-height: 9ch;
}
.task_id {
	margin-right: 1em;
	grid-area: id;
}
.task_description {
	grid-area: descr;
	white-space: break-spaces;
	min-height: 3ch;
	font: inherit;
	background-color: white;
	border: none;
	outline: 1px solid #cccccc;
	outline-offset: -1px;
	resize: none;
}
.task_description:disabled {
	outline: none;
	background-color: transparent;
}
.task_created-at {
	margin-right: 1em;
	grid-area: created;
}
</style>
