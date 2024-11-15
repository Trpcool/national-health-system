import { ref, watch, toRaw } from "vue";
import { removeNullProps } from "@/utils/index";
import { debounce } from "lodash";
/**
 * @param {object} options
 * @param {function} options.request //接口请求函数
 * @param {object} options.params //查询参数
 */
export default function usePagination(options) {
  const { request, params } = options;
  // 临时保存初始化状态数据
  const initParams = JSON.parse(JSON.stringify(toRaw(params.value)));
  function _initParams() {
    let needInit = false;
    for (const [key,value] of Object.entries(initParams)) {
      if (
        (Array.isArray(toRaw(params.value)[key]) && !!toRaw(params.value)[key].length) ||
        toRaw(params.value)[key] != value
      )
        needInit = true;
    }
    if (needInit) params.value = { ...initParams };
  }
 

  const pager = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 15, 20, 30, 50],
    total: 0,
    list: [],
    loading: false,
  });

  // 临时分页参数保存区
  const requestParams = {
    pageNum: 1,
    pageSize: 10,
  };
  //   获取数据
  async function getList() {
    pager.value.list = [];
    pager.value.loading = true;
    try {
      const res = await request({
        ...requestParams,
        ...removeNullProps(toRaw(params.value)),
      });
      pager.value.list = res.records;
      pager.value.total = res.total;
      pager.value.currentPage = res.current;
    } catch (err) {
      pager.value.list = [];
    } finally {
      pager.value.loading = false;
    }
  }

  watch(
    () => [pager.value.currentPage, pager.value.pageSize],
    () => {
      requestParams.pageNum = pager.value.currentPage;
      requestParams.pageSize = pager.value.pageSize;
      getList();
    }
  );

  watch(
    () => params.value,
    debounce(() => {
      requestParams.pageNum = 1;
      requestParams.pageSize = pager.value.pageSize;
    }, 200),
    {
      deep: true,
    }
  );

  async function resetPage() {
    _initParams();
    // if (params?.value) {
    //   params.value = {};
    // } //清空查询参数
    // pager.value.currentPage = 1;
    // pager.value.pageSize = 15;
    // requestParams.pageNum = 1;
    // requestParams.pageSize = 15;
    getList();
  }

  return { pager, getList, resetPage };
}
