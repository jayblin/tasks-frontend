<template>
	<div class="notificatin-list">
		<div
			class="notification"
			:class="`--${notification.type}`"
			v-for="notification in stack"
			v-bind:key="notification.guid"
		>
			{{ notification.text }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { APINotification } from '@/utils/api';

const NotificationList = defineComponent({
	name: 'NotificationList',
	props: {
		items: {
			type: Array as PropType<APINotification[]>,
			required: true,
		},
	},
	components: {
	},
	data() {
		return {
			stack: [] as ({guid: any} & APINotification)[],
		};
	},
	methods: {
		pop() {
			setTimeout(() => {
				this.stack.pop();
				if (this.stack.length > 0) {
					this.pop();
				}
			}, 3000);
		},
	},
	mounted() {
		for (const item of this.items) {
			this.stack.push({...item, guid: Math.random()});
		}

		this.pop();
	},
	watch: {
		items() {
			for (const item of this.items) {
				this.stack.push({...item, guid: Math.random()});
			}
			this.pop();
		},
	},
});

export default NotificationList;
</script>

<style>
.notificatin-list {
	position: absolute;
	top: -20px;
	left: 0;
	display: grid;
	grid-auto-flow: row;
	row-gap: 4px;
	color: #ffffffc7;
}
.notification {
	border: 1px solid transparent;
	padding: 4px;
	padding-right: 20px;
	width: fit-content;
}
.notification.--warning {
	background-color: #ff9800;
}
.notification.--error {
	background-color: #f44336;
}
.notification.--success {
	background-color: #8bc34a;
}
</style>

