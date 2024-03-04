// html dan kerakli elementlarni olibmkelish
let form = document.querySelector(".form");
let inputs = form.querySelectorAll("input");

// hozirgi kun oy va yillarni olish
let now = new Date();
let nowDay = now.getDate();
let nowMonth = now.getMonth() + 1;
let nowYear = now.getFullYear();
let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let submit, sM, sD, sY;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // kabisa yili uchun tekshiruv
  monthArr[1] = inputs[2].value % 4 == 0 ? 29 : 28;

  inputs.forEach((item) => {
    // input lar bo'sh emasligini tekshirish
    if (
      new Date(`${inputs[2].value}/${inputs[1].value}/${inputs[0].value}`) >
      Date.now()
    ) {
      item.style = `border-color:red`;
      item.parentElement.style = `color: red;`;
      item.nextElementSibling.textContent = "This is faild";
      submit = false;
    } else {
      item.style = ``;
      item.parentElement.style = ``;
      item.nextElementSibling.textContent = "";
      submit = true;
    }
    if (inputs[0].value > 31 || inputs[0].value <= 0) {
      // kiritilgan oyda kiritilgan kun borligini tekshrish
      inputs[0].style = `border-color:red`;
      inputs[0].parentElement.style = `color: red;`;
      inputs[0].nextElementSibling.textContent = "Must be valid";
      sD = false;
    } else {
      inputs[0].style = ``;
      inputs[0].parentElement.style = ``;
      inputs[0].nextElementSibling.textContent = "";
      sD = true;
    }
    if (inputs[1].value > 12 || inputs[1].value <= 0) {
      inputs[1].style = `border-color:red`;
      inputs[1].parentElement.style = `color: red;`;
      inputs[1].nextElementSibling.textContent = "Must be valid";
      sM = false;
    } else {
      inputs[1].style = ``;
      inputs[1].parentElement.style = ``;
      inputs[1].nextElementSibling.textContent = "";
      sM = true;
    }
    if (inputs[2].value <= 0) {
      inputs[2].style = `border-color:red`;
      inputs[2].parentElement.style = `color: red;`;
      inputs[2].nextElementSibling.textContent = "Must be valid";
      sY = false;
    } else {
      inputs[2].style = ``;
      inputs[2].parentElement.style = ``;
      inputs[2].nextElementSibling.textContent = "";
      sY = true;
    }
  });
  // barcha qiymatlar to'g'ri kiritlganan so'ng
  if (submit && sY && sD && sM) {
    // o'zgaruvchilarga kiritilgan oy kun yillar qiymatlarini olib kelish

    let resYear = nowYear - inputs[2].value;
    let resMonth = nowMonth - inputs[1].value;
    let resDay = nowDay - inputs[0].value;

    // resDay agarda 0 dan kichik bo'lsa resMonth dan 1 ta ayirib resDay ning qiymatini monthArr dagi kiritilgan month tartibidagi oy kunlaridan resDay ni ayirib tenglash uchun

    if (resDay < 0) {
      resDay = monthArr[inputs[1].value - 1] + resDay;
      resMonth--;
    }

    // resMonth agarda 0 dan kichik bo'lsa resYear dan 1 ni ayirib resMonth qiymatini 12(1yildagi oylar soni)-dan kiritilgan month ni aiyirish
    if (resMonth < 0) {
      resMonth = 12 + resMonth;
      resYear--;
    }

    // hosil bo'lgan natijalarni foydalanuvhciga chiqarish
    document.querySelector("#yearT").textContent = resYear;
    document.querySelector("#monthT").textContent = resMonth;
    document.querySelector("#dayT").textContent = resDay;
  }
});
