<template>
  <div class="root-container">
    <div class="main-container">
      <div class="top-btn-box">
        <div class="btn-box">
          <ThemeIconBtnVue title="계약 등록" icon="bi bi-plus-square" :func="routeCreate" />
          <ExcelBtnVue title="대량 등록" :func="routeCreateBulk" />
        </div>
      </div>
      <div class="table-box">
        <ContractTableVue />
        <PaginationBarVue :store="contractListStore" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import ExcelBtnVue from '@/components/common/btn/ExcelBtn.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ContractTableVue from '@/components/contract/table/ContractTable.vue';
import { mapStores } from 'pinia';
import { getContractList } from '@/utils/contract';
import { useContractListStore } from '@/stores/contract/contractList';

export default {
  name: 'ContractListView',
  components: {
    ThemeIconBtnVue,
    ExcelBtnVue,
    PaginationBarVue,
    ContractTableVue
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapStores(useContractListStore),
  },
  methods: {
    routeCreate() {
      this.$router.push({ name: 'contractCreate' });
    },
    routeCreateBulk() {
      this.$router.push({ name: 'contractCreateBulk' });
    },
    async getContractList() {
      const result = await getContractList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    setupWatchers() {
      this.$watch('contractListStore.size', this.getContractList);
      this.$watch('contractListStore.page', this.getContractList);
      this.$watch('contractListStore.columns', this.getContractList, { deep: true });
      this.contractListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getContractList);
        }
      });
    }
  },
  async mounted() {
    this.contractListStore.$reset();
    await this.getContractList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  @include root-container;
  width: fit-content;
  height: 100%;
  padding: 30px 40px;

  .main-container {
    @include flex-box(column, center, 30px);
    width: 1600px;
    height: 100%;
  }
}

.top-btn-box {
  @include flex-box(row, space-between, 0px);
  width: 100%;

  .btn-box {
    @include flex-box(row, space-between, 20px);
  }
}
</style>
