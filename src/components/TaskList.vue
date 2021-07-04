<template>
	<ul class="task-list">
		<li
			class="task-list-item"
			v-for="task in tasks" 
			:key="task.id"
		>
			<Task :item="task"  />
			<TaskStatus v-if="statuses.length > 0" :item="findRelatedStatus(task.status)" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue' ;
import Task, { TaskObject } from '@/components/Task.vue';
import TaskStatus, { StatusObject } from '@/components/TaskStatus.vue';

const TaskList = defineComponent({
	name: "TaskList",
	components: {
		Task,
		TaskStatus,
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
	methods: {
		findRelatedStatus(id: number) {
			return this.statuses.find(s => s.id === id) as StatusObject;
		}
	}
});

export default TaskList;
</script>

<style>
ul.task-list {
	list-style: none;
}
</style>
