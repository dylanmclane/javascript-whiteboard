// Define the whiteboard object
var whiteboard = {
	// Canvas element and 2D context
	canvas: null,
	ctx: null,
	
	// Initialize the whiteboard
	init: function() {
		// Get the canvas element and 2D context
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		
		// Attach event listeners to the canvas
		this.canvas.addEventListener("mousedown", this.startDraw.bind(this));
		this.canvas.addEventListener("mousemove", this.draw.bind(this));
		this.canvas.addEventListener("mouseup", this.endDraw.bind(this));

		// Add event listeners for touch events
		this.canvas.addEventListener("touchstart", this.startDraw.bind(this));
		this.canvas.addEventListener("touchmove", this.draw.bind(this));
		this.canvas.addEventListener("touchend", this.endDraw.bind(this));

		
		// Attach event listener to the clear button
		document.getElementById("clear-btn").addEventListener("click", this.clear.bind(this));
		
		// Attach event listener to the save button
		document.getElementById("save-btn").addEventListener("click", this.save.bind(this));
		
		// Set up responsive canvas and buttons
		this.setCanvasSize();
		window.addEventListener("resize", this.setCanvasSize.bind(this));
	},
	
	// Set the size of the canvas and buttons based on the window width
	setCanvasSize: function() {
		var width = Math.min(window.innerWidth * 0.9, 500);
		var height = Math.min(window.innerHeight * 0.6, 500);
		
		this.canvas.width = width;
		this.canvas.height = height;

		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		var buttons = document.querySelectorAll("button");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.fontSize = Math.min(window.innerWidth * 0.03, 16) + "px";
			buttons[i].style.padding = Math.min(window.innerWidth * 0.01, 10) + "px";
			buttons[i].style.margin = Math.min(window.innerWidth * 0.01, 10) + "px";
		}
	},
	
	// Start drawing
	startDraw: function(event) {
		// Begin a new path on the canvas

		this.ctx.beginPath();
		
		

		this.ctx.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

		// Move the starting point to the current position
		var x, y;
		if (event.type === "mousedown") {
			x = event.clientX - this.canvas.offsetLeft;
			y = event.clientY - this.canvas.offsetTop;
		} else if (event.type === "touchstart") {
			var touch = event.touches[0];
			x = touch.clientX - this.canvas.offsetLeft;
			y = touch.clientY - this.canvas.offsetTop;
		}
		this.ctx.moveTo(x, y);
	},
	
	// Draw
	draw: function(event) {
		// Prevent scrolling on the canvas
		event.preventDefault();

		if (event.buttons !== 1) {
			return;
		}
		
		// Draw a line to the current position
		var x, y;
		if (event.type === "mousemove") {
			x = event.clientX - this.canvas.offsetLeft;
			y = event.clientY - this.canvas.offsetTop;
		} else if (event.type === "touchmove") {
			var touch = event.touches[0];
			x = touch.clientX - this.canvas.offsetLeft;
			y = touch.clientY - this.canvas.offsetTop;
		}
		this.ctx.lineTo(x, y);
		
		// Set the stroke style and width
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 3;
		
		// Stroke the path
		this.ctx.stroke();
	},
	
	// End drawing
	endDraw: function(event) {
		// End the path
		this.ctx.closePath();
		this.drawing = false;	
		},

	// Clear the canvas
	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	// Save the image
	save: function() {
		// Create a link element
	var link = document.createElement("a");
	
	// Set the link's href attribute to the image data URL
	link.href = this.canvas.toDataURL("image/png");
	
	// Set the link's download attribute to the filename
	link.download = "whiteboard.png";
	
	// Click the link to download the image
	link.click();
	}
};

// Initialize the whiteboard
whiteboard.init();