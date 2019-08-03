---
layout: post
title: Игра про уничтожение блоков
permalink: /projects/block-destruction-game/
description: Игра про уничтожение блоков с использованием HTML5 canvas
image: /photos/block-destruction-game.png
image_hide: true
---

Задача игрока &mdash; убрать все блоки, или оставить как можно меньше. За уничтоженный блок начисляется очко. Всегда максимальное количество возможных очков равно площади поля. Поэтому даже если убраны не все блоки, можно соревноваться набирая большее количество очков.

[Предыстория](https://mikhail-yudin.ru/frontend/html5-canvas-block-destruction-game/)


<style>canvas{outline:1px solid #ccc; background-color: #eee}.game-wrapper{text-align:center}</style>
<div class="game-wrapper">
<canvas id="cv" width="300" height="400"></canvas>
</div>
<script>
	//user utils
	function Point(x,y){this.x=x; this.y=y;}
	
	function p2ij(p){
        with(Math) return {i:floor((cv.height-p.y)/bs),j:floor(p.x/bs)};
    }

    function p2c(p){
        var ij=p2ij(p);
        if(ij.i<0||ij.j<0||ij.i>=height||ij.j>=width||!arr[ij.i][ij.j])return -1;
        return arr[ij.i][ij.j].color;
    }

    function c2p(row,col){
        return new Point(col*bs,cv.height-row*bs-bs);
    }
	
	//addition for canvas
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame=(function(){
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(cb,el){
                    window.setTimeout(cb,1000/60);
                };
        } )();
    }

	var CanvasBuffer=function(w,h){
		this.cv=document.createElement('canvas');
		this.cv.width=w;
		this.cv.height=h;
		this.ct=this.cv.getContext('2d');
		this.clear=function(other){
			if(!other)this.ct.clearRect(0,0,cv.width,cv.height);
			else this.cv.width=this.cv.width;
		};
		this.render=function(ct,x,y){
			ct.drawImage(this.cv,x,y);
		};
	};
	
    var cv=document.getElementById('cv'),
		ct=cv.getContext('2d'),
		cb=new CanvasBuffer(cv.width,cv.height);

    ct.textBaseline='top';
    ct.font='11px Arial';
	
    cb.ct.textBaseline='top';
    cb.ct.font='11px Arial';

	//vars
	var bs=15,
		colors=4,
		colorsArr=[
			'lightblue', 
			'rgb(120,150,170)', 
			'rgb(120,170,150)',
			'pink',
			'gray',
		],
		height=Math.round((cv.height-50)/bs),width=Math.round(cv.width/bs),moves='',
		totalBlocks=0,
		mouse=new Point(0,0),
		arr=[],
		todel=[],
		changes={},
		score=0;
		
	var filled=height;
	
	function fixChange(i,j){
		if(!changes[i]) changes[i]=[];
		if(changes[i].indexOf(j)==-1)changes[i].push(j);
	}
	
	function clearChanges(){changes={};}
	function changeAll(){
		arr.iterate(fixChange);
	}
	
	function changesGetLRM(){
		var left=width,right=0,bottom=height,cur;
		with(Math){
			for(var k in changes){
				bottom=min(bottom,k);
				for(var t in changes[k]){
					cur=changes[k][t];
					left=min(left,cur);
					right=max(right,cur);
				}
			}
		}
		return {l:left,r:right,m:bottom};
	}
	
    arr.iterate=function(f,skipEmpty){
        for(var row=0; row<arr.length; row++){
            for(var col=0; col<arr[row].length; col++){
				if(skipEmpty && !arr[row][col])continue;
                if(f(row,col,arr[row][col])) return;
            }
        }
    };
	
	arr.appendLine=function(bottom){
		if(arr[height-1])for(var i=0;i<width;i++)if(arr[height-1][i])return 0;
		if(bottom)arr.pop();
		console.log(height);
		for(var j=0, line=[]; j<width; j++){
			fixChange(height-1,j);
            with(Math)line.push({color:round(random()*(colors-1))});
        }
        if(bottom){
			arr.unshift(line);
		}
		else arr.push(line);
		totalBlocks+=width;
		return 1;
	}
	
    for(var i=0; i<height; i++){
        if(i<filled)arr.appendLine();
		else{
			for(var j=0, line=[]; j<width; j++) line.push(undefined);
			arr.push(line);
		}
    }

    function del(color,i,j){
        if(i<0||j<0||i>=height||j>=width||!arr[i][j])return;
        if(arr[i][j].todel || arr[i][j].color!==color)return;
        arr[i][j].todel=true;
		todel.push({i:i,j:j});
        del(color,i-1,j);
        del(color,i,j-1);
        del(color,i+1,j);
        del(color,i,j+1);
    }
	
	function anyMoves(){
		moves=false;
		arr.iterate(function(i,j,current){
			todel=[];
			del(current.color,i,j);
			resetStates();
			if(todel.length>2){ moves=true; return true; }
		},true);
	}

    function deleteItems(mouse){
		var c,ij,count;
		c=p2c(mouse);
        if(c===-1)return;
        ij=p2ij(mouse);
		todel=[];
        del(c,ij.i,ij.j);
        if(todel.length<3){ resetStates(); return; }
		count=todel.length;
        for(var i=0;i<todel.length;i++){ delete arr[todel[i].i][todel[i].j]; fixChange(todel[i].i,todel[i].j); }
		return count;
    }
	
	function fall(){
		//move down
		var lr=changesGetLRM();
		
		console.time('down');
		var pos;
        arr.iterate(function(i,j,el){
			if(j<lr.l||j>lr.r||i<lr.m)return;
            if(el)return;
            pos=i;
			for(var t=i+1;t<height;t++){
				if(arr[pos][j] || !arr[t][j])continue;
				arr[pos][j]=arr[t][j];
				fixChange(pos,j);
				fixChange(t,j);
				delete arr[t][j];
				break;
			}
        });
		console.timeEnd('down');

        //if gaps
		console.time('gaps');
		//if gaps
        for(var col=lr.l;col<width;col++){
            if(arr[0][col])continue; //no gap
            for(var ccol=col+1;ccol<width;ccol++){
                if(!arr[0][ccol])continue;
                //not empty, move
                for(var i=0;i<height;i++){
                    if(!arr[i][ccol])break; //if on top
                    arr[i][col]=arr[i][ccol];
					fixChange(i,col);
					fixChange(i,ccol);
                    delete arr[i][ccol];
                }
                break;
            }
        }

		console.timeEnd('gaps');
	}

    function resetStates(){
		for(var i=0;i<todel.length;i++)arr[todel[i].i][todel[i].j].todel=false;
    }

	function update(){
		//cb.clear();
		var group=[];
		for(var i=0;i<colors;i++)group.push([]);
		
		for(var k in changes){ 
			for(var t in changes[k]){
				var row=k,col=changes[k][t];
				var el=arr[row][col];
				var p=c2p(row,col);
				if(!el){cb.ct.clearRect(p.x,p.y,bs,bs); continue;}
				group[el.color].push(p);
			}
		}
		
		for(var i=0;i<colors;i++){
			cb.ct.fillStyle=colorsArr[i];
			cb.ct.beginPath();
			for(var j=0;j<group[i].length;j++){
				cb.ct.rect(group[i][j].x,group[i][j].y,bs,bs);
			}
			cb.ct.fill();
		}
		
		cb.ct.fillStyle='#000';
		cb.ct.clearRect(0,0,150,20);
		cb.ct.fillText('Blocks: '+totalBlocks,0,0);
		cb.ct.fillText('Moves: '+moves,80,0);
		clearChanges();
	}
	
    cv.onmouseup=function(e){
		console.clear();
        mouse=new Point(e.pageX-this.offsetLeft, e.pageY-this.offsetTop);
		
		//console.time('delete');
		var cnt=deleteItems(mouse);
		
		if(cnt){
			totalBlocks-=cnt;
			score+=cnt;
		}
		//console.timeEnd('delete');
		//console.time('fall');
		fall();
		//console.timeEnd('fall');
		//console.time('anymoves');
		anyMoves();
		//console.timeEnd('anymoves');
		//console.time('update');
		update();
		//console.timeEnd('update');
    };
/*
	var level=1;
	var tmr=setTimeout(pushIt,2000);
	
	function pushIt(){
		if(!arr.appendLine(true)){ //gameover
			clearInterval(tmr);
			alert('GAME OVER. Your score: '+score);
			return;
		}
		tmr=setTimeout(pushIt,3000-level++*10);
		changeAll();
		anyMoves();
		update();
	}
	*/
	var ttd=false;
    var draw=function(){
        requestAnimationFrame(draw,cv);
        ct.clearRect(0,0,cv.width,cv.height);
        cb.render(ct,0,0);
    };
	
	changeAll();
	update();
    draw();
</script>
