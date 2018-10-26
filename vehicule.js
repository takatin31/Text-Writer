var a ;
var b ;
var c ;


function Vehicule(x , y)
{
	this.pos = createVector(random(width) ,random(height));
	this.target = createVector(x , y);
	this.acc = createVector();
	this.vel = p5.Vector.random2D();
	this.r = 8;
	this.maxspeed = 10;
	this.maxforce = 1;	 
	this.a = random(255);
	this.b = random(255);
	this.c = random(255);
}

Vehicule.prototype.behaviors = function()
{
	var arrive = this.arrive(this.target);
	var mouse = createVector(mouseX, mouseY);
	var flee = this.flee(mouse);

	arrive.mult(1);
	flee.mult(5);

	this.applyForce(arrive);
	this.applyForce(flee);
}

Vehicule.prototype.applyForce = function(f)
{
	this.acc.add(f);
}

Vehicule.prototype.arrive = function(target)
{
	var desired = p5.Vector.sub(target ,this.pos);
	var speed = this.maxspeed;
	var d = desired.mag();
	if (d < 100)
	{
		speed = map(d ,0 ,100 ,0 ,this.maxspeed);
	}
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired ,this.vel);
	steer.limit(this.maxforce);
	return steer;
}

Vehicule.prototype.flee = function(target)
{
	var desired = p5.Vector.sub(target ,this.pos);
	var d = desired.mag();
	if (d < 50)
	{	
		desired.setMag(this.maxspeed);
		desired.mult(-1);
		var steer = p5.Vector.sub(desired ,this.vel);
		steer.limit(this.maxforce);	
		return steer;
	}else 
	{
		return createVector(0 ,0);
	}
}

Vehicule.prototype.update = function()
{
	this.pos.add(this.vel);
	this.vel.add(this.acc);
	this.acc.mult(0);
};

Vehicule.prototype.show = function()
{
	stroke(random(255) ,random(255) ,random(255)) ;
	strokeWeight(8);
	point(this.pos.x ,this.pos.y);
}