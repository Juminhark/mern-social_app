import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
	try {
		const postMessage = await PostMessage.find();

		res.status(200).json(postMessage);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new PostMessage(post);

	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409);
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that id');

	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{
			new: true,
		}
	);

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No post with that id');

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	// router에서 보면 auth에서 이미 req.userId에 data를 담았다
	if (!req.userId) return res.json({ message: 'Unauthenticated' });

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No post with that id');

	const post = await PostMessage.findById(id);

	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		// like the post
		post.likes.push(req.userId);
	} else {
		// dislike a post
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	});

	res.json(updatedPost);
};
