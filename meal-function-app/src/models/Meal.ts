
export class Meal {

    constructor(
        public readonly sub: string,
        public readonly name: string,
        public readonly kcal: number,
        public readonly protein: number,
        public readonly fat: number,
        public readonly carbohydrate: number,
    ) {}

}
