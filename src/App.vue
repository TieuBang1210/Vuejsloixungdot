<template>
	<div>
		<Comp-menu />
	
		<router-view></router-view>
		
	</div>
</template>

<script>
import CompMenu from './components/CompMenu.vue';
export default {
	
	components: {
		CompMenu
	},
	data () {
		return {
			
		}
	}
}
</script>

<style>
	
</style>
