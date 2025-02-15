import { useStaticStore } from "@/stores/static/static";
import { mainAxios } from "./axios"

const staticStore = useStaticStore();

async function getAllStatic() {
  const result = await mainAxios('stats/1');

  if (result.code === 200) {
    staticStore.setAllDataList(result.data);
  }

  return result;
}

async function getYearStatic(year) {
  const result = await mainAxios(`stats/2?year=${year}`);

  if (result.code === 200) {
    staticStore.setMonthDataList(result.data);
  }

  return result;
}

async function getMonthStatic(year, month) {
  const result = await mainAxios(`stats/1?year=${year}&month=${month}`);

  if (result.code === 200) {
    staticStore.setWeekDataList(result.data);
  }

  return result;
}

async function getThisMonthStatic(year, month) {
  const result = await mainAxios(`stats/2?year=${year}&month=${month}`);

  return result;
}

export { getAllStatic, getYearStatic, getMonthStatic, getThisMonthStatic }