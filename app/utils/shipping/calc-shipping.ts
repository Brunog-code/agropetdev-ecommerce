import { calculateDistanceKm } from "./calculateDistanceKm";
import { getCoordinatesFromCep } from "./getCoordinatesFromCep";

const CD_CEP = "18086-380"; //CEP fixo do CD fictício

export async function calcShipping(userCep: string) {
  //pegar lat e long
  const [cdCoords, userCoords] = await Promise.all([
    getCoordinatesFromCep(CD_CEP),
    getCoordinatesFromCep(userCep),
  ]);

  //pega km
  const km = calculateDistanceKm(
    cdCoords.lat,
    cdCoords.lng,
    userCoords.lat,
    userCoords.lng
  );

  const dataShipping = [
    {
      shippingMethod: "PAC",
      shippingEta: null,
      shippingValue: 0,
      shippingOrigin: CD_CEP,
      shippingDestiy: userCep,
    },
    {
      shippingMethod: "SEDEX",
      shippingEta: null,
      shippingValue: 0,
      shippingOrigin: CD_CEP,
      shippingDestiy: userCep,
    },
  ];

  //devolve value e prazo
  switch (true) {
    case km >= 0 && km <= 15:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 2, shippingValue: 0 }
          : { ...item, shippingEta: 1, shippingValue: 3 }
      );

    case km >= 16 && km <= 50:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 3, shippingValue: 4 }
          : { ...item, shippingEta: 2, shippingValue: 6 }
      );

    case km >= 51 && km <= 150:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 5, shippingValue: 6 }
          : { ...item, shippingEta: 3, shippingValue: 9 }
      );

    case km >= 151 && km <= 250:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 7, shippingValue: 10 }
          : { ...item, shippingEta: 4, shippingValue: 14 }
      );

    case km >= 251 && km <= 350:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 9, shippingValue: 13 }
          : { ...item, shippingEta: 5, shippingValue: 17 }
      );

    case km >= 351 && km <= 450:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 11, shippingValue: 16 }
          : { ...item, shippingEta: 6, shippingValue: 20 }
      );

    case km >= 451 && km <= 550:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 13, shippingValue: 18 }
          : { ...item, shippingEta: 7, shippingValue: 23 }
      );

    default:
      return dataShipping.map((item) =>
        item.shippingMethod === "PAC"
          ? { ...item, shippingEta: 15, shippingValue: 22 }
          : { ...item, shippingEta: 9, shippingValue: 28 }
      );
  }
}
