import { ref } from "vue";

import type pageModel from "@/components/page-model/page-model.vue";

type editCk = (item: any) => void;

function usePageModel(editCB?: editCk) {
  const modelRef = ref<InstanceType<typeof pageModel>>();
  function handleEdit(item: any) {
    modelRef.value?.setModalVisible(false, item);
    if (editCB) editCB(item);
  }
  function handleNew() {
    modelRef.value?.setModalVisible();
  }
  return {
    modelRef,
    handleEdit,
    handleNew,
  };
}
export default usePageModel;
