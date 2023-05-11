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
		this.canvas.addEventListener("touchstart", this.startDraw.bind(this));
		this.canvas.addEventListener("touchend", this.endDraw.bind(this));
		this.canvas.addEventListener("touchmove", this.draw.bind(this));
		
		// Attach event listener to the clear button
		document.getElementById("clear-btn").addEventListener("click", this.clear.bind(this));
		
		// Attach event listener to the save button
		document.getElementById("save-btn").addEventListener("click", this.save.bind(this));
	},
	
	// Start drawing
	startDraw: function(event) {
		// Begin a new path on the canvas
		this.ctx.beginPath();
		
		// Move the starting point to the current mouse position
		var touch = event.touches[0];
		this.ctx.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
	},
	
	// Draw
	draw: function(event) {
		// Check if the mouse button is being held down
		if (event.buttons !== 1) {
			return;
		}
		
		// Draw a line to the current mouse position
		this.ctx.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

		// Prevent scrolling on the canvas
		event.preventDefault();
		
		// Draw a line to the current touch position
		var touch = event.touches[0];
		this.ctx.lineTo(touch.clientX - this.canvas.offsetLeft, touch.clientY - this.canvas.offsetTop);
		
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
	},
	
	// Clear the canvas
	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	// Save the canvas as an image
	save: function() {
		var link = document.createElement("a");
		link.download = "whiteboard.png";
		link.href = this.canvas.toDataURL();
		link.click();
	}
};

// Initialize the whiteboard
whiteboard.init();
