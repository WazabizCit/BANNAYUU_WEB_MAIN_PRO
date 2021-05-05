<template>
  <div>
    <v-container class="mb-15">
      <v-row>
        <v-col v-for="item in list_items" :key="item.scfi_id" cols="12">
          <v-card class="mx-auto" max-width="444" raised   elevation="15">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 pt-0">
                  {{
                  item.payment_event_name
                  }}
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="mt-3">Code</v-list-item-subtitle>
                <div class="text-blue">{{ item.scfi_code}}</div>
                <v-list-item-subtitle class="mt-1">วันออกบิล</v-list-item-subtitle>
                <div class="text-blue">{{ item.date_from}}</div>
                <v-list-item-subtitle class="mt-1">วันที่ทำรายการ</v-list-item-subtitle>
                <div class="text-blue">{{ item.create_date}}</div>
                <v-list-item-subtitle class="mt-1">สถานะการชำระ</v-list-item-subtitle>
                <div class="text-orange" v-if="item.workflow_id == null">รอชำระบิล</div>
                <div class="text-success" v-else>{{item.workflow_name}}</div>
                <v-divider class="mt-2"></v-divider>
                <v-list-item-subtitle class="mt-3">จำนวนเงิน</v-list-item-subtitle>
                <v-list-item-title class="headline mb-1 text-success">{{item.payment_amount}}</v-list-item-title>
           
          
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="status_show">
        <v-row class="mt-10 mb-15">
          <v-col class="text-center" cols="12">
            <v-icon>mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>




  
    </v-container>
  </div>
</template>

<script>

export default {
  props: {
    uuiduser: ""
  },
  data: () => ({
    dialog_status: false,
    txt_dialog_title: "",
    txt_dialog_sub: "",
    dialog_status_payment_success: false,
    obj_select: null,
    dialog_attachfile: false,
    dialog_payment: false,
    dialog_select_pay: false,
    overlay: false,
    status_show: false,
    list_items: []
  }),
  methods: {
 
    async requestData() {
      this.overlay = true;
      this.$axios
        .$post("actionpayment/getlistbillsuccess", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id
        })
        .then(res => {
          this.overlay = false;
          if (res.data.length == 0) {
            this.list_items = res.data;
            this.status_show = true;
          } else {
            this.list_items = res.data;
            this.status_show = false;
          }
        })
        .catch(error => {
          this.overlay = false;
          this.status_show = true;
        })
        .finally();
    } 
   


  },
  mounted() {
    this.requestData();
  },

  components: { 
  }
};
</script>

<style lang="scss" scoped>
.v-icon {
  font-size: 60px;
  padding: 0 15px;
}
.text-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
