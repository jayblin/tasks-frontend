<template>
	<div class="task-status">
		<span class="task-status-id">{{ item.id }}</span>
		<span class="task-status-title">{{ item.title }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue' ;

export type StatusObject = {
	id: number,
	title: string,
};

const  TaskStatus = defineComponent({
	name: 'TaskStatus',
	props: {
		item: {
			type: Object as PropType<StatusObject>,
			required: true,
		},
	},
});

export default TaskStatus;
</script>

<style>
</style>
