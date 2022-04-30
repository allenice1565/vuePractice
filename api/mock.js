import Mock from "mockjs";
import HomeApi from "./mockServerData/home";

Mock.mock("/api/home/getData", HomeApi.getStatiticalData);