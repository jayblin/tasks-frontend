<template>
	<!--<img alt="Vue logo" src="./assets/logo.png"> -->
	<DatabaseContext>
		<Home />
	</DatabaseContext>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DatabaseContext from '@/components/DatabaseContext.vue';
import Home from '@/pages/home.vue';

export default defineComponent({
	name: 'App',
	components: {
		DatabaseContext,
		Home,
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
  position: relative;
}
#app > select {
	margin-bottom: 1em;
}
</style>
