/**
 * The configuration object for a particle explosion
 * @typedef {Object} ParticleExplosionConfig
 * @property {number} [margin = 0] - The margin of the particle sheet.
 * @property {number} [marginTop = null] - The top margin of the particle sheet.
 * @property {number} [marginBottom = null] - The bottom margin of the particle sheet.
 * @property {number} [marginLeft = null] - The left margin of the particle sheet.
 * @property {number} [marginRight = null] - The right margin of the particle sheet.
 * @property {number} [particleSpacing = 5] - The number of pixels between adjacent particles.
 * @property {[number, number, number, number]} [particleColour = [255,255,255,30]] - The colour of the particles.
 * @property {number} [particleDrag = 0.95] - The drag of the particles.
 * @property {number} [particleEase = 0.25] - The easing of the particles.
 * @property {number} [mouseFactor = 0.1] - The amount the mouse moves the explosion centre.
 * @property {number} [explosionFactor = 1] - The size of the explosion.
 */

class ParticleExplosion {
    /**
     * Create a particle explosion in a specified canvas element.
     * @param {string} canvasID - The ID of the canvas.
     * @param {ParticleExplosionConfig} [config = {}] - The configuration of the particle explosion.
     */
    constructor (
        canvasID,
        config = {},
    ) {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById(canvasID);
        this.marginTop = config.marginTop || config.margin || 0;
        this.marginBottom = config.marginBottom || config.margin || 0;
        this.marginLeft = config.marginLeft || config.margin || 0;
        this.marginRight = config.marginRight || config.margin || 0;
        this.particleSpacing = config.particleSpacing || 5;
        this.particleColour = config.particleColour || [255,255,255,255];
        this.particleDrag = config.particleDrag || 0.95;
        this.particleEase = config.particleEase || 0.25;
        this.mouseFactor = config.mouseFactor || 0.1;
        this.explosionFactor = config.explosionFactor || 1;
        this.groundZeroX = -1;
        this.groundZeroY = -1;
        this.particlePrototype = {
            ox: 0,
            oy: 0,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            density: 0
        };
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.tic = true;
        this.width;
        this.height;
        this.explosionDiameter;
        // WIP: Adjust the particle spacing to the hosts specifications.
        this.machinePerformance = 0;
    
        this.animateReqID;
    
        this.initEventListeners();
        this.initParticleCanvas();
        this.startAnimation();
    }

    initEventListeners = () => {
        this.canvas.addEventListener('mousemove', (event) => {
            const { left, top } = this.canvas.getBoundingClientRect()
            if (
                event.clientX - left > this.marginLeft && 
                event.clientX - left < this.width - this.marginLeft &&
                event.clientY - top > this.marginTop &&
                event.clientY - top < this.height - this.marginBottom
            ) {
                // Set explosion to centre and move with mouse.
                this.groundZeroX = (
                    this.width - this.marginRight + this.marginLeft) / 2 
                    + this.mouseFactor * (event.clientX - left - (this.width - this.marginRight + this.marginLeft) / 2);
                this.groundZeroY = (
                    this.height - this.marginBottom + this.marginTop) / 2 
                    + this.mouseFactor * (event.clientY - top - (this.height - this.marginBottom + this.marginTop) / 2);
            }
            else {
                this.groundZeroX = -1;
                this.groundZeroY = -1;
            }
        });
    
        this.canvas.addEventListener('mouseleave', () => {
            this.groundZeroX = -1;
            this.groundZeroY = -1;
        });
    
        window.addEventListener('resize', () => {
            this.stopAnimation();
            this.init();
            this.startAnimation();
        })
    }

    initParticleCanvas = () => {
      const { width, height } = this.canvas.getBoundingClientRect()
      // Bitwise shift (~~) can be used as fast alternative to Math.floor() for positive numbers
      this.width = this.canvas.width = ~~width;
      this.height = this.canvas.height = ~~height;
      this.explosionDiameter = this.width * this.width * this.explosionFactor;
      this.particles = [];
      for (let i = this.marginLeft; i < this.width - this.marginRight; i += this.particleSpacing) {
        for (let j = this.marginTop; j < this.height - this.marginBottom; j += this.particleSpacing) {
            let particle = Object.create(this.particlePrototype);
            particle.x = particle.ox = i;
            particle.y = particle.oy = j;
            particle.density = Math.random() * 6;
            this.particles.push(particle);
        }
      }
    }
  
    startAnimation = () => {
        const start = Date.now();
        // Only calculate particle positions every other animation frame.
        if (this.tic = !this.tic) {
            this.updateParticlePositions();
        } 
        else {
            this.ctx.putImageData(this.getParticleImage(), 0, 0);
        }
        const end = Date.now();
        const timeTaken = end - start;
        if (timeTaken > this.machinePerformance) {
            this.machinePerformance = timeTaken;
        }
        console.log(this.machinePerformance)
        this.animateReqID = requestAnimationFrame(this.startAnimation);
    }
    
    stopAnimation = () => {
      cancelAnimationFrame(this.animateReqID);
    }
  
    updateParticlePositions = () => {
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            if (this.groundZeroX > -1) {
                const dx = this.groundZeroX - particle.x;
                const dy = this.groundZeroY - particle.y
                const distanceFromGZ = dx * dx + dy * dy;
                const f = -this.explosionDiameter / distanceFromGZ;
                let t = Math.atan2( dy, dx );
                particle.vx += f * Math.cos(t);
                particle.vy += f * Math.sin(t);
            }
            particle.x += (particle.vx *= this.particleDrag) + (particle.ox - particle.x) * this.particleEase * particle.density;
            particle.y += (particle.vy *= this.particleDrag) + (particle.oy - particle.y) * this.particleEase * particle.density; 
        }
    }
  
    getParticleImage = () => {
        let newParticleImage = this.ctx.createImageData(this.width, this.height)
        let rgbaArray = newParticleImage.data;
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            let pixel = ((~~particle.x) + (~~particle.y) * this.width) * 4;
            rgbaArray[pixel] = this.particleColour[0]; // Red
            rgbaArray[pixel+1] = this.particleColour[1]; // Green
            rgbaArray[pixel+2] = this.particleColour[2]; // Blue
            rgbaArray[pixel+3] = this.particleColour[3]; // Alpha
        }
        return newParticleImage;
    }
}