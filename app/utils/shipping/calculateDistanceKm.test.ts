import { calculateDistanceKm } from "./calculateDistanceKm"

describe('Calculate Distance KM', () => {
    it('should return the distance between two points', () => {
        const distance = calculateDistanceKm(
            -23.5505,
            -46.6333,
            -22.7250,
            -47.6476
        )
        expect(distance).toBeCloseTo(138.5, 1)
    })

    
})

