<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
  @font-face {
      font-family: "Avenir";
      src: url("assets/AvenirNextCyr-Regular.woff") format("woff");
      font-weight: 400;
      font-style: normal;
  };
  @font-face {
      font-family: "Avenir";
      src: url("assets/AvenirNextCyr-Medium.woff") format("woff");
      font-weight: 500;
      font-style: normal;
  };
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  };
  body {
      font-family: "Avenir";
      padding: 10px;
  };
</style>
