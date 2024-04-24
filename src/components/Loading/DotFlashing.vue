<template>
  <div class="dot-flashing"></div>
</template>
<style scoped>
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2a77af;
  color: #2a77af;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0s;
}
.dot-flashing::before,
.dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2a77af;
  color: #2a77af;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0.4s;
}
.dot-flashing::after {
  left: 30px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2a77af;
  color: #2a77af;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0.8s;
}

@keyframes dot-flashing {
  0% {
    background-color: #2a77af;
  }
  50%,
  100% {
    background-color: #bfd9f3;
  }
}
</style>
