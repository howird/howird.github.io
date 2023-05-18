---
date: November 1, 2022
---

# Frequency Response
- System behaviour determined from the steady state response to a sinusoidal input in the form

$$
R=A\sin(\omega t)
$$
- Sine wave is used because it is:
	- easy to analyse
	- easy to generate
	- easy to measure experimentally
- When Sinusoidal functions are applied to __linear__ systems:
	- output will be sinusoidal
	- output amplitude will be proportional to input amplitude
	- harmonic input produces harmonic output at same frequency
- However, there is __Variation in Amplitude and Phase__, which is are functions of Frequency

## Amplitude and Phase of Frequency Response

### Setup
- To get data analytically, we must use the Open-Loop transfer function
	- if we understand the open loop behaviour, we can predict what would happen if we did close the loop
- We let the input be: $R=A\sin(\omega t)$
	- which can be represented as: $R = Ae^{j\omega t}$

### 1. Take first derivative:

$$
R = Ae^{j\omega t} \implies \frac{dR}{dt}=Rs=Aj\omega e^{j\omega t}
$$
### 2. Move from s-domain to frequency domain

- For frequency response analysis we replace all $s$ with $j\omega$
- For first order systems:
$$
G(s)=\frac1{1+\tau s}\implies G(j\omega)=\frac1{1+j\omega \tau}
$$
- 
- For second order systems:
$$
G(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_ns+\omega_n^2}\implies G(j\omega)=\frac{\omega_n^2}{-\omega^2+2\zeta\omega_nj\omega+\omega_n^2}
$$
- where $\omega_n$ is the natural frequency and $\omega$ is the driving frequency 

### 3. Simplify Expression to Calculate Amplitude and Phase
- We can then rearrange this (complex) expression in the form: 
	- $a+jb$ 
	- where: $a = \text{Re}\{G(j\omega)\}$ and $b = \text{Im}\{G(j\omega)\}$
- This will usually start with a complex number in the denominator which you move to the numerator by multiplying both by the complex conjugate, $a-jb$
- We calculate the amplitude of the response as:
$$
AR = |G(j\omega)| = \sqrt{a^2+b^2}
$$
- We calculate the phase of the response as:
$$
\phi = \angle{G(j\omega)} = \text{atan2}(b, a)
$$

## Representations of Frequency Response

### Nyquist Plot

- Nyquist diagram is a polar plot on the complex plane (Argrand diagram) of the open loop frequency locus $G(j\omega)H(j\omega)$
- The amplitude ratio is the radial coordinate
- The phase angle is the angular coordinate


### Bode Plots
- Bode plots consist of two loglog plots which represent __amplitude__ and __phase__ as a function of __frequency__
- Drawing the plots for more complex functions can be difficult to do by hand thus we can 
- Each part of a transfer function has a certain type of frequency response:
- Building blocks:
	- Gain $\rightarrow K$
	- Differentiator $\rightarrow s$
	- Integrator $\rightarrow \frac1s$
	- First order lead $\rightarrow 1+\tau s$
	- Frist order lag $\rightarrow \frac1{1+\tau s}$
	- Second order lead $\rightarrow \frac{s^2}{\omega_n^2}+\frac{2\zeta}{\omega_n}+1$
	- Second order lag $\rightarrow \frac1{\text{second order lead}}$



### Analysis of a First Order System for Bode Plots
- Looking at the first order system:
$$
G(j\omega)=\frac1{1+j\omega \tau}
$$
- Notice that as $\omega \rightarrow 0$,
	- The real part dominates:
	- $\text{Im}\{G(j\omega)\}\rightarrow 0$ and $\text{Re}\{G(j\omega)\}\rightarrow 1$
	- Since the imaginary part goes to 0, the phase goes to 0: $\angle{G(j\omega)} \rightarrow 0^o$ 
	- And the amplitude ratio: $|G(j\omega)|\rightarrow 1$

- And as $\omega \rightarrow \infty$,  
	- The imaginary part dominates:
	- $\text{Im}\{G(j\omega)\}\rightarrow 0$ and $\text{Re}\{G(j\omega)\} >> \text{Im}\{G(j\omega)\}$
	- There is a phase shift of: $\angle{G(j\omega)} \rightarrow -90^o$ 

- Between these values, the behavious depends on $\tau$
- 

- We can 

### Analysis of a Second Order System for Bode Plots
- Looking at the second order system:
- Thinking about the concept of complex poles or xeros, they seem impossible; how can there be complex values in a system, there cannot be complex valued resistors or complex valued spring constants
- This actually occurs when there are second+ order systems which produce transfer functions with imaginary poles