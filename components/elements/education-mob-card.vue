<template>
	<div class="education-mob">
		<div class="education-mob-container">
			<div>{{ event.date }}</div>
			<div class="education-mob-point"></div>
			<div>{{ event.category }}</div>
		</div>
		<div>
			<div class="education-mob-title">{{ event.title }}</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    event: Object
  },
}
</script>


<style scoped lang="scss">
@import '/assets/styles/style.scss';

.education-mob {
	width: 100%;
	display: flex;
	padding: 10px 20px;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
	border-radius: 10px;
	border: 1px solid var(--stroke, #E9E9E9);
}

.education-mob-container {
	display: flex;
	align-items: center;
	gap: 6px;
	@include body-12-regular;
	color: #525660;
	opacity: 0.7;
}

.education-mob-point {
	width: 4px;
	height: 4px;
	opacity: 0.2;
	border-radius: 50px;
	background-color: #525660;
}

.education-mob-title {
	@include body-16-regular;
	color: #1E2433;
}

</style>