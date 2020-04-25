"""
MNIST simple
2 conv + 2 full connected layers
"""

import argparse
import tensorflow as tf

from tensorflow.examples.tutorials.mnist import input_data

FLAGS = None

def getMnistData():
	return input_data.read_data_sets(FLAGS.datadir, one_hot=True)

def train(data):
	#Input placeholders #######################################################
	X = tf.placeholder(tf.float32, [None, 784], name="x-input")
	Y = tf.placeholder(tf.float32, [None, 10], name="y-input")
	keep_prob = tf.placeholder(tf.float32)
	#Variables ################################################################
	Lay1 = 512
	Lay2 = 10 #num different labels

	conv1_w = tf.Variable(tf.truncated_normal([5,5,1,32], stddev=0.1), name="conv1_weights")
	conv1_b = tf.Variable(tf.constant(0.1, shape=[32]), name="conv1_bias")

	conv2_w = tf.Variable(tf.truncated_normal([5,5,32,64], stddev=0.1), name="conv2_weights")
	conv2_b = tf.Variable(tf.constant(0.1, shape=[64]), name="conv2_bias")

	w1 = tf.Variable(tf.truncated_normal(shape=[ 7*7*64, Lay1], stddev=0.1), name="fc_weights1")
	b1 = tf.Variable(tf.constant(0.1, shape=[Lay1]), name="fc_bias1")
	w2 = tf.Variable(tf.truncated_normal(shape=[Lay1, Lay2], stddev=0.1), name="fc_weights2")
	b2 = tf.Variable(tf.constant(0.1, shape=[Lay2]), name="fc_bias2")

	#Model ####################################################################
	#reshape input
	x_img = tf.reshape(X, [-1, 28, 28, 1])
	with tf.name_scope("conv1"):
		C1 = tf.nn.relu(tf.nn.conv2d(x_img, conv1_w, strides=[1,1,1,1], padding="SAME") + conv1_b)
		P1 = tf.nn.max_pool(C1, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
	with tf.name_scope("conv2"):
		C2 = tf.nn.relu(tf.nn.conv2d(P1, conv2_w, strides=[1,1,1,1], padding="SAME") + conv2_b)
		P2 = tf.nn.max_pool(C2, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
	reshape = tf.reshape(P2, shape=[-1, w1.get_shape().as_list()[0]])
	with tf.name_scope("fc1"):
		H = tf.nn.relu(tf.matmul(reshape, w1) + b1)
	with tf.name_scope("dropout"):
		dropped = tf.nn.dropout(H, keep_prob)
	with tf.name_scope("fc2"):	
		Y_logits = tf.matmul(dropped, w2) + b2
		Y_pred = tf.nn.softmax(Y_logits)

	with tf.name_scope("loss"):
		cross_entropy = tf.nn.softmax_cross_entropy_with_logits(Y_logits, Y)
		loss = tf.reduce_mean(cross_entropy)
		tf.scalar_summary("loss", loss)

	with tf.name_scope("accuracy"):
		correct_prediction = tf.equal(tf.argmax(Y_pred, 1), tf.argmax(Y, 1))
		accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
		tf.scalar_summary('accuracy', accuracy)

	train_step = tf.train.GradientDescentOptimizer(FLAGS.learning_rate).minimize(loss)

	def feed_dict(isTraining):
		if isTraining:
			xs, ys = data.train.next_batch(64)
			k = FLAGS.dropout
		else:
			xs, ys = data.test.next_batch(64)
			k = 1.0
		return {X:xs, Y:ys, keep_prob:k}
	
	#Run ######################################################################
	with tf.Session() as sess:
		merged = tf.merge_all_summaries()
		train_writer = tf.train.SummaryWriter(FLAGS.logdir+"/train", sess.graph)
		test_writer = tf.train.SummaryWriter(FLAGS.logdir + '/test')
		
		init = tf.initialize_all_variables()
		sess.run(init)

		for i in range(FLAGS.max_steps):
			if i % 10 == 0:
				summary, acc = sess.run([merged, accuracy], feed_dict=feed_dict(False))
				test_writer.add_summary(summary, i)
				print('Accuracy at step %s: %s' % (i, acc))
			else :
				summary, _ = sess.run([merged, train_step], feed_dict=feed_dict(True))
				train_writer.add_summary(summary, i)
		train_writer.close()
		test_writer.close()

def main():
	if tf.gfile.Exists(FLAGS.logdir):
		tf.gfile.DeleteRecursively(FLAGS.logdir)
	tf.gfile.MakeDirs(FLAGS.logdir)
	data = getMnistData()
	train(data)

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("--max_steps", type=int, default=1000)
	parser.add_argument("--learning_rate", type=float, default=0.003)
	parser.add_argument("--dropout", type=float, default=0.75)
	parser.add_argument("--name", type=str, default="noName")
	parser.add_argument("--datadir", type=str, default="mnist_simple/data", help="data dir")
	parser.add_argument("--logdir", type=str, default="mnist_simple/logs", help="log dir")
	FLAGS = parser.parse_args()
	FLAGS.logdir = FLAGS.logdir + "/" + FLAGS.name
	main()