<template>
  <div class="not-found-wrap bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 pt-20">
    <div class="w-3/4 mx-auto">
      <div class="p-10 bg-white shadow-2xl rounded-xl">
        <h1 class="text-center text-9xl font-bold italic leading-tight text-black">404</h1>
        <h2 class="text-center text-4xl font-bold leading-tight text-gray-900">Page Not Found</h2>
        <h2 class="text-center text-6xl font-bold leading-tight text-gray-900">页面不存在</h2>
        <div class="w-fit mx-auto mt-10">
          <router-link
              to="/"
              class="rounded-md border border-transparent
            bg-blue-600 hover:bg-blue-500 px-5 py-3 text-base text-2xl
            font-medium leading-6 text-white transition-colors
            duration-150 ease-in-out focus:outline-1">
            返回首页
          </router-link>
        </div>

      </div>
    </div>
  </div>

</template>

<style>
.not-found-wrap {
  height: 100vh;
}
</style>
