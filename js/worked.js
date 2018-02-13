// JavaScript Document
Raphael.fn.connection = function (obj1, obj2, line, bg,pvar) { 
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
		pvar = line.pvar;
    }
	var A = getElementAbsolutePos(document.getElementById(obj1.attr('id')));
	var p,d={},dis=[];
	var B = getElementAbsolutePos(document.getElementById(obj2.attr('id')));
    p = [{x: A.x + parseInt(obj1.width()) / 2, y: A.y + 10},
        {x: A.x + parseInt(obj1.width()) / 2 , y: A.y + parseInt(obj1.height())/2 - 10},
        {x: A.x + 10, y: A.y + parseInt(obj1.height()) / 2 - 10},
        {x: A.x + parseInt(obj1.width()) - 10, y: A.y + parseInt(obj1.height()) / 2 - 10},
        {x: B.x + parseInt(obj2.width()) / 2 -10, y: B.y + 10},
        {x: B.x + parseInt(obj2.width()) / 2 - 10, y: B.y + parseInt(obj2.height())/2 - 10},
        {x: B.x + 10, y: B.y + parseInt(obj2.height()) / 2 - 10},
        {x: B.x + parseInt(obj2.width()) - 10, y: B.y + parseInt(obj2.height()) / 2 - 10}];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	var path;
	if(pvar == null || pvar == "C")
	{
	 	pvar = "C";
		path = ["M", x1.toFixed(3), y1.toFixed(3), pvar, x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(" ");
	}
	else
		path = ["M", x1.toFixed(3), y1.toFixed(3), pvar, x2, y2, x4.toFixed(3), y4.toFixed(3)].join(" ");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
		var tmp2 = this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3});
		var tmp1 = this.path(path).attr({stroke: color, fill: "none", "stroke-width":1});
		ConMan[obj1.attr('id').toString()].push(tmp1); 
		ConMan[obj2.attr('id').toString()].push(tmp1);
		ConMan[obj1.attr('id').toString()].push(tmp2);
		ConMan[obj2.attr('id').toString()].push(tmp2);
        return {
            bg: tmp2,
            line: tmp1,
            from: obj1,
            to: obj2,
			pvar: pvar
        };
    }
};


Raphael.fn.relation = function (obj1, line, bg) { 
    if (line == 'A') {
        line = obj1;
        obj1 = line.from;
    }	
	var e = mouseOVer;
	var A = getElementAbsolutePos(document.getElementById(obj1.attr('id')));
//	var A = {x:document.getElementById(obj1.attr('id')).offsetLeft,y:document.getElementById(obj1.attr('id')).offsetTop};
	var d={},dis=[];
	var	p = [{x: A.x + parseInt(obj1.width()) / 2, y: A.y - 10},
        {x: A.x + parseInt(obj1.width()) / 2 , y: A.y + parseInt(obj1.height())/2 - 10},
        {x: A.x + 10, y: A.y + parseInt(obj1.height()) / 2 - 10},
        {x: A.x + parseInt(obj1.width()) - 10, y: A.y + parseInt(obj1.height()) / 2 - 10},
        {x: e.PageX, y: e.PageY},
        {x: parseInt(e.PageX)+1, y: parseInt(e.PageY)+1},
        {x: parseInt(e.PageX)+6, y: parseInt(e.PageY)+3},
        {x: parseInt(e.PageX)+3, y: parseInt(e.PageY)+3}]; 
		p[4].x = e.pageX;p[4].y = e.pageY;p[5].x = e.pageX+1;p[5].y = e.pageY+1;
		p[6].x = e.pageX+3;p[6].y = e.pageY+3;p[6].x = e.pageX+4;p[7].y = e.pageY+4;
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    } 
    var x1 = p[1].x,
        y1 = p[1].y,
        x4 = p[4].x,
        y4 = p[4].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][1].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][1].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][4].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][4].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(" ");
    if (TR1!=null) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {

		        var color = typeof line == "string" ? line : "#000";
		TR1 = this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3});
		TR0 = this.path(path).attr({stroke: color, fill: "none", "stroke-width": 1});
        return {
            bg: TR1,
            line: TR0,
            from: obj1,
			e: e
        };
    }
};

var r;
var connections = [];
var relations = [];
var TR0,TR1;
var ConMan = [];

function move() {
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();
        }

r = Raphael("holder", screen.width, screen.height);

var index = 0;
ConMan['root'] = new Array();

