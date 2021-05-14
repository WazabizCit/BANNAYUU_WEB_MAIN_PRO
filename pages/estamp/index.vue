


<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row align="center" justify="center">
        <div class="text-primary text-title mt-5 mb-2">ประทับตราผู้มาติดต่อ</div>
        <v-col v-for="item in items_list" :key="item.tbv_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-list-item class="mb-3" three-line>
              <v-list-item-content>
                <v-list-item-subtitle>ชื่อผู้มาติดต่อ</v-list-item-subtitle>
                <div class="text-blue">{{item.contact_name}}</div>
                <v-list-item-subtitle class="mt-1">Code</v-list-item-subtitle>
                <div class="text-blue">{{item.card_code}}</div>
                <v-list-item-subtitle class="mt-1">รูปแบบผู้มาติดต่อ</v-list-item-subtitle>
                <div class="text-blue">{{item.card_code_status}}</div>
                <v-list-item-subtitle class="mt-1">เวลาเข้า</v-list-item-subtitle>
                <div class="text-blue">{{item.parking_in_datetime}}</div>
                <v-list-item-subtitle class="mt-1">สถานะประทับตรา</v-list-item-subtitle>
                <div v-if="item.estamp_flag == 'Y'" class="text-success">{{item.estamp_name}}</div>
                <div v-else class="text-orange">{{item.estamp_name}}</div>
              </v-list-item-content>
              <v-icon class="v-icon-details-star">mdi-card-account-details-star</v-icon>
            </v-list-item>
            <v-card-actions class>
              <v-btn :disabled="item.estamp_flag == 'Y'" color="success" @click="btn_estamp(item)">
                <v-icon left>mdi-stamper</v-icon>ประทับตรา
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="btn_detail(item)">
                <v-icon left>mdi-format-list-bulleted</v-icon>รายละเอียด
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>

      <!-- <v-text-field class="mt-2" v-model="uuiduser" name="uuiduser" label="UUID" dense disabled></v-text-field> -->

      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon class="v-icon-size">mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center text-primary" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>
    </v-container>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <Dialog_estamp
      :dialog_estamp="dialog_estamp"
      :obj_select="obj_select"
      :uuiduser="uuiduser"
      @closeDialogestamp="closeDialogestamp"
    />

    <Dialog_detail
      :dialog_detail="dialog_detail"
      :obj_select="obj_select"
      @closeDialogdetail="closeDialogdetail"
    />

    <Dialog_detail
      :dialog_detail="dialog_detail"
      :obj_select="obj_select"
      @closeDialogdetail="closeDialogdetail"
    />

       <Card_close_process :status_close_process="status_close_process" />
  </div>
</template>

<script>
import Dialog_estamp from "@/components/estamp_component/dialog_estamp";
import Dialog_detail from "@/components/estamp_component/dialog_detail";
import Card_close_process from "@/components/closeprocess_component/card_close_process";

export default {
  data: () => ({
    status_close_process: false,
    overlay: false,
    dialog_estamp: false,
    dialog_detail: false,
    uuiduser: "",
    status_show: false,
    obj_select: {},
    items_list: []
  }),
  methods: {
    btn_estamp(obj) {
      this.dialog_estamp = true;
      this.obj_select = obj;
    },
    btn_detail(obj) {
      this.dialog_detail = true;
      this.obj_select = obj;
    },
    async requestData() {
      this.overlay = true;
      this.items_list = [];
      this.$axios
        .$post("actionestamp/get_list_estamp", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id,
          m_promotion: process.env.promotion_code
        })
        .then(res => {
          this.overlay = false;
          if (res.data.length == 0) {
            this.status_show = true;
          } else {
            this.items_list = res.data;
            this.status_show = false;
          }
        })
        .catch(error => {
         this.status_close_process = true;
          this.overlay = false;
        })
        .finally();
    },
    closeDialogestamp(obj) {
      this.requestData();
      this.dialog_estamp = obj.status_dialog_estamp;
    },
    closeDialogdetail(obj) {
      this.dialog_detail = obj.status_dialog_detail;
    }
  },
  mounted() {
    this.uuiduser = "U2a9a887f26eb7200dd52e97a04c13d1b";
    this.requestData();

    // liff
    //   .init({
    //     liffId: process.env.liffid_estamp
    //   })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       liff.getProfile().then(profile => {
    //         //this.profileImg = profile.pictureUrl;
    //         this.uuiduser = profile.userId;
    //         this.requestData();
    //       });
    //     } else {
    //       liff.login();
    //     }
    //   });
  },
  components: {
    Dialog_estamp,
    Dialog_detail,
    Card_close_process
  }
};
</script>

<style lang="scss" scoped>
.v-icon-details-star {
  font-size: 80px;
  padding: 0 15px;
}

.v-icon-size {
  font-size: 80px;
  padding: 0 15px;
}
</style>


