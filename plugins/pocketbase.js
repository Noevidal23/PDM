import PocketBase from "pocketbase";

export default defineNuxtPlugin((nuxtApp) => {
  const pb = new PocketBase("https://pocketbase.electolabs.com");
  pb.autoCancellation(false);
  return {
    provide: {
      pb,
    },
  };
});
