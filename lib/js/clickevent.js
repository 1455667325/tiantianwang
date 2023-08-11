document.oncontextmenu = function () {
    return false;
}


let $allBox = $boxDom.find(".boxItem");

$allBox.unbind("mousedown").bind("mousedown", function (e) {
    let $this = $(this);
    let index = $this.data('index');
    let haslei = $this.data('lei');
    console.log(e);
    if (e.which === 1) { // left key
        if (haslei) {
            $this.find(".initBack").addClass("hidden").removeClass("show");
            $this.find(".unLeiBox").addClass("hidden").removeClass("show");
            $this.find(".leiBox").removeClass("hidden").addClass("show");
            $allBox.unbind("mousedown");
        } else {
            $this.find(".initBack").addClass("hidden");
            $this.find(".unLeiBox").addClass("hidden");
            $this.find(".numberText").removeClass("hidden").addClass("show");
        }
    }else if(e.which == 3){ //right
        if( $this.find(".unLeiBox").hasClass('show')){
            $this.find(".initBack").addClass("show").removeClass("hidden");
            $this.find(".unLeiBox").siblings().addClass("hidden").removeClass("show");
        }else{
            $this.find(".unLeiBox").removeClass("hidden").addClass("show");
            $this.find(".unLeiBox").siblings().addClass("hidden").removeClass("show");
        }
    }

})
