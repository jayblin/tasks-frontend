<template>
	<Paginator :limit="8" @navigated="paginate" />
	<TaskList :tasks="tasks" :statuses="statuses" />
	<TaskPoster />
	<NotificationList :items="notifications" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
/* import Counter from '@/components/Counter.vue'; */
import TaskList from '@/components/TaskList.vue';
import { TaskObject } from '@/components/Task.vue';
import { StatusObject } from '@/components/TaskStatus.vue';
import Paginator from '@/components/Paginator.vue';
import NotificationList from '@/components/NotificationList.vue';
import TaskPoster from '@/components/TaskPoster.vue';
import api, { APINotification } from '@/utils/api';
import DatabaseContext, { useContext } from '@/components/DatabaseContext.vue';

async function fetchTasks(
	aPage: number = 1,
	aLimit: number = 10
): Promise<TaskObject[]>
{
	const tasks = await api.get<TaskObject[]>('/api/tasks', {
		db: useContext().dbName,
		page: aPage.toString(),
		limit: aLimit.toString(),
	});

	if (!tasks.data) {
		return [];
	}

	return tasks.data;
}

async function fetchStatuses(): Promise<StatusObject[]>
{
	const statuses =  await api.get<StatusObject[]>('/api/statuses', {
		db: useContext().dbName,
	});

	if (!statuses.data) {
		return [];
	}

	return statuses.data;
}

export default defineComponent({
	name: 'Home',
	components: {
    	/* Counter, */
		TaskList,
		Paginator,
		NotificationList,
		TaskPoster,
		DatabaseContext,
	},
	data() {
		return {
			tasks: [] as TaskObject[],
			statuses: [] as StatusObject[],
			notifications: [] as APINotification[],
		};
	},
	methods: {
		async paginate(aPage: number, aLimit: number) {
			const tasks = await fetchTasks(aPage, aLimit);

			this.tasks = tasks;
		},
	},
	async mounted() {
		const statuses = await fetchStatuses();

		this.statuses = statuses;

		api.handleNotifications = (notifications) => {
			this.notifications = notifications;
		};
	},
});
</script>

<style>
</style>
