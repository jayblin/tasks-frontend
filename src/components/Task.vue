<template>
	<div class="task">
		<div class="task-id">{{ item.id }}</div>
		<div class="task-title"></div>
		<div class="task-description">{{ item.description }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';


export type TaskObject = {
	id: number,
	description: string,
	status: number,
};

const Task = defineComponent({
	name: "Task",
	props: {
		item: {
			type: Object as PropType<TaskObject>,
			required: true,
		},
	}
});

export default Task;

</script>
