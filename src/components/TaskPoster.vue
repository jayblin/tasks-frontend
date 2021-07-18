<template>
	<div class="task-poster">
		<textarea @input="onInput" ref="textareaRef" placeholder="Описание" />
		<button @click="save" :disabled="!valid" class="btn">Сохранить</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TaskObject } from '@/components/Task.vue';
import api from '@/utils/api';

const TaskPoster = defineComponent({
	name: 'TaskPoster',
	data() {
		return {
			valid: false,
		}
	},
	methods: {
		async save() {
			const textareaRef = this.$refs.textareaRef as HTMLTextAreaElement;

			const task: Pick<TaskObject, "description"> = {
				description: textareaRef.value,
			};
			
			const result = await api.post('/api/tasks', {db: 'cengine'}, task);
		},
		onInput(aEvent: InputEvent) {
			const textareaRef = this.$refs.textareaRef as HTMLTextAreaElement;

			if (textareaRef.value) {
				if (!this.valid) {
					this.valid = true;
				}
			}
			else {
				if (this.valid) {
					this.valid = false;
				}
			}
		},
	},
});

export default TaskPoster;
</script>

<style>
.task-poster {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.task-poster textarea {
	min-width: 60ch;
	max-width: 60ch;
	min-height: 10ch;
}
.task-poster .btn {
	margin-top: 1em;
	cursor: pointer;
	padding: 0.6em;
	width: fit-content;
	background-color: #4caf50;
	color: white;

	appearance: none;
	border: none;
}
.task-poster .btn:disabled {
	cursor: unset;
	background-color: #4caf5044;
}
</style>

