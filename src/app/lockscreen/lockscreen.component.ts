import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  interval,
  map,
  Observable,
  scan,
  startWith,
  switchMap,
  takeWhile
} from "rxjs";

type Letter = {
  letter: String;
  yPosition: number;
}

type LettersFalling = {
  letters: Letter[];
  interval: number;
}

type State = {
  score: number;
  letters: Letter[];
  level: number;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrl: './lockscreen.component.css'
})

export class LockscreenComponent {
  intervalSubject: BehaviorSubject<number>;
  letters$: Observable<LettersFalling>;
  randomLetter: () => string;
  renderGame: (state: State) => string;
  renderGameOver: () => string;
  noop: () => void;
  game$: Observable<any>;
  keys$: Observable<any>;
  levelChangeThreshold: number;
  speedAdjust: number;
  endThreshold: number;
  gameWidth: number;
  constructor() {
    this.levelChangeThreshold = 20;
    this.speedAdjust = 50;
    this.endThreshold = 15;
    this.gameWidth = 50;
    this.intervalSubject = new BehaviorSubject(600);
    this.renderGame = (state: State) => (
      (document.body.innerHTML = `Score: ${state.score}, Level: ${state.level} <br/>`),
        state.letters.forEach(
          l =>
            (document.body.innerHTML += '&nbsp'.repeat(l.yPosition) + l.letter + '<br/>')
        ),
        (document.body.innerHTML +=
          '<br/>'.repeat(this.endThreshold - state.letters.length - 1) +
          '-'.repeat(this.gameWidth))
    );
    this.renderGameOver = () => (document.body.innerHTML += '<br/>GAME OVER!');
    this.noop = () => {};
    this.randomLetter = () =>
      String.fromCharCode(
        Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0)
      );
    this.letters$ = this.intervalSubject.pipe(
      switchMap(i =>
        interval(i).pipe(
          scan<number, LettersFalling>
          (fallingLetters => ({
              interval: i,
              letters: [
                {
                  letter: this.randomLetter(),
                  yPosition: Math.floor(Math.random() * this.gameWidth)
                },
                ...fallingLetters.letters
              ]
            }),
            { letters: [], interval: 0 })
        )
      )
    );

    this.keys$ = fromEvent(document, 'keydown').pipe(
      // @ts-ignore
      startWith({ key: '' }),
      map((e: KeyboardEvent) => e.key)
    );

    this.game$ = combineLatest(this.keys$, this.letters$).pipe(
      scan<[string, LettersFalling], State>
      ((state, [key, fallingLetters]) => (
          fallingLetters.letters[fallingLetters.letters.length - 1] &&
          fallingLetters.letters[fallingLetters.letters.length - 1].letter === key
            ? ((state.score = state.score + 1), fallingLetters.letters.pop())
            : this.noop,
            state.score > 0 && state.score % this.levelChangeThreshold === 0
              ? ((fallingLetters.letters = []),
                (state.level = state.level + 1),
                (state.score = state.score + 1),
                this.intervalSubject.next(fallingLetters.interval - this.speedAdjust))
              : this.noop,
            { score: state.score, letters: fallingLetters.letters, level: state.level }
        ),
        { score: 0, letters: [], level: 1 }),
      takeWhile(state => state.letters.length < this.endThreshold)
    );

    this.game$.subscribe(this.renderGame, this.noop, this.renderGameOver);
  }
}
