<template>
	<!--<img alt="Vue logo" src="./assets/logo.png"> -->
	<select v-model="dbName">
		<option disabled value="">Выбери проект</option>
		<option value="cengine">cengine</option>
		<option value="tasks_project">tasks_project</option>
	</select>
	<slot :key="dbName"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

useContext.prototype.ctx = {
	dbName: '',
};

export function useContext()
{
	return useContext.prototype.ctx;
};

function idj(aCallback: (...a: any) => void, aDependencies: [])
{
};

const DatabaseContext =  defineComponent({
	name: 'DatabaseContext',
	components: {
	},
	data() {
		return {
			dbName: '',
		};
	},
	watch: {
		dbName(aValue: string) {
			useContext.prototype.ctx.dbName = aValue;
		}
	},
});

export default DatabaseContext;
</script>

<style>
</style>

