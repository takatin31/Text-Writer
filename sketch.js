var font;
var vehicules = [];
var textinp = 'Text';

function preload()
{
	font = loadFont('AvenirNextLTPro-Demi.otf');
}

function valider()
{
	this.textinp = document.getElementById('textinput').value;
	console.log(document.getElementById('textinput').value);
	vehicules = [];
	setup();
}

function setup()
{
	createCanvas(textinp.length*120,300);
	background(51);


	var points = font.textToPoints(this.textinp ,0 ,200 ,192);
	
	for (var i = 0 ; i < points.length ; i++)
	{
		var pt = points[i];
		var vehicule = new Vehicule(pt.x ,pt.y);
		vehicules.push(vehicule);
	}
}

function draw()
{
	background(51);
	for (var i = 0 ; i < vehicules.length ; i++)
	{
		var v = vehicules[i];
		v.behaviors();
		v.update();
		v.show();
	}
}