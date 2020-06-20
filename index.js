let isDeleting = false;
let isFlipped = false;
const card_container = document.getElementsByClassName("card-container")[0];
const flip_button = document.getElementsByClassName("flip-button")[0];
function onChange(e) {
  const val = e.target.value,
    name = e.target.name;

  switch (name) {
    case "club":
      e.target.value = val.slice(0, 19);
      break;
    case "cvv":
      break;
    case "card-number":
      (val.length === 4 || val.length === 9 || val.length === 14) &&
        isDeleting === false &&
        (e.target.value += " ");
      cardTypeChanger(val[0]);
      break;
    case "valid-date":
      if (val.length === 2 && isDeleting === false) {
        e.target.value = val + "/";
      }
      break;
    case "cardholder-name":
      e.target.value = val.slice(0, 36).toUpperCase();
      break;
    default:
      return false;
  }
}

function cardTypeChanger(num) {
  const visa = "https://image.flaticon.com/icons/svg/349/349221.svg";
  const americanex = "https://image.flaticon.com/icons/svg/349/349228.svg";
  const master = "https://image.flaticon.com/icons/svg/196/196561.svg";
  const cardLogoElement = document.querySelector(".card-type-logo");

  switch (num) {
    case "3":
      cardLogoElement.style.backgroundImage = "url(" + americanex + ")";
      break;
    case "4":
      cardLogoElement.style.backgroundImage = "url('" + visa + "')";
      break;
    case "5":
      cardLogoElement.style.backgroundImage = "url('" + master + "')";
      break;
    default:
      cardLogoElement.style.backgroundImage = "url('')";
  }
}

function handleKeyPress(event) {
  if (event.keyCode == 8) {
    isDeleting = true;
  } else {
    isDeleting = false;
  }
}

const inputs = document.getElementsByTagName("input");

for (let el of inputs) {
  el.addEventListener("input", onChange);
}

const cardNum = document.getElementsByName("card-number")[0];
cardNum.addEventListener("keydown", handleKeyPress);
const cardDate = document.getElementsByName("valid-date")[0];
cardDate.addEventListener("keydown", handleKeyPress);

function flipper() {
  const card_num = document.getElementsByName("card-number")[0];
  card_num.classList.toggle("cvv");
  card_num.classList.contains("cvv")
    ? (card_num.maxLength = "3")
    : (card_num.maxLength = "19");
  card_num.classList.contains("cvv")
    ? (card_num.placeholder = "CVV")
    : (card_num.placeholder = "1234 5678 0123 4567");
  card_container.classList.toggle("flipped");
  isFlipped = !isFlipped;
}

flip_button.addEventListener("click", flipper);
