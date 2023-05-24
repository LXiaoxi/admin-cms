import xxRequest from "../index";
import type { IAccount, IPhone } from "@/types";
export function loginPhoneRequest(data: IPhone) {
  return xxRequest.post({
    url: "/user/login/phone",
    data,
  });
}

export function loginUserNameRequest(data: IAccount) {
  return xxRequest.post({
    url: "/user/login/userName",
    data,
  });
}

// 获取用户详情信息
export function getUserInfoRequest(id: Number) {
  return xxRequest.get({
    url: `/user/info/${id}`,
  });
}

// 根据用户角色获取菜单信息
export function getUserMenuRequest(id: number) {
  return xxRequest.get({
    url: `/role/${id}/menu`,
  });
}
