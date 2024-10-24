import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useAppStore = defineStore("app", {
    state: () => {
        return {
           refresh:true,
        };
    },
    actions: {
       refreshPage(){
            this.refresh = !this.refresh
            const crtThis = this
             nextTick().then(()=>crtThis.refresh = !crtThis.refresh)
            
        }
    }
});