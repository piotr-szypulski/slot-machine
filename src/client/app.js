import random from 'random-js';
import './styles.scss';
import config from './config.json';

class SlotGame {
  /**
   * Returns an array with random numbers.
   * @param {*} length - size of the array you want to create
   * @param {boolean} same - if true, all numbers in array will be the same
   */
  static getRandomNumbersArray(length, same) {
    const randomGen = random();

    if (same) {
      return new Array(length)
        .fill(randomGen.integer(1, config.symbols.length - 1));
    }

    return new Array(length)
      .fill(null)
      .map(() => (randomGen.integer(1, config.symbols.length - 1)));
  }

  static initiateSlots() {
    return SlotGame.getRandomNumbersArray(config.numberOfSlots, true)
      .map(slot => ({
        current: slot,
        isSpinning: false,
        target: null,
      }));
  }

  static setMessage(message) {
    document.querySelector('.slotgame__message').innerHTML = message;
  }

  constructor() {
    this.slots = SlotGame.initiateSlots();

    this.slotDOMObjects = document.querySelectorAll('.slotgame__slot');
    this.slotOffset = 50; // percent indicating center of the div
    this.spinsLeft = config.minSpinNumber;

    SlotGame.setMessage(config.messages[0]);
    this.setImages();

    document.querySelector('.slotgame__button')
      .addEventListener('click', this.onClickHandler.bind(this));
  }

  animateSlots(e) {
    // If the image reached outside of the div
    if (this.slotOffset === config.offset) {
      // Reduce number of mandatory spins left
      if (this.spinsLeft > 0) {
        this.spinsLeft = this.spinsLeft - 1;
      }
      // Reset the position to top
      this.slotOffset = -config.offset;
    } else {
      this.slotOffset += config.speed;
    }

    /* eslint-disable no-param-reassign */
    this.slots
      .forEach((slot, index) => {
        if (!slot.isSpinning) return;

        if (this.slotOffset === config.offset) {
          slot.current = (slot.current === config.symbols.length - 1)
            ? 0
            : slot.current + 1;

          this.setImages();
        }

        if (this.spinsLeft === 0
          && slot.current === slot.target
          && this.slotOffset === 50) {
          slot.isSpinning = false;
        }

        this.slotDOMObjects[index].style.backgroundPosition = `0% ${this.slotOffset}%`;
      });
    /* eslint-enable no-param-reassign */

    // Game over
    if (this.slots.filter(slot => slot.isSpinning === true).length === 0) {
      SlotGame.setMessage(config.messages[this.victory]);
      this.spinsLeft = config.minSpinNumber;
      e.target.disabled = false;
    } else {
      requestAnimationFrame(this.animateSlots.bind(this, e));
    }
  }

  onClickHandler(e) {
    const newSet = SlotGame.getRandomNumbersArray(config.numberOfSlots);
    this.victory = [...new Set(newSet)].length;

    this.slots = newSet.map((item, index) => ({
      ...this.slots[index],
      isSpinning: true,
      target: item,
    }));

    e.target.disabled = true;
    this.animateSlots(e);
  }

  setImages() {
    /* eslint-disable no-param-reassign */
    this.slotDOMObjects.forEach((slot, index) => {
      const imageName = config.symbols[this.slots[index].current];
      slot.style.backgroundImage = `url(assets/${imageName}.png)`;
    });
    /* eslint-enable no-param-reassign */
  }
}

// Initialize the app
/* eslint-disable no-unused-vars */
const game = new SlotGame();
/* eslint-enable no-unused-vars */
