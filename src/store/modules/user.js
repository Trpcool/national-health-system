import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/token";
import { loginAPI, getUserInfoAPI } from "@/network/user";
import { create } from "lodash";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      account: "",
      nickname: "",
      avatar: "",
      proId: "",
      token: getToken(),
      email:"",
      phone:"",
      idNumber:"", //身份证
      proType:"", //角色id
      createdTime:null,
    };
  },
  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        loginAPI(data)
          .then((res) => {
            const { name, proId, token, username,avatar,email,phone,idNumber,proType,createdTime } = res;
            this.nickname = name;
            this.proId = proId;
            this.token = token;
            this.account = username;
            this.avatar = avatar;
            this.email = email;
            this.phone = phone;
            this.idNumber = idNumber;
            this.proType = proType;
            this.createdTime = createdTime || new Date().toLocaleString();
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
            const { name, proId, username, avatar,email,phone,idNumber,proType,createdTime } = res;
            this.nickname = name;
            this.proId = proId;
            this.account = username;
            this.avatar = avatar;
            this.email = email;
            this.phone = phone;
            this.idNumber = idNumber;
            this.proType = proType;
            this.createdTime = res.createdTime || new Date().toLocaleString();
            resolve(res);
          })
          .catch(err=>reject(err));
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        try {
          for(let key in this.$state){
            this.$state[key] = null;
          }
          removeToken();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
