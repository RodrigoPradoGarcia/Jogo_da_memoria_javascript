import { Card } from './card.js';

export class Deck
{
    #cards;
    constructor()
    {
        this.#cards = [];
        let images = [];
        
        if(localStorage.getItem('tamanho') === 'grande')
        {

            images = [
                'aerith.png',
                'alphinaud.png',
                'ashe.png',
                'bartz.png',
                'cloud.png',
                'lightning.png',
                'mog.png',
                'noctis.png',
                'sephirot.png',
                'squall.png',
                'terra.png',
                'vaan.png',
                'vivi.png',
                'wol.png',
                'yuna.png',
                'zidane.png'
            ];
        }
        else if(localStorage.getItem('tamanho') === 'medio')
        {
            images = [
                'aerith.png',
                'alphinaud.png',
                'ashe.png',
                'bartz.png',
                'cloud.png',
                'lightning.png',
                'mog.png',
                'noctis.png',
                'sephirot.png',
                'squall.png',
                'terra.png',
                'vaan.png'
            ];
        }
        else
        {
            images = [
                'aerith.png',
                'alphinaud.png',
                'ashe.png',
                'bartz.png',
                'cloud.png',
                'lightning.png',
                'mog.png',
                'noctis.png'
            ];
        }

        images.forEach((image)=>{
            this.#cards.push(new Card(Card.PATH + image));
        });

        images.forEach((image)=>{
            this.#cards.push(new Card(Card.PATH + image));
        });

        this.shuffle();
    }

    shuffle()
    {
        for(let i=0;i<this.#cards.length;i++)
        {
            const index = Math.floor( Math.random()*(this.#cards.length-1-i+1) + i );
            const troca = this.#cards[index];
            this.#cards[index] = this.#cards[i];
            this.#cards[i] = troca;
        }
    }

    getCards()
    {
        return this.#cards;
    }

    toString()
    {
        let c = ``;
        this.#cards.forEach((card)=>{
            c += `${card.toString()}
        `;
        });

        return`Deck:
    cards:
    [
        ${c}
    ]
        `;
    }
}