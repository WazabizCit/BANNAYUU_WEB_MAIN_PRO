<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-dialog v-model="dialog_detail" width="350px" persistent>
        <v-card>
          <v-card-title>รายละเอียด</v-card-title>
          <v-list-item class="mb-2" three-line>
            <v-list-item-content>
              <v-list-item-subtitle class="">Code</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.card_code}}</div>
              <v-list-item-subtitle class="mt-1">ชื่อผู้มาติดต่อ</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.contact_name}}</div>
              <v-list-item-subtitle class="mt-1">ทะเบียนรถ</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.license_plate}}</div>
              <v-list-item-subtitle class="mt-1">ประเภทรถ</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.cartype_category_name_th}}</div>
              <v-list-item-subtitle class="mt-1">รูปแบบผู้มาติดต่อ</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.card_code_status}}</div>
               <v-list-item-subtitle class="mt-1">เวลาเข้า</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.parking_in_datetime}}</div>
              <v-list-item-subtitle class="mt-1">สถานะ Estamp</v-list-item-subtitle>
              <div class="text-primary">{{obj_select.estamp_name}}</div>
            </v-list-item-content>
            <v-icon class="v-icon-details-star">mdi-card-account-details-star</v-icon>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeDialogdetail">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    dialog_detail: false,
    obj_select: {}
  },
  data: () => ({}),
  methods: {
    closeDialogdetail() {
      let status_dialog_detail = this.dialog_detail;
      this.$emit("closeDialogdetail", {
        status_dialog_detail: (this.status_dialog_detail = false)
      });
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.v-icon {
  font-size: 60px;
  padding: 0 15px;
}
</style>
