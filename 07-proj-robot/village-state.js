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
        return new VillageState(this.place, parcels, this.village);
    }
}