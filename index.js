class Bingo {
  constructor(){
    this.is_doing = false;
    this.result_block = $('#js-result');
    this.result_tr = this.result_block;
    this.result_count = 0;
  }
  change(){
    this.stack = [];
    for(let i=1;i<=Number($('.js-select-numbers').val());i++){
      this.stack.push(i);
    }
  }
  play(){
    if(this.is_doing == true) return;
    let stack_length = this.stack.length;
    if(stack_length == 0){
        return;
    }
    this.is_doing = true;
    let open = $('#js-open');
    let count = 0;
    let timer = setInterval(() => {
      let tmp_rand = Math.floor( Math.random() * stack_length);
      open.html(this.stack[tmp_rand]);
      if(count >= 5){
          clearInterval(timer);
          var rand = Math.floor( Math.random() * stack_length);
          open.html(this.stack[rand]);
          if(this.result_count%9 == 0){
            this.result_block.append('<div id="js-result_tr' + this.result_count + '" style="display:table-row"></div>');
            this.result_tr = $('#js-result_tr' + this.result_count);
          }
          this.result_count ++;
          this.result_tr.append('<div class="result">' + this.stack[rand] + '</div>');
          this.stack.splice(rand,1);
          this.is_doing = false;
      }
      count++;
    },100);
  }
}

$(document).ready(function(){
  var bingo = new Bingo();
  $('.open_block').on("click keydown ontouchstart",function(){
    bingo.play();
  });
  var select_dom = '参加人数: <select class="js-select-numbers">';
  var selected = '';
  for(var i=4;i<=16;i++){
    if(i == 12){ selected = 'selected' }else{ selected = '' };
    select_dom += '<option value="'+String(i)+'" '+selected+'>'+String(i)+'</option>';
  }
  select_dom += '</select>';
  $('.js-select_numbers').html(select_dom);
  bingo.change();
  $('.js-select_numbers').change(function(){
    bingo.change();
  });
});
