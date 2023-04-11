import { firstName, lastName, smileys } from '../members/MembersList';
import randomItem from 'random-item';

export function randomName() {
    const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
    return randomFirstName + ' ' + randomLastName + ' ' + randomItem(smileys);;
  }
  

 export function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }