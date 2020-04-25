"""
MNIST simple
4 full connected layers
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
	Lay1 = 500
	Lay2 = 200
	Lay3 = 60

	w1 = tf.Variable(tf.truncated_normal(shape=[784, Lay1], stddev=0.1), name="weights1")
	b1 = tf.Variable(tf.zeros([Lay1]), name="bias1")
	w2 = tf.Variable(tf.truncated_normal(shape=[Lay1, Lay2], stddev=0.1), name="weights2")
	b2 = tf.Variable(tf.zeros([Lay2]), name="bias2")
	w3 = tf.Variable(tf.truncated_normal(shape=[Lay2, Lay3], stddev=0.1), name="weights3")
	b3 = tf.Variable(tf.zeros([Lay3]), name="bias3")
	w4 = tf.Variable(tf.truncated_normal(shape=[Lay3, 10], stddev=0.1), name="weights4")
	b4 = tf.Variable(tf.zeros([10]), name="bias4")

	#Model ####################################################################
	with tf.name_scope("layer1"):
		Y1 = tf.nn.relu(tf.matmul(X, w1) + b1)
	with tf.name_scope("dropout1"):
		dropped1 = tf.nn.dropout(Y1, keep_prob)
	with tf.name_scope("layer2"):
		Y2 = tf.nn.relu(tf.matmul(dropped1, w2) + b2)
	with tf.name_scope("dropout2"):
		dropped2 = tf.nn.dropout(Y2, keep_prob)
	with tf.name_scope("layer3"):
		Y3 = tf.nn.relu(tf.matmul(dropped2, w3) + b3)
	with tf.name_scope("dropout3"):
		dropped3 = tf.nn.dropout(Y3, keep_prob)
	with tf.name_scope("layer4"):
		Y_logits = tf.matmul(dropped3, w4) + b4
		Y_pred = tf.nn.softmax(Y_logits)

	with tf.name_scope("loss"):
		cross_entropy = tf.nn.softmax_cross_entropy_with_logits(Y_logits, Y)
		loss = tf.reduce_mean(cross_entropy)*100
		tf.scalar_summary("loss", loss)

	with tf.name_scope("accuracy"):
		correct_prediction = tf.equal(tf.argmax(Y_pred, 1), tf.argmax(Y, 1))
		accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
		tf.scalar_summary('accuracy', accuracy)

	train_step = tf.train.GradientDescentOptimizer(FLAGS.learning_rate).minimize(loss)

	def feed_dict(isTraining):
		if isTraining:
			xs, ys = data.train.next_batch(100)
			k = FLAGS.dropout
		else:
			xs, ys = data.test.images, data.test.labels
			k = 1.0
		return {X:xs, Y:ys, keep_prob:k}
	
	#Run ######################################################################
	with tf.Session() as sess:
		merged = tf.merge_all_summaries()
		train_writer = tf.train.SummaryWriter(FLAGS.logdir +"/train", sess.graph)
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