import { Card } from '../../classes/card.js';

export class CardComponent extends Card
{
    #tag;
    #callback;

    constructor(tag,src)
    {
        super(src);
        this.#tag = tag;
        this.render();
    }

    onClick(callback)
    {
        this.#callback = callback;
        document.querySelector(`#${this.#tag}`).addEventListener('click',this.#callback);
    }

    getComponent()
    {
        return document.querySelector(`#${this.#tag} .card`);
    }

    toggleFlip()
    {
        this.flip();

        const sleep = async (time)=>{
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    res();
                },time);
            });
        }

        const elemento = document.querySelector(`#${this.#tag}`);
        const carta = document.querySelector(`#${this.#tag} .card`);
        const fundo = document.querySelector(`#${this.#tag} .card .fundo`);

        if(!this.isFacingBack())
        {
            const audio = new Audio(Card.PATH + 'cardFlip.wav');
            audio.play();
            (async()=>{

                elemento.removeEventListener('click',this.#callback);

                carta.classList.remove('anim90');
                await sleep(1);
                carta.classList.add('anim90');
                await sleep(300);
                carta.style.transform = `rotateY(90deg)`;
                carta.classList.remove('anim90');
                fundo.style.background = `url(${this.getSource()})`;
                fundo.style.backgroundSize = `cover`;
                fundo.style.backgroundPosition = `20%`;
                fundo.style.transform = `rotateY(180deg)`;
                carta.classList.remove('anim180');
                await sleep(1);
                carta.classList.add('anim180');
                await sleep(300);
                carta.style.transform = `rotateY(180deg)`;
                carta.classList.remove('anim180');
            })()   
        }
        else
        {
            (async()=>{

                carta.classList.remove('anim180Rev');
                await sleep(1);
                carta.classList.add('anim180Rev');
                await sleep(300);
                carta.style.transform = `rotateY(90deg)`;
                carta.classList.remove('anim180Rev');

                fundo.style.background = `url(${Card.PATH + 'card-back.webp'})`;
                fundo.style.backgroundSize = `cover`;
                fundo.style.backgroundPosition = `20%`;
                fundo.style.transform = `rotateY(0deg)`;
                
                carta.classList.remove('anim90Rev');
                await sleep(1);
                carta.classList.add('anim90Rev');
                await sleep(300);
                carta.style.transform = `rotateY(0deg)`;
                carta.classList.remove('anim90Rev');

                elemento.addEventListener('click',this.#callback);
            })()  
        }
    }

    render()
    {
        document.querySelector(`#${this.#tag}`).innerHTML = `
            <label for="${this.#tag}-input">
                <div class="card">
                    <div class="fundo">
                    </div>
                </div>
            </label>
        `;

    }
}