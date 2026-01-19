//MOCKS PRECISAM VIR ANTES DOS IMPORTS
jest.mock("./getCoordinatesFromCep", () => ({
  getCoordinatesFromCep: jest.fn(),
}));

jest.mock("./calculateDistanceKm", () => ({
  calculateDistanceKm: jest.fn(),
}));

import { calcShipping } from "./calc-shipping"
import { calculateDistanceKm } from "./calculateDistanceKm"
import { getCoordinatesFromCep } from "./getCoordinatesFromCep"

describe('Calc shipping', () => {
    //limpa os mocks antigos
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return correct PAC and SEDEX for distance between 51 and 150 km", async() => {
            // 1️⃣ Mock das coordenadas (não importa quais)
            (getCoordinatesFromCep as jest.Mock)
              .mockResolvedValueOnce({ lat: 0, lng: 0 }) // CD
              .mockResolvedValueOnce({ lat: 1, lng: 1 }); // usuário

            //mocka o km
            (calculateDistanceKm as jest.Mock).mockReturnValue(135)

            const result = await calcShipping('13426-563')

            expect(result).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  shippingMethod: "PAC",
                  shippingEta: 5,
                  shippingValue: 6,
                }),
                expect.objectContaining({
                  shippingMethod: "SEDEX",
                  shippingEta: 3,
                  shippingValue: 9,
                }),
              ])
            );
            
     
    })
})