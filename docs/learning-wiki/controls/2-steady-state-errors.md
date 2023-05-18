---
date: October 22, 2022
---
# Steady State Errors

- We use feedback control to reduce steady-state error
- Ex. consider you are driving a car and you want to travel at a speed of $u$ 
	- You know that your motor must apply a torque of $y$ to move at $u$ speed
	- However, when you reach a ramp, you notice that your speed decreases and thus, in order account for this error, $e$, your motor must apply more torque (feedback)
	- This is why you need a closed loop system, in an open loop system you wouldn't have a notion of error
- Steady-state error is error after the transient response has decayed
- If error is unacceptable, the control system will need modification
- Errors are evaluated using standardised inputs
	- Step inputs
	- Ramp inputs
	- Sinusoidal inputs

## No SS Error

![](learning-wiki/controls/img/2.1.png){width=50%}

- $t_s$ is the point at which the response remains within 5% of the steady state
- Errors can be caused by factors including:
	1. Instrumentation of measurement errors 
	2. System non-linearities – deadbands, hysteresis, saturation etc. 
	3. Form of input signal 
	4. Form of system transfer function 
	5. External disturbances acting on the system, for example: forces or torques


![](2.2.png)


