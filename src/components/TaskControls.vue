<template>
	<div class="task-controls">
		<button
			@click="_toggleEdit"
			class="btn edit"
		>&#10002;</button>
		<button
			@click="_save"
			class="btn save"
		>&#10004;</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TaskObject } from '@/components/Task.vue';

const TaskControls = defineComponent({
	name: "TaskControls",
	props: {
		item: {
			type: Object as PropType<TaskObject>,
			required: true,
		},
		onToggleEdit: {
			type: Function as PropType<(aEditing: boolean) => void>,
			required: false,
			default: () => {},
		},
		onSave: {
			type: Function as PropType<(aModified: TaskObject) => void>,
			required: false,
			default: () => {},
		},
	},
	data() {
		return {
			inEditMode: false,
			/* _item: JSON.parse(JSON.stringify(this.item)), */
		};
	},
	methods: {
		_toggleEdit() {
			this.inEditMode = !this.inEditMode;
			this.onToggleEdit(this.inEditMode);
		},
		_save() {
			this.onSave(this.item);
		},
	},
});

export default TaskControls;
</script>

<style>
.task-controls {
	display: grid;
	align-items: center;
	grid-auto-rows: max-content;
	justify-content: center;
	row-gap: 4px;
}
.task-controls .btn {
	width: 23px;
	height: 23px;
	border: 1px solid #cccccc;
	padding: 0;
	position: relative;
	appearance: none;
	background-color: transparent;
	font-size: initial;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
</style>

