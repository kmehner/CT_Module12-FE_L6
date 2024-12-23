import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'

const PostForm = () => {

    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0
    })

    const addPostAPI = async (post) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts',
            {title: post.title,
            body: post.body,
            userId: post.userId}, 
            {headers: {'Content-type': 'application/json; charset=UTF-8',}}
        )
        return response.data
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        addPostAPI(post)
    }

    return (
        <Container>
            <h1>Add Post</h1>
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
                    Add Post
                </Button>
            </Form>
        </Container>
    )
}

export default PostForm