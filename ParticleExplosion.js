/** Class representing a particle explosion */
class ParticleExplosion {
    /**
     * Create a particle explosion.
     * @param {string} canvasID - The ID of the canvas.
     * @param {number} [particleSpacing=3] - The spacing between particles.
     * @param {any} [particleColour=[255,255,255,255]] - The colour of the particles.
     */
    constructor (
      canvasID,
      particleColour = [255,255,255,255],
      particleSpacing = 5
    ) {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById(canvasID);
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
        this.particleSpacing = particleSpacing;
        this.particleColour = particleColour;
        this.mouseFactor = 0.1;
        this.explosionFactor = 1;
        this.drag = 0.95;
        this.ease = 0.25;
        this.tic = true;
        this.width;
        this.height;
        this.explosionDiameter;
        this.marginTop;
        this.marginBottom;
        this.marginLeft;
        this.marginRight;
        this.groundZeroX;
        this.groundZeroY;
        this.machinePerformance = 0;
    
        this.animateReqID;
    
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
            this.groundZeroX = -this.width * 2;
            this.groundZeroY = -this.height * 2;
            }
        });
    
        this.canvas.addEventListener('mouseleave', (_event) => {
            this.groundZeroX = -this.width*2;
            this.groundZeroY = -this.height*2;
        });
    
        window.addEventListener('resize', () => {
            this.stop();
            this.init();
            this.start();
        })
    
        this.init();
        this.start();
    }
  
    /**
     * Initialise the particle canvas.
     */
    init = () => {
      const { width, height } = this.canvas.getBoundingClientRect()
      // Bitwise shift (~~) can be used as fast alternative to Math.floor() for positive numbers
      this.width = this.canvas.width = ~~width;
      this.height = this.canvas.height = ~~height;
  
      // TODO: Improve this
      this.marginLeft = this.height / 16;
      this.marginRight = this.height / 16;
      this.marginTop = this.height / 16;
      this.marginBottom = this.height / 2 + this.marginTop
  
      this.explosionDiameter = (this.width * this.width * this.explosionFactor);
      const minExplosionFactor = Math.ceil(this.explosionFactor)
      this.groundZeroX = -this.width * minExplosionFactor;
      this.groundZeroY = -this.height * minExplosionFactor;
  
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
      console.log(`${this.particles.length} particles rendered`)
    }
  
    /**
     * Start the particle animation.
     */
    start = () => {
        const start = Date.now();
        // Only calculate particle positions every other animation frame.
        if (this.tic = !this.tic) {
            this.updateParticles();
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
        this.animateReqID = requestAnimationFrame(this.start);
    }
    
    /**
     * Stop the particle animation.
     */
    stop = () => {
      cancelAnimationFrame(this.animateReqID);
    }
  
    /**
     * Update the position of particles.
     */
    updateParticles = () => {
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            const dx = this.groundZeroX - particle.x;
            const dy = this.groundZeroY - particle.y
            const distanceFromGZ = dx * dx + dy * dy;
            const f = -this.explosionDiameter / distanceFromGZ;
    
            if (distanceFromGZ < this.explosionDiameter) {
                let t = Math.atan2( dy, dx );
                particle.vx += f * Math.cos(t);
                particle.vy += f * Math.sin(t);
            }
    
            particle.x += (particle.vx *= this.drag) + (particle.ox - particle.x) * this.ease * particle.density;
            particle.y += (particle.vy *= this.drag) + (particle.oy - particle.y) * this.ease * particle.density; 
        }
    }
  
    /**
     * Update the canvas image.
     */
    getParticleImage = () => {
        let newParticleImage = this.ctx.createImageData(this.width, this.height)
        let b = newParticleImage.data;
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            let n = ((~~p.x) + (~~p.y) * this.width) * 4;
            b[n] = this.particleColour[0];
            b[n+1] = this.particleColour[1];
            b[n+2] = this.particleColour[2];
            b[n+3] = this.particleColour[3];
        }
        return newParticleImage;
    }
  }