window.onload = function(){
  //选取页面中的元素
  var
  row = 8,
  xishu = 0.8,
  flag = false,
  da = document.querySelector('.saolei'),
  zhezhao = document.getElementById('zhezhao'),
  gameover = document.getElementById('gameover'),
  restart = document.getElementById('restart'),
  zhicheng = document.getElementById('zhicheng'),
  colors = ['#b9d486','#e28a80','#6cb5f4','#efc83d','#da5254','#5087e1','#689e4e','#e9b02a','#3c64bc','#5c8d44','#9c2220'];



  var init = function () {


    //1.先用一个二维数组来代表某个位置有雷没雷
    var er  = [];
    for ( var i = 0;  i < row;  i++){
      er[i] = [];
      for ( var j = 0; j < row; j++){
        er[i].push( ( Math.random() > xishu )?1:0   );
      }
    }
    //2.根据上面那个数组生成一个能输出到页面中的数组
    var _er = [];
    for ( var i = 0;  i < row;  i++){
      _er[i] = [];
      for ( var j = 0;  j < row;  j++){
        if(er[i][j] == 1){
          _er[i].push('lei');
          continue;
        }
        var
        d1 = ( j > 0 )?er[i][j-1]:0,
        d2 = ( j < row -1 )?er[i][j+1]:0,

        d3 = ( i > 0 && j>0)?er[i-1][j-1]:0,
        d4 = ( i > 0)?er[i-1][j]:0,
        d5 = ( i > 0&& j<row-1)?er[i-1][j+1]:0,

        d6 = ( i < row-1 && j>0)?er[i+1][j-1]:0,
        d7 = ( i < row-1)?er[i+1][j]:0,
        d8 = ( i < row-1 && j<row-1)?er[i+1][j+1]:0;
        var num = d1+d2+d3+d4+d5+d6+d7+d8;
        _er[i].push(num);
      }
    }
    //3.把这个代表了页面的二维数组转换成一维数组
    var lei = [];
    for ( var i = 0;  i < row;  i++){
      for ( var j = 0; j<row; j++){
        lei.push(_er[i][j]);
      }
    }



    var tmplate = '<div class="zhezhao" id="zhezhao"> <div id = "gameover"> Game over! </div> <div id = "restart"> restart </div> </div>'
    da.innerHTML = tmplate;
    zhezhao = document.getElementById('zhezhao');
    zhezhao.style.display = 'none';
    flag = false;

    var _i = 0;
    var intervalId = setInterval(function(){
      var div = document.createElement('div');
      div.setAttribute('class',( lei[_i] == 'lei' )?'block lei':'block');
      div.textContent = lei[_i];
      da.appendChild(div);
      setTimeout(function(){
        var r_num = parseInt( Math.random()*colors.length );
        div.style.opacity = '1';
        div.style.background = colors[r_num];
        div.style.color = colors[r_num];
        div.style.webkitTransform = 'rotateX(360deg)';
      },18)
      _i++;
      if(_i > row*row -1){
        clearInterval(intervalId);
      }
    },20)
  }
  init();

  touch.on(da,'tap doubletap',function(e){
    if(e.target.id == 'restart'){
      init();
      return;
    }
    if(e.target.classList[0] !== 'block' || flag){
      return;
    }
    if(e.type == 'tap'){
      zuojiandechulihanshu(e.target);
    }else {
      dianyoujiandechulihanshu(e.target);
    }
  })

  da.onmousedown = function(e){

    if( e.target.id === 'restart' ){
      window.location.reload();
    }

    if( e.target == this || flag ) return;

    var div = e.target;

    if( div.classList[0] === 'block' ){
      //点左键的情况
      if(e.which == 1){
        zuojiandechulihanshu(div);
      }
      if(e.which == 3){
        dianyoujiandechulihanshu(div);
      }
    }
  }


  //让页面不能再选择文字
  document.onselectstart = function(){ return false; }
  //让页面右键不再生效
  document.oncontextmenu = function(){ return false; }
  //解除浏览器默认手势
  document.addEventListener('touchstart',function(e){e.preventDefault();});

  function zuojiandechulihanshu( div ){
    if(div.textContent != 'lei'){
      div.style.background = 'white';
      div.style.color = 'black';
    }else{
      flag = true;

      var blocks = document.getElementsByClassName('block');
      for ( var i = 0;  i < blocks.length;  i++){
        blocks[i].style.opacity = '0.2';
      }

      var leis = document.getElementsByClassName('lei');
      var _i = 0;
      var intervalId = setInterval(function(){

        leis[_i].style.webkitTransform = 'scale(1.2,1.2)';
        leis[_i].style.opacity = '1';

        _i++;
        if(_i > leis.length-1){
          clearInterval(intervalId);

          zhezhao.style.display = 'block';

          setTimeout(function(){
            zhezhao.style.webkitTransform = 'scale(1,1)';
            zhezhao.style.opacity = '0.6';
          },30);

        }
      },100)
    }
  }

  function dianyoujiandechulihanshu(div){
    if( div.textContent != 'lei'){
      alert('判断失误，游戏结束～～。。')
      init();
    }else{
      div.style.color = 'white';
      div.textContent = '7';
      div.style.fontSize= '13px';
      div.setAttribute('class','block');

      var leis = document.getElementsByClassName('lei');
      if(leis.length == 0){
        flag  = true;

        zhezhao.style.display = 'block';
        gameover.textContent = 'You Win!!!!';

        setTimeout(function(){
          zhezhao.style.webkitTransform = 'scale(1,1)';
          zhezhao.style.opacity = '0.6';
        },30)
      }
    }
  }

}
