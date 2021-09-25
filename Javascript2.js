// JavaScript source code
function calculateTest2() {

    qty_x = $("#qty_kcl").val() - $("#qty_tgt").val() - 1.5;
    //x = t2-t1
    $("#qty_x").text(qty_x);

    pre_ke = Math.log($("#qty_ndd").val() / $("#qty_ndd2").val());
    qty_ke = pre_ke / qty_x;
    $("#qty_ke").text(qty_ke);

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

    expvd = Math.pow(Math.E, -qty_ke * $("#qty_tgt").val());
    //expvd = e^-kt where t is infusion time                     
    Dose = $("#qty_lht").val() * (1 - expvd);
    Conc0 = $("#qty_tgt").val() * qty_ke * (qty_realndd - (qty_realndd2 * expvd));
    qty_vd = Dose / Conc0;
    $("#qty_vd").text(qty_vd);

    CL = qty_vd * qty_ke;
    // CL = Vd x ke             

    exptau = Math.pow(Math.E, -qty_ke * ($("#qty_kcl2").val()));
    //exptau = e^-ktau
    Cmax2div = CL * $("#qty_tgt2").val() * (1 - exptau);
    expCmax2 = Math.pow(Math.E, -qty_ke * $("#qty_tgt2").val());
    qty_Cmax2 = ($("#qty_lhc").val() * (1 - expCmax2)) / Cmax2div;
    $("#qty_Cmax2").text(qty_Cmax2);


    Cmin2pw = Math.pow(Math.E, (($("#qty_kcl2").val() - $("#qty_tgt2").val()) * (-qty_ke)));
    //Cmin2pw = e^ (-ke * (Tau - t)) where t is infusion time
    qty_Cmin2 = qty_Cmax2 * Cmin2pw;
    $("#qty_Cmin2").text(qty_Cmin2);

    qty_aucinf2 = (qty_Cmax2 + qty_Cmin2) * $("#qty_tgt2").val() / 2;

    qty_aucelim2 = (qty_Cmax2 - qty_Cmin2) / qty_ke;

    qty_auc24h2 = ((qty_aucinf2 + qty_aucelim2) * 24 / $("#qty_kcl2").val());
    //qty_TL600 tổng liều để đạt được AUC 400 trong ngày
    $("#qty_auc24h2").text(qty_auc24h2);
}