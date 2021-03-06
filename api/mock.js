import Mock from "mockjs";
import HomeApi from "./mockServerData/home";
import UserApi from "./mockServerData/user";
import permissionApi from "./mockServerData/permission";

Mock.mock("/api/home/getData", HomeApi.getStatiticalData);
Mock.mock("/user/edit", "post", UserApi.updateUser);
Mock.mock("/user/add", "post", UserApi.createUser);
Mock.mock("/api/user/getUser", "get", UserApi.getUserList);
Mock.mock("/user/del", "post", UserApi.deleteUser);

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);