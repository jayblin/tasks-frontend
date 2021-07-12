<template>
	<ul class="task-list">
		<li
			class="task-list-item"
			v-for="task in tasks" 
			:key="task.id"
		>
			<Task :task="task" :ref="setTaskComponentRef" />
			<TaskStatus 
				v-if="statuses.length > 0" 
				:task="task"
				:statuses="statuses"
			/>
			<TaskControls 
				:task="task"
				:onSave="onSave"
				:onToggleEdit="onToggleEdit"
			/>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType, DefineComponent } from 'vue' ;
import Task, { TaskObject } from '@/components/Task.vue';
import TaskStatus, { StatusObject } from '@/components/TaskStatus.vue';
import TaskControls from '@/components/TaskControls.vue';
import api from '@/utils/api';

const TaskList = defineComponent({
	name: "TaskList",
	components: {
		Task,
		TaskStatus,
		TaskControls,
	},
	props: {
		tasks: {
			type: Array as PropType<TaskObject[]>,
			required: true,
		},
		statuses: {
			type: Array as PropType<StatusObject[]>,
			required: true,
		},
	},
	data() {
		return {
			taskComponentRefs: [] as any[],
		};
	},
	methods: {
		setTaskComponentRef(el: any) {
			if (el) {
				this.taskComponentRefs.push(el);
			}
		},
		findRelatedStatus(id: number) {
			return this.statuses.find(s => s.id === id) as StatusObject;
		},
		async onSave(aTask: TaskObject) {
			api.patch('/api/tasks', {db: 'cengine'}, aTask);
		},
		onToggleEdit(aTask: TaskObject, aEditing: boolean) {
			const taskComponent = this.taskComponentRefs.find(tc => tc.task === aTask);

			taskComponent.toggleEdit();
		},
	},
	beforeUpdate() {
		this.taskComponentRefs = [];
	},
});

export default TaskList;
</script>

<style>
.task-list {
	list-style: none;
	padding: 1em;
	background-color: #f5f5f552;
	width: 80ch;
	margin: 0 auto;
}
.task-list li {
	margin-bottom: 1em;
}
.task-list-item {
	display: grid;
	grid-template-columns: auto 15ch 4ch;
	overflow: hidden;
	text-overflow: ellipsis;
	border-bottom: 1px solid #cccccc;
}
.task-list-item .task-status {
	font-size: 0.8em;
}
.task-list-item .task-status_id {
	display: none;
}
.task-list-item .task-status_title {
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
}
.task-list-item .task-status::after {
	border-right: 2px solid #ffffff9e;
}
</style>
