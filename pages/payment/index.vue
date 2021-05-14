<template>
  <v-container class="pt-0 pb-0">
    <v-row>
      <v-col cols="12">
        <div class="mt-7 mb-2 text-primary text-title text-center">รายการบิล</div>
      </v-col>
    </v-row>

    <v-sheet v-if="!status_close_process" elevation="6">
      <v-tabs
        v-model="tab"
        background-color="white"
        grow
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
      </v-tabs>
    </v-sheet>

    <v-tabs-items v-if="!status_close_process" v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <List_bill :uuiduser="uuiduser" v-if="tab == 0 && uuiduser != null " />
          <List_bill_history :uuiduser="uuiduser" v-if="tab == 1 && uuiduser != null" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <Card_close_process :status_close_process="status_close_process" />
  </v-container>
</template>

<script>
import List_bill from "@/components/payment_component/list_bill";
import List_bill_history from "@/components/payment_component/list_bill_history";
import Card_close_process from "@/components/closeprocess_component/card_close_process";

export default {
  data() {
    return {
      status_close_process: false,
      uuiduser: null,
      tab: 0,
      tabstatus: 0,
      items: [
        { tab: "รอการชำระ", status: "list_bill" },
        { tab: "สำเร็จ", status: "list_bill_history" }
      ]
    };
  },
  components: {
    List_bill,
    List_bill_history,
    Card_close_process
  },
  methods: {
    async requestData() {
      this.$axios
        .$post("actionpayment/check_status_payment", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id,
          m_promotion: process.env.promotion_code
        })
        .then(res => {
          switch (res.message) {
            case "success":
              this.status_close_process = false;
              break;

            default:
              this.status_close_process = true;
              break;
          }
        })
        .catch(error => {
          this.status_close_process = true;
        })
        .finally();
    }
  },
  created() {
    this.uuiduser = "U2a9a887f26eb7200dd52e97a04c13d1b";
    this.requestData();
    // liff
    //   .init({
    //     liffId: process.env.liffid_payment
    //   })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       liff.getProfile().then(profile => {
    //         this.uuiduser = profile.userId;
    //       });
    //     } else {
    //       liff.login();
    //     }
    //   });
  }
};
</script>
