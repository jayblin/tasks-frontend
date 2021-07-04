<template>
	<!--<img alt="Vue logo" src="./assets/logo.png"> -->
	<TaskList :tasks="tasks" :statuses="statuses" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
/* import Counter from '@/components/Counter.vue'; */
import TaskList from '@/components/TaskList.vue';
import { TaskObject } from '@/components/Task.vue';
import { StatusObject } from '@/components/TaskStatus.vue';

function fetchTasks()
{
	const path = '/api/tasks';
	const apiHost = 'http://localhost:3000';
	const url = new URL(apiHost + path);
	
	url.searchParams.set('db', 'cengine');

	return fetch(url.toString(),{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		mode: 'cors',
	})
	.then(aRes => aRes.json());
}

function fetchStatuses()
{
	const path = '/api/statuses';
	const apiHost = 'http://localhost:3000';
	const url = new URL(apiHost + path);
	
	url.searchParams.set('db', 'cengine');

	return fetch(url.toString(),{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	})
	.then(aRes => aRes.json());
}

export default defineComponent({
	name: 'App',
	components: {
    	/* Counter, */
		TaskList
	},
	data() {
		return {
			tasks: [] as TaskObject[],
			statuses: [] as StatusObject[],
		};
	},
	mounted() {
		fetchTasks()
		.then(aJson => { this.tasks = aJson; }) ;
		
		fetchStatuses()
		.then(aJson => { this.statuses = aJson; });
	},
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
