export class Card
{
    static PATH = '../assets/';
    static shouldFlip = true;

    #source;
    #isFacingBack;
    constructor(src)
    {
        this.#source = src;
        this.#isFacingBack = true;
    }

    isFacingBack()
    {
        return this.#isFacingBack;
    }

    getSource()
    {
        return this.#source;
    }

    equals(card)
    {
        return this.#source === card.getSource();
    }

    flip()
    {
        if(Card.shouldFlip)
        {
            this.#isFacingBack = !this.#isFacingBack;
        }
    }

    toString()
    {
        return `Card: ${this.#source}`;
    }
}