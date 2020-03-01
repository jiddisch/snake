import { fromEvent, interval, Observable, of, combineLatest } from 'rxjs';
import { mergeMap, map, startWith } from 'rxjs/operators';

interface Position {
  x: number;
  y: number;
}

class Player {
  private boardElm: HTMLElement = document.querySelector('.board');
  private ballElm: HTMLElement = document.querySelector('.ball');
  private gap = 20;
  private size = 500;
  private speed = 100;

  constructor() {
    this.init();
  }

  private init() {
    this.getPosition().subscribe(pos => {
      this.ballElm.style.left = pos.x + 'px';
      this.ballElm.style.top = pos.y + 'px';
    });
  }

  getPosition(): Observable<Position> {
    return combineLatest(
      interval(this.speed),
      fromEvent(document, 'keyup').pipe(
        startWith({key: 'ArrowRight'}),
        map((e: KeyboardEvent) => e.key)
      )
    ).pipe(
      mergeMap(([_, key]) => {
        const x = this.ballElm.getBoundingClientRect().left - this.boardElm.getBoundingClientRect().left;
        const y = this.ballElm.getBoundingClientRect().top - this.boardElm.getBoundingClientRect().top;
        const obj = {x, y};

        switch (key) {
          case 'ArrowUp':
            obj.y = y > this.gap ? y - this.gap : 0;
            break;
          case 'ArrowLeft':
            obj.x = x > this.gap ? x - this.gap : 0;
            break;
          case 'ArrowRight':
            obj.x = x < this.size - 2 * this.gap ? x + this.gap : this.size - this.gap;
            break;
          case 'ArrowDown':
            obj.y = y < this.size - 2 * this.gap ? y + this.gap : this.size - this.gap;
            break;
        }
        return of(obj);
      })
    )
  }

}

new Player();