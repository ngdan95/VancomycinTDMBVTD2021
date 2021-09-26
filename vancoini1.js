// JavaScript source code
$('input[type=radio]').click(function () {
    if (this.previous) {
        this.checked = false;
    }
    this.previous = this.checked;
});

function calculateTotal() {
    IBW1 = 50 + 0.9 * ($('#qty_height').val() - 152);
    //>152cm Nam
    IBW2 = 45.5 + 0.9 * ($('#qty_height').val() - 152);
    //>152cm Nữ
    IBW3 = 50 - 0.3 * (152 - $('#qty_height').val());
    //<152cm Nam
    IBW4 = 45.5 - 0.3 * (152 - $('#qty_height').val());
    //<152cm Nữ
    var IBW
    if ($("#qty_height").val() > 152 && document.getElementById("Male").checked) {
        IBW = IBW1;
    }
    else if ($("#qty_height").val() > 152 && document.getElementById("Female").checked) {
        IBW = IBW2;
    }
    else if ($("#qty_height").val() < 152 && document.getElementById("Male").checked) {
        IBW = IBW3;
    }
    else if ($("#qty_height").val() < 152 && document.getElementById("Female").checked) {
        IBW = IBW4;
    }
    document.getElementById("qty_ibw").innerHTML = IBW;

    ABW = IBW + 0.4 * ($('#qty_weight').val() - IBW);        

    CrCl1 = (140 - $("#qty_age").val()) * $("#qty_weight").val() / ($('#qty_creatinine').val() * 0.815);
    //CrCl1 không béo phì nam
    CrCl2 = (140 - $("#qty_age").val()) * $("#qty_weight").val() * 0.85 / ($('#qty_creatinine').val() * 0.815);
    //CrCl2 không béo phì nữ
    CrCl3 = (140 - $("#qty_age").val()) * ABW / ($('#qty_creatinine').val() * 0.815);
    //CrCl3 béo phì nam
    CrCl4 = (140 - $("#qty_age").val()) * ABW * 0.85 / ($('#qty_creatinine').val() * 0.815);
    //CrCl4 béo phì nữ
               
    var qty_CrCl;
    if (document.getElementById("khongbeophi").checked && document.getElementById("Male").checked) {
        qty_CrCl = CrCl1;
    }
    else if (document.getElementById("khongbeophi").checked && document.getElementById("Female").checked) {
        qty_CrCl = CrCl2;
    }
    else if (document.getElementById("beophi").checked && document.getElementById("Male").checked) {
        qty_CrCl = CrCl3;
    }
    else if (document.getElementById("beophi").checked && document.getElementById("Female").checked) {
        qty_CrCl = CrCl4;
    }
    document.getElementById("qty_CrCl").innerHTML = qty_CrCl;
   
           
    vd1 = 0.7 * $("#qty_weight").val();
    //CrCl > = 60 
    vd2 = 0.89 * $("#qty_weight").val();
    //CrCl <=60 >=10
    var qty_vd
    if (qty_CrCl > 60) {
        qty_vd = vd1;
    }
    else {
        qty_vd = vd2;
    }
    document.getElementById("qty_vd").innerHTML = qty_vd;
    
    ClVanco1 = (0.689 * qty_CrCl + 3.66) * 0.06;
    //ClVanco1 ClVanco không béo phì
    ClVanco2 = 9.656 - (0.078 * ($("#qty_age").val())) - 2.009 * (($("#qty_aucg").val()) / 88.42) + 1.09 + 0.04 * (Math.pow($("#qty_weight").val(), 0.75));
    //ClVanco2 ClVanco béo phì nam
    ClVanco3 = 9.656 - (0.078 * ($("#qty_age").val())) - 2.009 * (($("#qty_aucg").val()) / 88.42) + 0.04 * (Math.pow($("#qty_weight").val(), 0.75));
    //ClVanco3 ClVanco béo phì nữ (không có + 1.09)
    var qty_clvanco;
    if (document.getElementById("beophi").checked && document.getElementById("Male").checked) {
        qty_clvanco = ClVanco2;
    }
    else if (document.getElementById("beophi").checked && document.getElementById("Female").checked) {
        qty_clvanco = ClVanco3;
    }
    else if (document.getElementById("khongbeophi").checked) {
        qty_clvanco = ClVanco1;
    }
    document.getElementById("qty_clvanco").innerHTML = qty_clvanco;

    qty_ke = qty_clvanco / qty_vd;    
    document.getElementById("qty_ke").innerHTML = qty_ke;

    qty_t12 = 0.693 / qty_ke;
    document.getElementById("qty_t12").innerHTML = qty_t12;

    qty_tl = Math.round(qty_clvanco * $("#qty_aucg").val());
    document.getElementById("qty_tl").innerHTML = qty_tl;

    qty_lt = 250 * (Math.ceil($("#qty_lieutai").val() * $("#qty_weight").val() / 250));
    
    document.getElementById("qty_lt").innerHTML = qty_lt;

    qty_tgt = qty_lt / 10 / 60;
    document.getElementById("qty_tgt").innerHTML = qty_tgt;

    //Dosing regime below

    //CrCl > = 90
    qty_lieu1a = 250 * (Math.floor(qty_tl / 3 / 250));
    qty_tgt1a = Math.round(qty_lieu1a / 10 / 60);
    qty_kcl1a = 8;
    qty_lieu2a = 250 * (Math.ceil(qty_tl / 3 / 250));
    qty_tgt2a = Math.round(qty_lieu2a / 10 / 60);
    qty_kcl2a = 8;
    qty_lieu3a = 250 * (Math.floor(qty_tl / 2 / 250));
    qty_tgt3a = Math.round(qty_lieu3a / 10 / 60);
    qty_kcl3a = 12;
    qty_lieu4a = 250 * (Math.ceil(qty_tl / 2 / 250));
    qty_tgt4a = Math.round(qty_lieu4a / 10 / 60);
    qty_kcl4a = 12;

    //CrCl 30 - 90
    qty_lieu1b = 250 * (Math.floor(qty_tl / 2 / 250));
    qty_tgt1b = Math.round(qty_lieu1b / 10 / 60);
    qty_kcl1b = 12;
    qty_lieu2b = 250 * (Math.ceil(qty_tl / 2 / 250));
    qty_tgt2b = Math.round(qty_lieu2b / 10 / 60);
    qty_kcl2b = 12;
    qty_lieu3b = 250 * (Math.floor(qty_tl / 250));
    qty_tgt3b = Math.round(qty_lieu3b / 10 / 60);
    qty_kcl3b = 24;
    qty_lieu4b = 250 * (Math.ceil(qty_tl / 250));
    qty_tgt4b = Math.round(qty_lieu4b / 10 / 60);
    qty_kcl4b = 24;

    //CrCl 10-30
    qty_lieu1c = 250 * (Math.floor(qty_tl / 250));
    qty_tgt1c = Math.round(qty_lieu1c / 10 / 60);
    qty_kcl1c = 24;
    qty_lieu2c = 250 * (Math.ceil(qty_tl / 2 / 250));
    qty_tgt2c = Math.round(qty_lieu2c / 10 / 60);
    qty_kcl2c = 24;
    qty_lieu3c = 250 * (Math.floor(15 & $("#qty_weight").val() / 250));
    qty_tgt3c = Math.round(qty_lieu3c / 10 / 60);
    qty_kcl3c = 48;
    qty_lieu4c = 250 * (Math.ceil(15 & $("#qty_weight").val() / 250));
    qty_tgt4c = Math.round(qty_lieu4c / 10 / 60);
    qty_kcl4c = 48;

    //below lieu 1
    let qty_lieu1
    if (qty_CrCl >= 90) {
        qty_lieu1 = qty_lieu1a;
    }    
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_lieu1 = qty_lieu1b;
    }    
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_lieu1 = qty_lieu1c;
    }
    document.getElementById('qty_lieu1').innerHTML = qty_lieu1;

    let qty_tgt1
    if (qty_CrCl >= 90) {
        qty_tgt1 = qty_tgt1a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_tgt1 = qty_tgt1b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_tgt1 = qty_tgt1c;
    }
    document.getElementById('qty_tgt1').innerHTML = qty_tgt1;

    let qty_kcl1
    if(qty_CrCl >= 90) {
        qty_kcl1 = qty_kcl1a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_kcl1 = qty_kcl1b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_kcl1 = qty_kcl1c;
    }
    document.getElementById('qty_kcl1').innerHTML = qty_kcl1;

    //below lieu 2
    let qty_lieu2
    if (qty_CrCl >= 90) {
        qty_lieu2 = qty_lieu2a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_lieu2 = qty_lieu2b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_lieu2 = qty_lieu2c;
    }
    document.getElementById('qty_lieu2').innerHTML = qty_lieu2;

    let qty_tgt2
    if (qty_CrCl >= 90) {
        qty_tgt2 = qty_tgt2a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_tgt2 = qty_tgt2b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_tgt2 = qty_tgt2c;
    }    
    document.getElementById('qty_tgt2').innerHTML = qty_tgt2;

    let qty_kcl2
    if (qty_CrCl >= 90) {
        qty_kcl2 = qty_kcl2a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_kcl2 = qty_kcl2b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_kcl2 = qty_kcl2c;
    }
    document.getElementById('qty_kcl2').innerHTML = qty_kcl2;

    //below lieu 3
    let qty_lieu3
    if (qty_CrCl >= 90) {
        qty_lieu3 = qty_lieu3a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_lieu3 = qty_lieu3b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_lieu3 = qty_lieu3c;
    }
    document.getElementById('qty_lieu3').innerHTML = qty_lieu3;

    let qty_tgt3
    if (qty_CrCl >= 90) {
        qty_tgt3 = qty_tgt3a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_tgt3 = qty_tgt3b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_tgt3 = qty_tgt3c;
    }    
    document.getElementById('qty_tgt3').innerHTML = qty_tgt3;

    let qty_kcl3
    if (qty_CrCl >= 90) {
        qty_kcl3 = qty_kcl3a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_kcl3 = qty_kcl3b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_kcl3 = qty_kcl3c;
    }
    document.getElementById('qty_kcl3').innerHTML = qty_kcl3;

    //below lieu 4
    let qty_lieu4
    if (qty_CrCl >= 90) {
        qty_lieu4 = qty_lieu4a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_lieu4 = qty_lieu4b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_lieu4 = qty_lieu4c;
    }
    document.getElementById('qty_lieu4').innerHTML = qty_lieu4;

    let qty_tgt4
    if (qty_CrCl >= 90) {
        qty_tgt4 = qty_tgt4a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_tgt4 = qty_tgt4b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_tgt4 = qty_tgt4c;
    }  
    document.getElementById('qty_tgt4').innerHTML = qty_tgt4;

    let qty_kcl4
    if (qty_CrCl >= 90) {
        qty_kcl4 = qty_kcl4a;
    }
    else if (qty_CrCl < 90 && qty_CrCl >= 30) {
        qty_kcl4 = qty_kcl4b;
    }
    else if (qty_CrCl < 30 && qty_CrCl >= 10) {
        qty_kcl4 = qty_kcl4c;
    }
    document.getElementById('qty_kcl4').innerHTML = qty_kcl4;

    //Predicted AUC, Cmin, Cmax below
    qty_auc1 = Math.round((qty_lieu1 * 24 / qty_kcl1) / qty_clvanco);
    document.getElementById('qty_auc1').innerHTML = qty_auc1;

    qty_auc2 = Math.round((qty_lieu2 * 24 / qty_kcl2) / qty_clvanco);
    document.getElementById('qty_auc2').innerHTML = qty_auc2;

    qty_auc3 = Math.round((qty_lieu3 * 24 / qty_kcl3) / qty_clvanco);
    document.getElementById('qty_auc3').innerHTML = qty_auc3;

    qty_auc4 = Math.round((qty_lieu4 * 24 / qty_kcl3) / qty_clvanco);
    document.getElementById('qty_auc4').innerHTML = qty_auc4;
}