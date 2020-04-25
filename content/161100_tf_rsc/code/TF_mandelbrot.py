# Mandelbrot using tensorflow
# Source: https://tensorflow.googlesource.com/tensorflow/+/master/tensorflow/g3doc/tutorials/mandelbrot/index.md
# https://github.com/tobigithub/tensorflow-deep-learning/wiki

# Import libraries for simulation
import tensorflow as tf
import numpy as np

# Imports for visualization
import PIL.Image
from cStringIO import StringIO

def DisplayFractal(a, fmt='png'):
  """Display an array of iteration counts as a
     colorful picture of a fractal."""
  a_cyclic = (6.28*a/20.0).reshape(list(a.shape)+[1])
  img = np.concatenate([64*np.cos(a_cyclic),
                        96*np.sin(a_cyclic),
                        128*np.cos(a_cyclic)], 2)
  img[a==a.max()] = 0
  a = img
  a = np.uint8(np.clip(a, 0, 255))
  PIL.Image.fromarray(a).save("mandel.png", fmt)

sess = tf.Session()

# Use NumPy to create a 2D array of complex numbers
Y, X = np.mgrid[-1.3:1.3:0.005, -2:1:0.005]
Z = X+1j*Y

xs = tf.constant(Z.astype("complex64"))
zs = tf.Variable(xs)
ns = tf.Variable(tf.zeros_like(xs, "float32"))

sess.run(tf.initialize_all_variables())

# Compute the new values of z: z^2 + x
zs_ = zs*zs + xs

# Have we diverged with this new value?
not_diverged = tf.complex_abs(zs_) < 4

# Operation to update the zs and the iteration count.
step = tf.group(
  zs.assign(zs_),
  ns.assign_add(tf.cast(not_diverged, "float32"))
  )

for i in range(200): sess.run(step)

DisplayFractal(ns.eval(sess))

### END