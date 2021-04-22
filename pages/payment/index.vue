<template>
  <v-container class="pt-0 pb-0">
    <v-row>
      <v-col cols="12">
        <div class="mt-7 mb-2 text-primary text-title text-center">รายการบิล</div>
      </v-col>
    </v-row>

    <v-sheet elevation="6">
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

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <List_bill :uuiduser="uuiduser" v-if="tab == 0" />
          <List_bill_history :uuiduser="uuiduser" v-if="tab == 1" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import List_bill from "@/components/payment_component/list_bill";
import List_bill_history from "@/components/payment_component/list_bill_history";

export default {
  data() {
    return {
      uuiduser: "",
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
    List_bill_history
  },
  methods: {

  },
  mounted() {
    liff
      .init({
        liffId: process.env.liffid_payment
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
           
          });
        } else {
          liff.login();
        }
      });
  }
};
</script>
