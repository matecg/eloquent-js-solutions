import { getRandomElement, STARTING_PLACE } from "./helpers.js";

export default class VillageState {
    constructor(place, parcels, graph) {
        this.place = place;
        this.parcels = parcels;
        this.village = graph;
    }

    move(to) {
        if (!this.village[this.place].includes(to)) return this;

        let parcels = this.parcels
            .map (p => {
                if (p.place !== this.place) return p;
                return {place: to, address: p.address}
            })
            .filter(p => p.place !== p.address);
        return new VillageState(to, parcels, this.village);
    }

    static createRandom( village, parcelCount = 5) {
        const parcels = []
        for (let i = 0; i < parcelCount; i++) {
            const places = Object.keys(village)
            const address = getRandomElement(places);
            let place;
            do {
                place = getRandomElement(places);
            } while (place === address);
            parcels.push({address, place});
        }
        return new VillageState(STARTING_PLACE, parcels, village);
    }
}