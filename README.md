# String Simulation
This is a simulation that visualizes the behavior of a vibrating string using the wave equation. The simulation aims to provide an interactive and intuitive representation of the physics involved.

## The Wave Equation
The wave equation is a fundamental equation in physics that describes the behavior of waves. In the context of a vibrating string, the wave equation can be written as:

$$\frac{\partial^2 y}{\partial x^2} - \frac{1}{c^2}\frac{\partial^2 y}{\partial t^2} - \gamma \frac{\partial y}{\partial t} -l^2 \frac{\partial^4 y}{\partial x^4} = 0 $$

This equation captures the interplay between the second derivative of the displacement of the string with respect to position ($x$), the second derivative of the displacement with respect to time ($t$), the damping effects described by the damping constant ($\gamma$), and the stiffness of the string due to stress-strain coupling ($l$).

## Boundary and Initial Conditions
To define a well-posed problem, the wave equation is subject to specific boundary and initial conditions. For a string fixed at both ends, we have:

$$ y(0, t) = y(L, t) = 0 $$

This means that the amplitude of the string is always zero at the endpoints. These boundary conditions ensure that the string remains fixed and does not move at its boundaries.

Additionally, we need an initial condition to specify the initial shape of the string:

$$ y(x, 0) = f(x) $$

Here, $f(x)$ is a function that describes the initial displacement of the string at different positions $x$. This initial condition captures the starting configuration of the string before it starts to vibrate.

## Discrete Form
To simulate the wave equation numerically, we use a discrete form that involves approximations. The discrete form allows us to compute the amplitude of the string at different positions and times.

The discrete form of the wave equation is given by:

$$\frac{y_{j+1}^{m} -2y_j^m + y_{j-1}^{m}}{\Delta x^2} - \frac{1}{c^2}\frac{y_j^{m+1} -2y_j^m + y_j^{m-1}}{\Delta t^2} - \gamma \frac{y_j^{m+1} - y_j^{m-1}}{2 \Delta t} - l^2 \frac{y_{j-2}^m -4y_{j-1}^m +6y_{j}^m -4y_{j+1}^m +y_{j+2}^m}{\Delta x^4} =0 $$ 

This equation relates the amplitude of the string at a particular position $j$ and time $m$ to the amplitudes at neighboring positions and times. The terms $\Delta x$ and $\Delta t$ represent the spatial and temporal step sizes, respectively.

## Stability Condition
To ensure accurate and stable simulation results, we need to satisfy a stability condition. The condition states that:

$$c \Delta t/\Delta x < 1$$
This condition ensures that the temporal step size ($\Delta t$) and spatial step size ($\Delta x$) are chosen appropriately. By satisfying this condition, we ensure that the simulation captures the dynamics of the wave without introducing numerical instability. Violating this condition can lead to unphysical results and artifacts in the simulation.

## Converting from Canvas to String Coordinates
The simulation is displayed on a canvas element, where the string's vibrations are visualized. In the canvas, the string's position is represented in "canvas coordinates" ($x_c, y_c$). To map the canvas coordinates to the string's coordinates ($x_s, y_s$) between 0 and 1, we use the following equations:

$$x_c = C_w \cdot x_s $$
$$y_c = C_w \cdot y_s + C_h / 2 $$

Here, $C_w$ and $C_h$ represent the width and height of the canvas in pixels, respectively. These equations allow us to visualize the string's vibrations accurately within the canvas.
