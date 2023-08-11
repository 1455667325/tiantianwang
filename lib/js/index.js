let $boxDom = $(".box");
let boxProperty = {
    width: $boxDom.width(),
    height: $boxDom.height()
}

class productBox {
    constructor() {
        this.htmlTemp = "";
        this.init();
    }
    init() {
        this.getWidthAndHeightNum();
    }
    getWidthAndHeightNum() {
        this.height = 6;
        this.width = 6;
        this.lei_num = 6;
    }
    getBoxNum() {
        return this.height * this.width;
    }
    getBoxEle() {
        //产生多少个地雷
        let box_num = this.getBoxNum();
        let lei_position_index_arr = new Array(this.lei_num).fill("").map(() => {
            return Math.floor(Math.random() * (box_num + 1));
        })
        lei_position_index_arr = Array.from(new Set(lei_position_index_arr));
        let html = "";
        for (let i = 1; i < box_num + 1; i++) {
            let temp = "";
            if (lei_position_index_arr.includes(i)) {
                temp = `<div class='boxItem boxLei' data-index="${i}" data-lei="true">
                    <div class='initBox initBack'></div>
                    <div class='initBox leiBox hidden'></div>
                    <div class='initBox unLeiBox hidden'></div>
                </div>`;
            } else {
                temp = `<div class='boxItem boxSmall' data-index="${i}" >
                <div class='initBox initBack'></div>
                <div class='initBox numberText hidden' ></div>
                <div class='initBox unLeiBox hidden'></div>
                </div>`;
            }
            html += temp;
        }
        this.htmlTemp = html;
        return html;
    }
    getHtmlDom() {
        return $boxDom.html();
    }
    getCurBoxTextNum(eightArr) {
        let num = 0;
        eightArr.forEach(cur => {
            if (cur !== null) {
                let target = $boxDom.find(`[data-index='${cur}']`);;
                if (target.data("lei")) {
                    num += 1;
                }
            }
        });
        return num
    }
    getBoxTextNum() {
        let $html = $(this.getHtmlDom());
        let _this = this;
        $html.each(function (cur) {
            let index = $(this).data("index");
            let leiFlag = $(this).data("lei");
            if (!leiFlag) {
                let getEight = _this.getEight(index);
                let num = _this.getCurBoxTextNum(getEight);
                $boxDom.find(`[data-index='${index}']`).children(".numberText").html(`<span class="numText num_${num}">${num}</span>`)
            }
        })
    }
    getPosValidate(boxIndex, eightIndex, eightValue) {
        let pai = Math.ceil(boxIndex / this.width)
        let beforeMin = this.width * (pai - 2) + 1;
        let beforeMax = this.width * (pai - 1);
        let middleMin = this.width * (pai - 1) + 1;
        let middleMax = this.width * pai;
        let afterMin = this.width * pai + 1;
        let afterMax = this.width * (pai + 1);

        if (eightValue < 0 || eightValue > this.width * this.height) {
            return null;
        }
        if (eightIndex == 1) {
            if (eightValue < beforeMin) {
                return null
            }
        } else if (eightIndex == 3) {
            if (eightValue > beforeMax) {
                return null
            }
        }
        else if (eightIndex == 4) {
            if (eightValue > middleMax) {
                return null
            }
        }
        else if (eightIndex == 5) {
            if (eightValue > afterMax) {
                return null
            }
        }
        else if (eightIndex == 7) {
            if (eightValue < afterMin) {
                return null
            }
        }
        else if (eightIndex == 8) {
            if (eightValue < middleMin) {
                return null
            }
        }
        return eightValue
    }
    getEight(curIndex) {
        let eightPos = [];

        let one = curIndex - this.width - 1;
        let two = curIndex - this.width;
        let three = curIndex - this.width + 1;
        let four = curIndex + 1;
        let five = curIndex + this.width + 1;
        let six = curIndex + this.width;
        let seven = curIndex + this.width - 1;
        let eight = curIndex - 1;
        eightPos = [one, two, three, four, five, six, seven, eight];
        eightPos = eightPos.map((cur, index) => {
            return this.getPosValidate(curIndex, index + 1, cur);
        })
        return eightPos;

    }

}
let boxs = new productBox();
$boxDom.html(boxs.getBoxEle());
boxs.getBoxTextNum()

