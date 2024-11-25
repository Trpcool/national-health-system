import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      refresh: true,
      isCollapse: false,
    };
  },
  actions: {
    refreshPage() {
      this.refresh = !this.refresh;
      const crtThis = this;
      nextTick().then(() => (crtThis.refresh = !crtThis.refresh));
    },
    async changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
