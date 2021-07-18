<template>
	<div class="number-input">
		<input @change="handleChange" v-model.number="_value" type="number" min="1" />
		<div class="up" @click="change(1)"></div>
		<div class="down" @click="change(-1)"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type NumberInputChageCallback = (aValue: number) => void;

const NumberInput = defineComponent({
	name: "NumberInput",
	props: {
		default: {
			type: Number,
			required: false,
		},
		onChange: {
			type: Function as PropType<NumberInputChageCallback>,
			required: false,
			default: () => {},
		},
	},
	data() {
		return {
			_value: this.default ?? 5,
		};
	},
	methods: {
		handleChange(aEvent: Event) {
			this.onChange(this._value);
		},
		change(aIncrement: number) {
			this._value += aIncrement;

			this.onChange(this._value);
		},
	},
	mounted() {
	}
});

export default NumberInput;
</script>

<style>
.number-input {
	display: flex;
	position: relative;
}
.number-input .up,
.number-input .down {
	position: absolute;
	width: 10px;
	height: 10px;
	border-top: 2.8px solid black;
	border-right: 2.8px solid black;
	border-radius: 2.8px 0px;
	right: calc(10px / 2);
	cursor: pointer;
}
.number-input .up:hover,
.number-input .down:hover {
	border-color: #555555;
}
.number-input .up {
	transform: rotateZ(-45deg);
	top: calc(10px / 2);
}
.number-input .down {
	transform: rotateZ(135deg);
	bottom: calc(10px / 2);
}
.number-input input[type="number"] {
	max-width: 6ch;
	position: relative;
}
.number-input input[type="number"]::-webkit-inner-spin-button {
	appearance: none;
}
</style>

