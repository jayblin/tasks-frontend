<template>
	<div class="task">
		<div class="task-id">{{ id }}</div>
		<div class="task-title"></div>
		<div class="task-description">{{ description }}</div>
		<div class="task-status">{{ status.title }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue' 

type StatusObject = {
	id: number,
	title: string,
};

type TaskObject = {
	id: number,
	description: string,
	status: StatusObject,
};

const Task = defineComponent({
	name: "Task",
	props: {
		task: {
			type: Object as PropType<TaskObject>,
			required: true,
		}
	}
});

export default Task;

</script>
