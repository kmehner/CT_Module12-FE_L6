import React, { useEffect, useState } from 'react'
import { Form, Button, Container  } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const EditPost = () => {
    const {id} = useParams()
    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0
    })

    const fetchSinglePost = async () => {
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
            // console.log(response.data[0])
            return response.data[0]
        }
        catch(err){ 
            console.error(err)
            return null 
        }
    }

    // Update the local state with the fetched post
    const updatePost = async () => {
        const data = await fetchSinglePost();

        if (data) {
            setPost({
                id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId,
            });
        } else {
            console.warn('No data found for post');
        }
    };


    // Explanation: You cannot call and async function and wait for the results in useEffect directly. 
    // You need to create a separate function and call it inside useEffect. This is because useEffect cannot be an async function.
    useEffect(() => {
        updatePost()
    }, [id])


    // Call the API to edit the post
    const editPostAPI = async (updatedPost) => {
        try {
            const response = await axios.put(
                `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
                {
                    title: updatedPost.title,
                    body: updatedPost.body,
                    userId: updatedPost.userId,
                },
                {
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                }
            );
            console.log('Post updated:', response.data);
            alert('Post updated successfully!');
        } catch (err) {
            console.error('Error updating post:', err);
            alert('Failed to update post.');
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        editPostAPI(post);
    };

    return (
        <Container>
            <h1>Edit Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        onChange={(event) =>
                            setPost({ ...post, title: event.target.value })
                        }
                        value={post.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter body"
                        onChange={(event) =>
                            setPost({ ...post, body: event.target.value })
                        }
                        value={post.body}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>User Id:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter User Id"
                        onChange={(event) =>
                            setPost({ ...post, userId: Number(event.target.value) })
                        }
                        value={post.userId}
                    />
                </Form.Group>


                <Button variant="success" type="submit">
                    Edit Post
                </Button>
            </Form>
        </Container>
    )
}

export default EditPost