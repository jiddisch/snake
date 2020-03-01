"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PlayerService = /** @class */ (function () {
    function PlayerService() {
    }
    return PlayerService;
}());
var PlayerController = /** @class */ (function () {
    function PlayerController() {
        this.boardElm = document.querySelector('.board');
        this.ballElm = document.querySelector('.ball');
        this.gap = 20;
        this.size = 500;
        this.speed = 100;
        this.init();
    }
    PlayerController.prototype.init = function () {
        var _this = this;
        this.getPosition().subscribe(function (pos) {
            _this.ballElm.style.left = pos.x + 'px';
            _this.ballElm.style.top = pos.y + 'px';
        });
    };
    PlayerController.prototype.getPosition = function () {
        var _this = this;
        return rxjs_1.combineLatest(rxjs_1.interval(this.speed), rxjs_1.fromEvent(document, 'keyup').pipe(operators_1.startWith({ key: 'ArrowRight' }), operators_1.map(function (e) { return e.key; }))).pipe(operators_1.mergeMap(function (_a) {
            var _ = _a[0], key = _a[1];
            var x = _this.ballElm.getBoundingClientRect().left - _this.boardElm.getBoundingClientRect().left;
            var y = _this.ballElm.getBoundingClientRect().top - _this.boardElm.getBoundingClientRect().top;
            var obj = { x: x, y: y };
            switch (key) {
                case 'ArrowUp':
                    obj.y = y > _this.gap ? y - _this.gap : 0;
                    break;
                case 'ArrowLeft':
                    obj.x = x > _this.gap ? x - _this.gap : 0;
                    break;
                case 'ArrowRight':
                    obj.x = x < _this.size - 2 * _this.gap ? x + _this.gap : _this.size - _this.gap;
                    break;
                case 'ArrowDown':
                    obj.y = y < _this.size - 2 * _this.gap ? y + _this.gap : _this.size - _this.gap;
                    break;
            }
            return rxjs_1.of(obj);
        }));
    };
    return PlayerController;
}());
new PlayerController();
