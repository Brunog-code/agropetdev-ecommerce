import { getCoordinatesFromCep } from './getCoordinatesFromCep'

describe('Get coordinates', () => {
    //limpa mocks antes de cada teste
    beforeEach(() => {
        fetchMock.resetMocks()
    })


    it('should get coordinates from zipcode received', async() => {
        //resposta do mock
        const mockResponse = {
        cep: "12345678",
        address_type: "Rua",
        address_name: "Exemplo",
        address: "Rua Exemplo, 123",
        state: "SP",
        district: "Centro",
        lat: "12.3456",
        lng: "65.4321",
        city: "São Paulo",
        city_ibge: "3550308",
        ddd: "11",
        };

        //mockando a resposta da API
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

        //chama funcao, o mock vai interceptar
        const coordinates = await getCoordinatesFromCep('13426-563')

        expect(coordinates).toEqual({
        lat: 12.3456,
        lng: 65.4321,
        })
    })

    it('should throw an error if cep not found ', async() => {
        fetchMock.mockResponseOnce(JSON.stringify(null))

        const coordenates =  getCoordinatesFromCep('00000-000')
        await expect(coordenates).rejects.toThrow('CEP não encontrado')
    })
})