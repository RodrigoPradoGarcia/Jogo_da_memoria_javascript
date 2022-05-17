import {Card} from '../../classes/card.js';
import { CardComponent } from "./CardComponent.js";
import {Deck} from '../../classes/Deck.js';

export class DeckComponent extends Deck
{
    #tag;
    #cardComponents;
    #flippedCards;
    #score;
    #moves;

    constructor(tag)
    {
       super();
       this.#tag = tag;
       this.#cardComponents = [];
       this.#flippedCards = [];
       this.#score = 0;
       this.#moves = 0;
       this.render();
    }

    cardMatches()
    {
        const sleep = async(t)=>{
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    res()
                },t);
            });
        }

        (async()=>{

            if(this.#flippedCards.length === 2)
            {
                this.#moves++;
                document.querySelector(`#movimentos`).innerHTML = this.#moves;
                document.querySelector(`#totMoves`).innerHTML = this.#moves;
                await sleep(1500);
                
                if(this.#flippedCards[0].getSource() === this.#flippedCards[1].getSource())
                {
                    this.#flippedCards[0].getComponent().classList.add('pulse');
                    this.#flippedCards[1].getComponent().classList.add('pulse');

                    this.#flippedCards = []; 
                    this.#score += 1;  
                    if(this.#score === this.#cardComponents.length/2)
                    {
                        const audio = new Audio(Card.PATH + 'vitoria.mp3');
                        audio.play();
                        document.querySelector(`#vict`).classList.add('victAnim');
                        document.querySelector(`#victTitle`).classList.add('victAnim2Delay');
                        document.querySelector(`#victMoves`).classList.add('victAnim4Delay');
                        document.querySelector(`#victBtn`).classList.add('victAnim6Delay');
                    }
                    else
                    {
                        const audio = new Audio(Card.PATH + 'success.wav');
                        audio.play();
                    }
                }
                else
                {
                    this.#flippedCards[0].toggleFlip();
                    this.#flippedCards[1].toggleFlip();
                    await sleep(300);
                    this.#flippedCards = [];
                    const audio = new Audio(Card.PATH + 'errado.wav');
                    audio.play();
                }
            }
            
        })()
    }

    render()
    {
        let divs = ``;
        this.getCards().forEach((card,idx)=>{
            divs += `
                <div id="${this.#tag}-card-${idx}">
                </div>
            `;
        });

        document.querySelector(`#${this.#tag}`).innerHTML = `
            <div class="deck-wrapper">
                <h1 class="moves">Movimentos: <span id="movimentos">${this.#moves.toString()}</span></h1>
                <div class="deck">
                    ${divs}
                </div>
            </div>
        `;

        const cartas = ``;
        this.getCards().forEach((card,idx)=>{
            this.#cardComponents.push(new CardComponent(`${this.#tag}-card-${idx}`,card.getSource()));
            this.#cardComponents[idx].onClick(()=>{
                if(this.#flippedCards.length < 2)
                {
                    this.#cardComponents[idx].toggleFlip();
                    this.#flippedCards.push(this.#cardComponents[idx]);
                    this.cardMatches();
                }
            });
        });

    }
}