<template>
  <div>
    <v-dialog v-model="dialog_payment" width="350px" persistent>
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title>
            <v-icon large left>mdi-credit-card-check</v-icon>
            <span class="title font-weight-light">Credit Card</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="pa-1" cols="12">
                  <v-text-field
                    v-model="card.number"
                    label="Card Number"
                    inputmode="tel"
                    :maxlength="16"
                    :counter="16"
                    pattern="[0-9]*"
                    :rules="textRulesCardNumber"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  ></v-text-field>
                </v-col>

                <v-col class="pa-1" cols="12">
                  <v-text-field v-model="card.name" label="Full Name" :rules="textRulesFullName"></v-text-field>
                </v-col>
                <v-list-item-subtitle class="pl-1">Expiration Date</v-list-item-subtitle>
                <v-col class="pa-1 ma-0" cols="6">
                  <v-select
                    v-model="card.expiration_month"
                    :items="['01','02','03','04','05','06','07','08','09','10','11','12']"
                    label="Month"
                    :rules="textRulesMonth"
                  ></v-select>
                </v-col>
                <v-col class="pa-1 ma-0" cols="6">
                  <v-select
                    v-model="card.expiration_year"
                    :items="['2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032']"
                    label="Year"
                    :rules="textRulesYear"
                  ></v-select>
                </v-col>
                <v-col class="pa-1" cols="12">
                  <v-text-field
                    v-model="card.security_code"
                    label="CVV"
                    type="text"
                    inputmode="tel"
                    pattern="[0-9]*"
                    :maxlength="4"
                    id="cvv"
                    :rules="textRulescvv"
                    dense
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="pa-5">
            <v-btn
              v-if="this.obj_select == null"
              color="primary"
              class="mr-4"
              @click="btn_payment"
            >ชำระเงิน 0 บาท</v-btn>
            <v-btn
              v-else
              color="primary"
              class="mr-4"
              @click="btn_payment"
            >ชำระเงิน {{this.obj_select.payment_amount}} บาท</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" class="mr-4" @click="closeDialogPayment">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="overlay" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          กรุณารอสักครู่..
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
export default {
  props: {
    obj_select: null,
    dialog_payment: false,
    uuiduser: ""
  },
  data: () => ({
    paymentamount: "0",
    textRulescvv: [v1 => !!v1 || "กรุณาใส่ CVV"],
    textRulesYear: [v1 => !!v1 || "กรุณาใส่ Year"],
    textRulesCardNumber: [v1 => !!v1 || "กรุณาใส่ Card Number"],
    textRulesFullName: [v1 => !!v1 || "กรุณาใส่ Full Name"],
    textRulesMonth: [v1 => !!v1 || "กรุณาใส่ Month"],
    textRulesYear: [v1 => !!v1 || "กรุณาใส่ Year"],
    txt_dialog_title: "",
    txt_dialog_sub: "",
    dialog_status: false,
    token: "",
    overlay: false,
    dialog_status_payment_success: false,
    card: {
      expiration_month: "",
      expiration_year: "",
      name: "Somchai Prasert",
      number: "4242424242424242",
      security_code: ""
    }
  }),
  methods: {
    set_default_value() {
      this.card.expiration_month = "";
      this.card.expiration_year = "";
      this.card.name = "";
      this.card.number = "";
      this.card.security_code = "";
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    },
    closeDialogPayment() {
      let status_dialog_payment = this.dialog_payment;
      this.$emit(
        "closeDialogPayment",
        (this.status_dialog_payment = false),
        this.status_senddata
      );
    },
    async btn_payment() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        Omise.setPublicKey(process.env.pkeyomise);
        Omise.createToken("card", this.card, (statusCode, response) => {
          switch (statusCode) {
            case 200:
              this.$axios
                .$post("actionpayment/pay_creditcard", {
                  m_tokenid: response["id"],
                  m_payment_amount: this.obj_select.payment_amount,
                  m_uuiduser: this.uuiduser,
                  m_scfi_code: this.obj_select.scfi_code,
                  m_payment_event_id: this.obj_select.payment_event_id,
                  m_company_id : process.env.company_id
                })
                .then(res => {
                  this.set_default_value();
                  this.overlay = false;
                  switch (res.message) {
                    case "success":
                      this.status_senddata = "success";
                      this.closeDialogPayment();
                      break;
                    default:
                      this.status_senddata = "fail";
                      this.closeDialogPayment();
                      break;
                  }
                })
                .catch(error => {
                  this.overlay = false;
                  this.status_senddata = "fail";
                  this.closeDialogPayment();
                })
                .finally();
              break;

            default:
              this.overlay = false;
              this.status_senddata = "fail";
              this.closeDialogPayment();
              break;
          }
        });
      }
    }
  },
  components: {},
  mounted() {}
};
</script>