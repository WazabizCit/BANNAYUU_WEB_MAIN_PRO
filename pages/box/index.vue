<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row align="center" justify="center">
        <div class="text-primary text-title mt-5 mb-2">แจ้งเตือนพัสดุ</div>
        <v-col v-for="item in items_list" :key="item.tpi_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-list-item class="mb-3" three-line>
              <v-list-item-content>
                <v-list-item-subtitle>Code</v-list-item-subtitle>
                <div class="text-orange">{{ item.tpi_code }}</div>
                <v-list-item-subtitle class="mt-1">เวลาเจ้าหน้าที่รับพัสดุ</v-list-item-subtitle>
                <div class="text-orange">{{ item.receive_parcel_datetime }}</div>
                <v-list-item-subtitle class="mt-1">รายละเอียด</v-list-item-subtitle>
                <div class="text-orange">{{ item.receive_parcel_detail }}</div>
                <v-list-item-subtitle class="mt-1">สถานะพัสดุ</v-list-item-subtitle>
                <div v-if="item.tpi_status == 'receive_parcel'" class="text-orange">รับพัสดุจากคนส่ง</div>
                <div
                  v-else-if="item.tpi_status == 'send_parcel'"
                  class="text-orange"
                >ลูกค้ารับพัสดุจากเจ้าหน้าที่</div>
                <div
                  v-else-if="item.tpi_status == 'receive_vilager'"
                  class="text-orange"
                >ลูกค้าได้ทำการยืนยันรับพัสดุแล้ว</div>
                <div v-else class="text-orange">-</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions class>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="item.tpi_status != 'send_parcel'"
                @click="btn_show_box(item)"
              >
                <v-icon left>mdi-hand-okay</v-icon>ยืนยันการรับพัสดุ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

        <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>


      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon>mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-dialog v-model="dialog_confirm_box" width="350px" persistent>
        <v-card>
          <v-card-title>แจ้งเตือน</v-card-title>
          <div align="center" justify="center">
            <div class="text-primary pl-2 pr-2 pt-2">คุณต้องการที่จะยืนยันรับพัสดุ ใช่หรือไม่ ?</div>
          </div>

          <v-card-actions class="mt-7">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="btn_confirm_box">ยืนยัน</v-btn>
            <v-btn color="red" @click="dialog_confirm_box = false">ปิด</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <Dialog_popup
        :dialog_status="dialog_status"
        :txt_dialog_sub="txt_dialog_sub"
        :txt_dialog_title="txt_dialog_title"
        @closeDialog="closeDialog"
      />

      <v-dialog v-model="dialog_status_boxsuccess" persistent width="300">
        <v-card max-width="344" class="mx-auto" raised>
          <v-list-item-content class="justify-center">
            <v-img
              class="mt-2"
              :src="require('~/assets/img/icons8-checked-80.png')"
              contain
              max-width="60"
            ></v-img>
            <div class="text-success headline text-center mt-3">ทำรายการสำเร็จ</div>
            <v-list-item-subtitle class="text-center mt-2">ลูกค้าทำรายการสำเร็จ</v-list-item-subtitle>
            <v-list-item-subtitle class="text-center">กรุณากดปุ่มตกลงเพื่อทำรายการต่อ</v-list-item-subtitle>
          </v-list-item-content>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-center"
              color="primary"
              @click="dialog_status_boxsuccess = false"
            >ตกลง</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Dialog_popup from "@/components/dialog_popup.vue";

export default {
  data: () => ({
    dialog_status_boxsuccess: false,
    dialog_status: false,
    txt_dialog_title: "",
    txt_dialog_sub: "",
    overlay: false,
    dialog_confirm_box: false,
    uuiduser: "",
    status_show: false,
    obj_select: {},
    items_list: []
  }),
  methods: {
    btn_confirm_box() {
      this.overlay = true;
      this.dialog_confirm_box = false;
      this.$axios
        .$post("actionbox/update_receive_vilager", {
          m_uuiduser: this.uuiduser,
          m_tpi_id: this.obj_select.tpi_id,
          m_company: process.env.company_id
        })
        .then(res => {
          this.overlay = false;
          this.requestData();
          switch (res.message) {
            case "success":
              this.dialog_status_boxsuccess = true;
              break;

            default:
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือน";
              this.txt_dialog_sub = "ระบบผิดพลาด";
              break;
          }
        })
        .catch(error => {
          this.status_show = true;
          this.overlay = false;
        })
        .finally();
    },
    btn_show_box(item) {
      this.dialog_confirm_box = true;
      this.obj_select = item;
    },
    async requestData() {
      this.overlay = true;
      this.items_list = [];
      this.$axios
        .$post("actionbox/get_listbox", {
          m_uuiduser: this.uuiduser
        })
        .then(res => {
          this.overlay = false;
          if (res.data.length == 0) {
            this.status_show = true;
          } else {
            this.items_list = res.data;
            this.status_show = false;
            // console.log(res.data);
          }
        })
        .catch(error => {
          this.status_show = true;
          this.overlay = false;
        })
        .finally();
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    }
  },
  mounted() {
    liff
      .init({
        liffId: process.env.liffid_box
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
            this.requestData();
            //this.profileImg = profile.pictureUrl;
          });
        } else {
          liff.login();
        }
      });
  },
  components: {
    Dialog_popup
  }
};
</script>

<style lang="scss" scoped>
.v-icon-details-star {
  font-size: 80px;
  padding: 0 15px;
}
</style>
