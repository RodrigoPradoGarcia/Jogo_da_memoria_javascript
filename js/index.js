import { DeckComponent } from '../js/components/Card/DeckComponent.js';
import { Card } from './classes/card.js';
import { CardComponent } from './components/Card/CardComponent.js';

const deck = new DeckComponent('deck');

const configBtn = document.querySelector(`#configBtn`);
configBtn.addEventListener('click',(e)=>{
    const radio1 = document.querySelector(`#radio1`);
    const radio2 = document.querySelector(`#radio2`);
    const radio3 = document.querySelector(`#radio3`);
    if(radio1.checked)
    {
        localStorage.setItem('tamanho','pequeno');
    }
    else if(radio2.checked)
    {
        localStorage.setItem('tamanho','medio');
    }
    else
    {
        localStorage.setItem('tamanho','grande');
    }
    document.location.reload();
});