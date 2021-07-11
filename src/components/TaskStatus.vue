<template>
	<div class="task-status" >
		<select
			v-model="task.status"
		>
			<option 
				v-for="status in statuses"
				v-bind:key="status.title"
				:value="status.id"
			>
				{{ status.title }}
			</option>
		</select>
		<div class="task-status__indicator" :class="modifyClass()"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue' ;
import { TaskObject } from '@/components/Task.vue';

export type StatusObject = {
	id: number,
	title: string,
};

const  TaskStatus = defineComponent({
	name: 'TaskStatus',
	data() {
		return {
		};
	},
	props: {
		statuses: {
			type: Array as PropType<StatusObject[]>,
			required: true,
		},
		task: {
			type: Object as PropType<TaskObject>,
			required: true,
		}
	},
	methods: {
		modifyClass(): string {
			switch (this.task.status) {
				case 0: return "--planned";
				case 1: return "--wip";
				case 2: return "--done";
				default: return "";
			}
		},
	},
	watch: {
		task() {}
	},
});

export default TaskStatus;
</script>

<style>
.task-status {
	position: relative;
	display: grid;
	grid-template-columns: 95% 5%;
}
.task-status select {
	height: fit-content;
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	cursor: pointer;
}
.task-status__indicator {
	position: relative;
}
.task-status__indicator::before {
	content: "";
	position: absolute;
	width: 50%;
	height: 100%;
	top: 0;
	right: 0;
	background-color: #ffffff7d;
}
.task-status__indicator.--planned {
	background-color: #ff5722;
}
.task-status__indicator.--wip {
	background-color: #ffeb3b;
}
.task-status__indicator.--done {
	background-color: #4caf50;
}
</style>
