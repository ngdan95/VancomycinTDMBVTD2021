// JavaScript source code
function calculateTotal() {

              qty_x = $("#qty_kcl").val() - $("#qty_tgt").val() - 1.5;
              //x = t2-t1
              $("#qty_x").text(qty_x);

              pre_ke = Math.log($("#qty_ndd").val() / $("#qty_ndd2").val());
              qty_ke = pre_ke / qty_x;
              $("#qty_ke").text(qty_ke);

              qty_t12 = 0.693 / qty_ke;
              $("#qty_t12").text(qty_t12);

              realnddexp = Math.pow(Math.E, ((-qty_ke)));
              //vdexp = e^-kt where t = T1 - inftime
              qty_realndd = $("#qty_ndd").val() / realnddexp;
              //qty_realndd = Cmax
              $("#qty_realndd").text(qty_realndd);

              realndd2exp = Math.pow(Math.E, 0.5 * (-qty_ke));
              //realndd2exp = e^-ke(Tau - t2) where Tau is time between dose and t2 is time to trough meas
              qty_realndd2 = $("#qty_ndd2").val() * realndd2exp;
              //qty_realndd2 = Cmin
              $("#qty_realndd2").text(qty_realndd2);

              qty_aucinf = (qty_realndd + qty_realndd2) * $("#qty_tgt").val() / 2;
              $("#qty_aucinf").text(qty_aucinf);

              qty_aucelim = (qty_realndd - qty_realndd2) / qty_ke;
              $("#qty_aucelim").text(qty_aucelim);
                           
              qty_auc24h = ((qty_aucinf + qty_aucelim) * 24 / $("#qty_kcl").val());
              $("#qty_auc24h").text(qty_auc24h);
              

              qty_TL = $("#qty_lht").val() * (24 / $("#qty_kcl").val());
              $("#qty_TL").text(qty_TL);

              qty_TL400 = Math.round(400 * qty_TL / qty_auc24h);
              //qty_TL400 tổng liều để đạt được AUC 400 trong ngày
              $("#qty_TL400").text(qty_TL400);

              qty_TL600 = Math.round(600 * qty_TL / qty_auc24h);
              //qty_TL600 tổng liều để đạt được AUC 400 trong ngày
              $("#qty_TL600").text(qty_TL600);

              var text;
              if (qty_auc24h < 400 || qty_auc24h > 600) {
                  text = "Tổng liều AUC 24 giờ nằm ngoài khoảng khuyến cáo 400 - 600! Cân nhắc hiệu chỉnh liều";
              } else {
                  text = "Tổng liều AUC 24 giờ nằm trong khoảng khuyến cáo 400 - 600";
              }
              document.getElementById("demo").innerHTML = text;

              var txtcolor;
              if (text == "Tổng liều AUC 24 giờ nằm ngoài khoảng khuyến cáo 400 - 600! Cân nhắc hiệu chỉnh liều") {
                  document.getElementById("demo").style.color = '#FF0000';
              } else {
                  document.getElementById("demo").style.color = '#006400';
              }

          }

      //# sourceURL=pen.js  
