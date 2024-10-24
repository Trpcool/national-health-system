import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/token";
import { loginAPI, getUserInfoAPI } from "@/network/user";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      account: "",
      nickname: "",
      avatar: "",
      proId: "",
      token: getToken(),
    };
  },
  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        loginAPI(data)
          .then((res) => {
            const { name, proId, token, username,avatar } = res;
            this.nickname = name;
            this.proId = proId;
            this.token = token;
            this.account = username;
            this.avatar = avatar;
            setToken(token);
            resolve(res);
          })
          .catch(err=>reject(err));
      });
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoAPI()
          .then((res) => {
            const { name, proId, username, avatar } = res;
            this.nickname = name;
            this.proId = proId;
            this.account = username;
            this.avatar = avatar;
            resolve(res);
          })
          .catch(err=>reject(err));
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        try {
          this.account = "";
          this.nickname = "";
          this.avatar = "";
          this.proId = "";
          this.token = "";
          removeToken();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
