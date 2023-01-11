import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditBook() {

    let navigate = useNavigate();

    const {id}=useParams();

    const [book, setBook] = useState({
        title: "",
        author: "",
        rating: ""
    })

    const { title, author, rating } = book

    const onInputChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        loadBook();
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/book/${id}`, book);
        navigate("/");
    }

    const loadBook =async ()=>{
        const result=await axios.get(`http://localhost:8080/book/${id}`)
        setBook(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Book</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='title' className='form-label'>
                                Title
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter book title'
                                name='title'
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='author' className='form-label'>
                                Author
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter book author'
                                name='author'
                                value={author}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='rating' className='form-label'>
                                Rating
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter score out of 10'
                                name='rating'
                                value={rating}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>
                            Submit
                        </button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}