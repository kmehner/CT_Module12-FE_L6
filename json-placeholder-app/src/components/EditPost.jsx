import React, { useEffect, useState } from 'react'
import { Form, Button, Container  } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const EditPost = () => {
    const {id} = useParams()

    const fetchSinglePost = async (id) => {
        try{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
        return response.data[0]}
        catch(err){ console.error(err)}
    }
    fetchSinglePost(id)

    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0


    })
    useEffect(() => {
        if (data) {
            console.log(data)
            setPost({id:data.id,
                title:data.title,
                body: data.body, 
                userId: data.userId})
        } else{
            setPost({id:0,
                title: '', 
                body: '', 
                userId: 0})
        }
    }, [data])


    const editPostAPI = async (post) => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
            {title: post.title,
            body: post.body,
            userId: post.userId}, 
            {headers: {'Content-type': 'application/json; charset=UTF-8',}}
        )
        console.log(response)
        return response.data
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        editPostAPI(post)
    }

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