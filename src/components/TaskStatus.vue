<template>
	<div class="task-status" :class="modifyClass()">
		<span class="task-status_id">{{ item.id }}</span>
		<span class="task-status_title">{{ item.title }}</span>
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
	methods: {
		modifyClass() {
			switch (this.item.id) {
				case 0: return "--planned";
				case 1: return "--wip";
				case 2: return "--done";
			}
		}
	}
});

export default TaskStatus;
</script>

<style>
.task-status {
	position: relative;
}
.task-status::after {
	content: "";
	position: absolute;
	width: 4px;
	height: 100%;
	right: 0;
	top: 0;
}
.task-status.--planned::after {
	background-color: #ff5722;
}
.task-status.--wip::after {
	background-color: #ffeb3b;
}
.task-status.--done::after {
	background-color: #4caf50;
}
</style>
