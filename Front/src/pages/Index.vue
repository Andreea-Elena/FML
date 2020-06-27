<template>
<body>
<div class="a3d" style="--n: 64">
  <div class="bar" style="--i: 63"></div>
  <div class="bar" style="--i: 62"></div>
  <div class="bar" style="--i: 61"></div>
  <div class="bar" style="--i: 60"></div>
  <div class="bar" style="--i: 59"></div>
  <div class="bar" style="--i: 58"></div>
  <div class="bar" style="--i: 57"></div>
  <div class="bar" style="--i: 56"></div>
  <div class="bar" style="--i: 55"></div>
  <div class="bar" style="--i: 54"></div>
  <div class="bar" style="--i: 53"></div>
  <div class="bar" style="--i: 52"></div>
  <div class="bar" style="--i: 51"></div>
  <div class="bar" style="--i: 50"></div>
  <div class="bar" style="--i: 49"></div>
  <div class="bar" style="--i: 48"></div>
  <div class="bar" style="--i: 47"></div>
  <div class="bar" style="--i: 46"></div>
  <div class="bar" style="--i: 45"></div>
  <div class="bar" style="--i: 44"></div>
  <div class="bar" style="--i: 43"></div>
  <div class="bar" style="--i: 42"></div>
  <div class="bar" style="--i: 41"></div>
  <div class="bar" style="--i: 40"></div>
  <div class="bar" style="--i: 39"></div>
  <div class="bar" style="--i: 38"></div>
  <div class="bar" style="--i: 37"></div>
  <div class="bar" style="--i: 36"></div>
  <div class="bar" style="--i: 35"></div>
  <div class="bar" style="--i: 34"></div>
  <div class="bar" style="--i: 33"></div>
  <div class="bar" style="--i: 32"></div>
  <div class="bar" style="--i: 31"></div>
  <div class="bar" style="--i: 30"></div>
  <div class="bar" style="--i: 29"></div>
  <div class="bar" style="--i: 28"></div>
  <div class="bar" style="--i: 27"></div>
  <div class="bar" style="--i: 26"></div>
  <div class="bar" style="--i: 25"></div>
  <div class="bar" style="--i: 24"></div>
  <div class="bar" style="--i: 23"></div>
  <div class="bar" style="--i: 22"></div>
  <div class="bar" style="--i: 21"></div>
  <div class="bar" style="--i: 20"></div>
  <div class="bar" style="--i: 19"></div>
  <div class="bar" style="--i: 18"></div>
  <div class="bar" style="--i: 17"></div>
  <div class="bar" style="--i: 16"></div>
  <div class="bar" style="--i: 15"></div>
  <div class="bar" style="--i: 14"></div>
  <div class="bar" style="--i: 13"></div>
  <div class="bar" style="--i: 12"></div>
  <div class="bar" style="--i: 11"></div>
  <div class="bar" style="--i: 10"></div>
  <div class="bar" style="--i: 9"></div>
  <div class="bar" style="--i: 8"></div>
  <div class="bar" style="--i: 7"></div>
  <div class="bar" style="--i: 6"></div>
  <div class="bar" style="--i: 5"></div>
  <div class="bar" style="--i: 4"></div>
  <div class="bar" style="--i: 3"></div>
  <div class="bar" style="--i: 2"></div>
  <div class="bar" style="--i: 1"></div>
  <div class="bar" style="--i: 0"></div>
</div>
</body>
</template>

<script>
CSS.registerProperty({
	name: "--k",
	syntax: "<number>",
	initialValue: 0,
	inherits: true
});

CSS.registerProperty({
	name: "--f",
	syntax: "<number>",
	initialValue: 1,
	inherits: true
});
export default {
}
</script>
<style scoped>

body {
	margin: 0;
	height: 100vh;
	background: #000;
}

div,
::before,
::after {
	position: absolute;
	top: 50%;
	left: 50%;
}

.a3d {
	transform-style: preserve-3d;
}

.bar {
	--k: 0;
	--f: 1;
	--p: var(--i) / var(--n);
	margin: -1px -4em;
	width: 8em;
	height: 2px;
	transform-style: preserve-3d;
	--ini: rotate(calc(var(--p) * 1turn)) translate(13em)
		rotatey(calc(var(--k) * 1turn)) scalex(calc(1 / var(--f)));
	transform-origin: calc(var(--f) * 50%) 50%;
	transform: var(--ini);
	background: HSL(calc(var(--p) * 360), 85%, 65%);
	animation: k $t linear calc(var(--p) *#{$m * $t}) infinite,
		f 0.5 * $t ease-in-out calc(var(--p) *#{$m * $t}) infinite alternate;

	&::before,
	&::after {
		left: calc(var(--s, 0) * 100%);
		margin: -0.255em;
		padding: 0.255em;
		border-radius: 50%;
		transform: scalex(calc(var(--f))) rotatey(calc(var(--k) * -1turn));
		background: inherit;
		content: "";
	}

	&::after {
		--s: 1;
	}
}

@keyframes f {
	to {
		--f: 0.5;
	}
}

@keyframes k {
	to {
		--k: 1;
	}
}

</style>
 