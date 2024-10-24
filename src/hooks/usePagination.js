import { ref, watch, toRaw } from "vue";
import { removeNullProps } from "@/utils/index";
/**
 * @param {object} options
 * @param {function} options.request //接口请求函数
 * @param {object} options.params //查询参数
 */
export default function usePagination(options) {
  const { request, params } = options;
  const pager = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 15, 20, 30, 50],
    total: 0,
    list: [],
    loading: false,
  });
  //   获取数据
  async function getList() {
    pager.value.list = [];
    pager.value.loading = true;
    try {
      const res = await request(
        Object.assign(
          { pageNum: pager.value.currentPage, pageSize: pager.value.pageSize },
          removeNullProps(toRaw(params.value))
        )
      );
      pager.value.list = res.records;
      pager.value.total = res.total;
      pager.value.currentPage = res.current;
    } catch (err) {
      pager.value.list = [];
    } finally {
      pager.value.loading = false;
    }
  }

  async function resetPage() {
    if (params?.value) {
      params.value = {};
    } //清空查询参数
    pager.value.currentPage = 1;
    pager.value.pageSize = 15;
    getList();
  }

  watch(
    () => [pager.value.currentPage, pager.value.pageSize],
    () => getList()
  );
  return { pager, getList, resetPage };
}