var DIR = 0;
function Add()
{
	var valu=$('.selected').val().toString();
	var papa=$('.selected');
	$('.selected').clone(false,false).attr('id','node'+index.toString()).attr('value',"New Child".toString()).addClass(papa.attr('id').toString()+'CH').removeClass('in').appendTo('#A');
	$('.selected').removeClass('selected');
	$('#node'+index.toString()).addClass('selected');
	var bacha=$('.selected');
	if(papa.attr('id') == 'root')
		bacha.addClass('node');
	else
	{
		bacha.removeClass('node');
		bacha.addClass('node_c');
	}
	var top_parent=parseInt(papa.css("top"));
	var height_parent=parseInt(papa.css("height"));
	var left_parent=parseInt(papa.css("left"));
	var width_parent=parseInt(papa.css("width"));

	$('.node,.node_c').css({"height":40+"px"});
	
	
	var tt = $('.'+papa.attr('id').toString()+'CH');
	var H = bacha.css('height');
	var A = bacha.val().toString();
	var W = ((A.length + 7)*8);
	bacha.css({'width':W.toString()+"px",'top':"30px"});
	
	if(DIR%4 == 0)
		bacha.css({'top':top_parent+height_parent+40+'px'});
	else if(DIR%4 == 1)
		bacha.css({'left':left_parent-width_parent-40+'px'});
	else if(DIR%4 == 2)
		bacha.css({'top':top_parent-height_parent-40+'px'});		
	else if(DIR%4 == 3)
		bacha.css({'left':left_parent+width_parent+40+'px'});
	DIR++;
	index++;
	ConMan[bacha.attr('id')] = new Array();
	if(papa.attr('id')=='root')
		connections.push(r.connection(papa,bacha,"#7D7E80",'#7D7E80|5','C'));
	else
		connections.push(r.connection(papa,bacha,"#7D7E80",'#7D7E80|2','C'));
	
}

$('.in').livequery(function(){
	$(this).draggable({  cancel:null});
});

/*$('#all-container').livequery(function(){
	$(this).draggable();
});*/

$('.in,.node,.node_c').livequery('keydown',function(e){
	var A = $(this).val().toString();
	A = A.split('\n');
	var i = A.length;
	while(i>0)
	{
		A[i-1] = A[i-1].length;
		i--;
	}
	A.sort();
	var tty = Math.max.apply(Math, A);
	var W = (tty+7)*9;
	var H = (A.length*30).toString() + "px";
	W = W.toString()+"px";
	$(this).css({'width':W});
	$(this).css({'height':H});
});

$('.node,.node_c').livequery(function(){
	$(this).draggable({  cancel:null});
});

$('.in,.node,.node_c').livequery('dblclick',function(){
	$(this).removeAttr('readonly').focus().select();$(this).css({"cursor":"text"});
	});
	
$('.in,.node,.node_c').livequery('click',function(){
		 $('.selected').removeClass('selected');
	$(this).addClass('selected');
	if(!check)
		E = $(this);
	unselect = false;});

$('.node,.in,.node_c').livequery('drag',function(){
		 move();});

$('.in,.node,.node_c').livequery('mousedown',function(){
	if(relate && $('.selected').attr('id')!=$(this).attr('id'))
	{
		connections.push(r.connection($('.selected'),$(this),'#F5D938','#F5D938|3','Q'));
		relate = false;
		relations.pop();
		TR0.remove();
		TR1.remove();
		TR0 = null;
		TR1 = null;
	}
		 $('.selected').removeClass('selected');
	$(this).addClass('selected');
	unselect = false;});

$('.in,.node,.node_c').livequery('mouseleave',function(){$(this).css({"cursor":"move"});unselect=true;});
var unselect = false;
$('body').click(function(){
	 $('.in,.node,.node_c').attr('readonly','readonly');});
	 
$('body').mousemove(function(event){
	 	if(relate){
			moveR(event);
			}
		});	 
var relate=false;		
var R0;
function moveR(e) {
	mouseOVer = e;
	if(temp){
		temp = false;
		relations.push(r.relation($('.selected'),'#F5D938','#F5D938|2'));}
	else{
			r.relation(relations[relations.length - 1],'A','A');
            r.safari();
        }
}
var temp = false;
var mouseOVer;

function StartR()
{
			relate = !relate;
			if(!relate)
			{
				TR0.remove();
				TR1.remove();
				TR0 = null;
				TR1 = null;
			}
			temp = true;

}

function DeleteN()
{		
	var T = $('.selected');
	if(T.attr('id') != 'root'){
if(confirm("Are you sure, you want to Delete?")){
		var C = $('.'+$('.selected').attr('id').toString() + 'CH');
		var i = C.length;
		while(i>0)
		{
			var j = ConMan[C[i-1].id].length;			
			while(j>0)
			{
				ConMan[C[i-1].id][j-1].remove();
				j--;
			}
			i--;
		}
		var i = C.length;
		while(i){		
			$(C[i-1]).remove();
			i--;
		}
		
		var j = ConMan[T.attr('id')].length;
		while(j>0)
		{
			ConMan[T.attr('id')][j-1].remove();
			j--;
		}
			T.remove();
	}}
}
