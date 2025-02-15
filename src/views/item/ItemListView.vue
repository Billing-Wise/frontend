<template>
  <div class="root-container">
    <div class="main-container">
      <div class="top-btn-box">
        <ThemeIconBtnVue title="상품 등록" icon="bi bi-plus-square" :func="() => operateModal(true)" />
        <ItemSearchVue />
      </div>
      <div class="table-box">
        <ItemTableVue />
        <PaginationBarVue :store="itemStore" />
      </div>
    </div>
  </div>
  <ItemCreateModalVue :isVisible="modalVisible" :closeModal="() => operateModal(false)" />
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ItemTableVue from '@/components/item/table/ItemTable.vue';
import ItemCreateModalVue from '@/components/item/modal/ItemCreateModal.vue';
import ItemSearchVue from '@/components/item/ItemSearch.vue';
import { useItemStore } from '@/stores/item';
import { mapActions } from 'pinia';
import { mapStores } from 'pinia';
import { getItemList } from '@/utils/item';

export default {
  name: 'ItemListView',
  components: {
    ThemeIconBtnVue,
    PaginationBarVue,
    ItemTableVue,
    ItemCreateModalVue,
    ItemSearchVue
  },
  data() {
    return {
      modalVisible: false,
    }
  },
  computed: {
    ...mapStores(useItemStore)
  },
  watch: {
    'itemStore.size': 'getItemList',
    'itemStore.page': 'getItemList',
    'itemStore.columns': {
      handler: 'getItemList',
      deep: true
    }
  },
  methods: {
    ...mapActions(useItemStore, ['setPage', 'setItemList']),
    // 메서드 - 상품 목록 조회
    async getItemList() {
      const result = await getItemList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    // 메서드 - 상품 생성 모달창 조작
    operateModal(value) {
      this.modalVisible = value;
    },
    setupWatchers() {
      this.$watch('itemStore.size', this.getItemList);
      this.$watch('itemStore.page', this.getItemList);
      this.$watch('itemStore.columns', this.getItemList, { deep: true });
    }
  },
  async mounted() {
    this.itemStore.$reset();
    this.setupWatchers();
    await this.getItemList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, center, 0px);
  @include root-container;
  padding: 30px 40px;
  width: fit-content;
  height: 100%;

  .main-container {
    @include flex-box(column, center, 30px);
    width: 1200px;
    height: 100%;
  }
}

.top-btn-box {
  @include flex-box(row, space-between, 20px);
  width: 100%;
}
</style>
