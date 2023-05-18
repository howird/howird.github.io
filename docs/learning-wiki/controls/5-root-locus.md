# Root Locus
### Evan's Rules

- For transfer function:
$$
G(s)=\frac{\text{numerator}}{\text{denominator}}=\frac{\Pi_{i=0}^m (s-z_i)}{\Pi_{i=0}^n (s-p_i)}
$$

- Where:
	- $m$ is the order of the numerator polynomial (number of zeros)
	- $n$ is the order of the denominator polynomial (number of poles)

- To get the characteristic equation, let $G_{CL}(s)$ be the closed loop gain of $P(s)$ with $C(s)=k$
$$
G_{CL}(s) = \frac{C(s)G(s)}{1+C(s)G(s)}
$$

- Therefore, in analyzing the poles of the closed loop gain, $G_{CL}(s)$, we get the characteristic equation:

$$
1+C(s)G(s) = 0
$$
$$
\implies 1+k\frac{\Pi_{i=0}^m (s-z_i)}{\Pi_{i=0}^n (s-p_i)} = 0
$$
$$
\implies \Pi_{i=0}^n (s-p_i)+k{\Pi_{i=0}^m (s-z_i)} = 0
$$

1. The root locus consists of $n$ branches
2. It is symentrical about the real axis
3. As $k \rightarrow 0$ the $n$ branches of the root locus tend towards the poles of $G(s)$, and as $k \rightarrow \infty$,  $m$ branches of the root locus tend towards the zeros of $G(s)$,
4. As $k \rightarrow \infty$, the remaining $n-m$ branches tend towards $\infty$, with straight line symptotes with angles of:

$$
\theta = \frac{\pm (2q+1))180^\text o}{n - m}, \{q|q\in \mathbb Z, q\in[0,n-m)\}
$$
	from a common intersection point at:

$$
\frac{\sum_{i=0}^n p_i - \sum_{i=0}^m z_i}{n - m}
$$

5. Sections of the real axis to the left of an odd number of poles/zeros are branches of the root locus
6. The points of intersection of the branches of a root locus are the roots of $G'(s)$ or $s$ where $0 = \frac d{ds} G(s)$


