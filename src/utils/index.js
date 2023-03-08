export function changeIndexToNepali(index) {
  let nepaliIndex = "";
  if (index !== 0 && !index) {
    return;
  }
  if (typeof index !== "string") {
    index = index.toString();
  }

  for (let i = 0; i < index.length; i += 1) {
    switch (index[i]) {
      case "0":
        nepaliIndex += "०";
        break;
      case "1":
        nepaliIndex += "१";
        break;
      case "2":
        nepaliIndex += "२";
        break;
      case "3":
        nepaliIndex += "३";
        break;
      case "4":
        nepaliIndex += "४";
        break;
      case "5":
        nepaliIndex += "५";
        break;
      case "6":
        nepaliIndex += "६";
        break;
      case "7":
        nepaliIndex += "७";
        break;
      case "8":
        nepaliIndex += "८";
        break;
      case "9":
        nepaliIndex += "९";
        break;
      default:
        nepaliIndex += index[i];
    }
  }
  return nepaliIndex;
}
export function changeNepaliIndexToEnglish(index) {
  let nepaliIndex = "";
  if (index !== 0 && !index) {
    return;
  }
  if (typeof index !== "string") {
    index = index.toString();
  }

  for (let i = 0; i < index.length; i += 1) {
    switch (index[i]) {
      case "०":
        nepaliIndex += "0";
        break;
      case "१":
        nepaliIndex += "1";
        break;
      case "२":
        nepaliIndex += "2";
        break;
      case "३":
        nepaliIndex += "3";
        break;
      case "४":
        nepaliIndex += "4";
        break;
      case "५":
        nepaliIndex += "5";
        break;
      case "६":
        nepaliIndex += "6";
        break;
      case "७":
        nepaliIndex += "7";
        break;
      case "८":
        nepaliIndex += "8";
        break;
      case "९":
        nepaliIndex += "9";
        break;
      default:
        nepaliIndex += index[i];
    }
  }
  return nepaliIndex;
}
