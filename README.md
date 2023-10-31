<h3 align="center">particle-explosions</h3>

  <p align="center">
    Easily create amazing particle explosions in an HTML5 canvas.
    <br />
    <a href="https://tommckenna.dev">View Demo</a>
    ·
    <a href="https://github.com/TomMcKenna1/particle-explosion/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#initialisation">Initialisation</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![](https://github.com/TomMcKenna1/particle-explosions/blob/main/resources/particle_explosion_demo.gif)

Easily create awesome looking particle explosion effects in your html files with this lightweight, performant and customisable script.

<!-- GETTING STARTED -->
## Getting Started

To view a demo of this effect on your own machine, follow the steps below.

1. Clone the repo
   ```sh
   git clone https://github.com/TomMcKenna1/particle-explosion.git
   ```
2. Open demo.html using a browser of your choice


<!-- USAGE EXAMPLES -->
## Usage

### Initialisation

To initialise a particle explosion in your own project, follow the steps below.

1. Include the script in the head of your html, ensuring particle-explosion.js and your html file share the same directory
   ```html
   <script src="particle-explosion.js"></script>
   ```
2. Create a canvas anywhere in the body of your html
   ```html
   <canvas id="demoCanvas"></canvas>
   ```
3. Create a new ParticleExplosion object in your javascript, and link it to the canvas element by passing the element ID
   ```js
   const welcomeExplosion = new ParticleExplosion('demoCanvas');
   ```

If you are stuck, please have a look at the demo files: demo.html, demo.css, demo.js

### Configuration

You can pass an additional argument containing parameters to adjust the particle explosion:
```js
const welcomeExplosion = new ParticleExplosion('demoCanvas', {particleSpacing: 10, margin: 100});
```
The following parameters are currently supported:

 * margin - The margin of the particle sheet.
 * marginTop - The top margin of the particle sheet.
 * marginBottom - The bottom margin of the particle sheet.
 * marginLeft - The left margin of the particle sheet.
 * marginRight - The right margin of the particle sheet.
 * particleSpacing - The spacing between particles.
 * particleColour - The colour of the particles as an array of red, green, blue and alpha values ([r, g, b, a]).
 * particleDrag - The drag of the particles.
 * particleEase - The easing of the particles.


<!-- ROADMAP -->
## Roadmap

- [ ] Automatic particle scaling to match machine performance

See the [open issues](https://github.com/TomMcKenna1/particle-explosion/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**; I try to promptly check all of them!

If you have a suggestion that would improve this project, please fork the repo and create a pull request. You can also simply open an issue with the tag "feature-request".
Don't forget to give the project a star! Thanks again.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Tom McKenna - [Follow me on LinkedIn!](https://www.linkedin.com/in/tom-m-8a70891a8/) - tom2mckenna@gmail.com

Project Link: [https://github.com/TomMcKenna1/particle-explosion](https://github.com/TomMcKenna1/particle-explosion)