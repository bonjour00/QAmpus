<template>
  <div class="f-modal-icon f-modal-warning scaleWarning">
    <span class="f-modal-body pulseWarningIns"></span>
    <span class="f-modal-dot pulseWarningIns"></span>
  </div>
</template>
<style lang="scss" scoped>
.f-modal-icon {
  border-radius: 50%;
  border: 4px solid gray;
  box-sizing: content-box;
  height: 80px;
  margin: 20px auto;
  padding: 0;
  position: relative;
  width: 80px;

  &.f-modal-warning {
    border-color: #f8bb86;

    &:before {
      animation: pulseWarning 2s linear infinite;
      background-color: #fff;
      border-radius: 50%;
      content: '';
      display: inline-block;
      height: 100%;
      opacity: 0;
      position: absolute;
      width: 100%;
    }

    &:after {
      background-color: #fff;
      border-radius: 50%;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 1;
    }
  }

  &.f-modal-warning .f-modal-body {
    background-color: #f8bb86;
    border-radius: 2px;
    height: 47px;
    left: 50%;
    margin-left: -2px;
    position: absolute;
    top: 10px;
    width: 5px;
    z-index: 2;
  }

  &.f-modal-warning .f-modal-dot {
    background-color: #f8bb86;
    border-radius: 50%;
    bottom: 10px;
    height: 7px;
    left: 50%;
    margin-left: -3px;
    position: absolute;
    width: 7px;
    z-index: 2;
  }

  + .f-modal-icon {
    margin-top: 50px;
  }
}

.scaleWarning {
  animation: scaleWarning 0.75s infinite alternate;
}

.pulseWarningIns {
  animation: pulseWarningIns 0.75s infinite alternate;
}

@keyframes scaleWarning {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes pulseWarning {
  0% {
    background-color: #fff;
    transform: scale(1);
    opacity: 0.5;
  }

  30% {
    background-color: #fff;
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    background-color: #f8bb86;
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulseWarningIns {
  0% {
    background-color: #f8d486;
  }

  100% {
    background-color: #f8bb86;
  }
}
</style>
