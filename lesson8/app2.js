class Board {
    constructor() {
            this.gameTableElement = document.getElementById('game');
        }
        /**
         * @param {Game} game 
         * @param {Status} status
         */
    init(game, status) {
            this.game = game;
            this.status = status;
        }
        /**
         * Отрисовка игрового поля
         */
    renderMap() {
            for (let row = 0; row < 3; row++) {
                const tr = document.createElement('tr');
                this.gameTableElement.appendChild(tr);
                for (let col = 0; col < 3; col++) {
                    let td = document.createElement('td');
                    td.dataset.row = row.toString();
                    td.dataset.col = col.toString();
                    tr.appendChild(td);
                }
            }
        }
        /**
         * Инициализация обработчиков событий.
         */
    initEventHandlers() {
            // Ставим обработчик, при клике на таблицу вызовется функция this.cellClickHandler.
            this.gameTableElement.addEventListener('click', event => this.game.cellClickHandler(event));
        }

}
class Game {
    /**
     * @param {Status} status 
     * @param {Board} board 
     */
    init(status, board) {
            this.status = status;
            this.board = board;
        }
        /**
         * Обработчик события клика.
         * @param {MouseEvent} event
         */
    
    // мой код
    cellClickHandler(event) {
            console.log(event.target)
            let row = +event.target.dataset.row
            let col = +event.target.dataset.col
            console.log(this.status.mapValues)
            if (event.target.textContent == "") {
                
                this.status.mapValues[row][col] = this.status.phase;
                event.target.textContent = this.status.phase;
                
                if (this.hasWon()) {
                    // Ставим статус в "остановлено".
                    this.status.setStatusStopped();
                    // Сообщаем о победе пользователя.
                    this.sayWonPhrase();
                }
                this.status.phase = this.status.phase === 'X' ? '0' : 'X';
            }
            

 
        }

        /**
         * Проверка есть ли выигрышная ситуация на карте.
         * @returns {boolean} Вернет true, если игра выиграна, иначе false.
         */
    hasWon() {
            return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
               this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
               this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
               this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }
        /**
         * Проверка есть ли выигрышная ситуация на линии.
         * @param {{x: int, y: int}} a 1-ая ячейка.
         * @param {{x: int, y: int}} b 2-ая ячейка.
         * @param {{x: int, y: int}} c 3-я ячейка.
         * @returns {boolean} Вернет true, если линия выиграна, иначе false.
         */
    isLineWon(a, b, c) {
            let value = this.status.mapValues[a.y][a.x] + this.status.mapValues[b.y][b.x] + this.status.mapValues[c.y][c.x];
            return value === 'XXX' || value === '000';
        }
        /**
         * Сообщает о победе.
         */
    sayWonPhrase() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
}
window.addEventListener('load', function () {
    const game = new Game();
    const board = new Board();
    const status = new Status();
    board.init(game, status);
    game.init(status, board);
    board.renderMap();
    board.initEventHandlers();
});
class Status {
    constructor() {
            this.status = 'playing';
            this.mapValues = [
            ['', '', '']
            , ['', '', '']
            , ['', '', '']
        , ];
            this.phase = 'X';
        }
        /**
         * Проверка что мы "играем", что игра не закончена.
         * @returns {boolean} Вернет true, статус игры "играем", иначе false.
         */
    isStatusPlaying() {
            return this.status === 'playing';
        }
        /**
         * Ставит статус игры в "остановлена".
         */
    setStatusStopped() {
            this.status = 'stopped';
        }
        /**
         * Меняет фигуру (крестик или нолик).
         */
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}
