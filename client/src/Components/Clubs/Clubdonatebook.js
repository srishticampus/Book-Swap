import React, { useState } from 'react'
import "../Readers/Readerdonatebook.css"
import axiosInstance from '../../BaseUrl';
import img from '../../Assets/donateimg.png'
// import axios from 'axios';
import { toast } from 'react-toastify';



function Readerdonatebook() {
    const id=localStorage.getItem("libraryid")
    console.log(id);
    const[clubdonate,setclubdonate]=useState({
        bookname:"",
        authername:"",
        publisher:"",
        publisheryear:"",
        count:0,
        libraryid:id,
        image:"",
    })

    const changefn=(a)=>{
        if(a.target.name === "image"){
            setclubdonate({...clubdonate,image:a.target.files[0]});
        }
        else{
            setclubdonate({...clubdonate,[a.target.name]:a.target.value});
        }
        console.log(clubdonate);
    }

    const subfn=(b)=>{
        b.preventDefault()
        axiosInstance.post(`/addBook`,clubdonate,{headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result)=>{
            console.log("data entered successfully",result);
            if(result.status===200){
                toast.success("Book Donated Successfully")
                window.location.reload();


            }else{
                alert("failed to entered")
            }
        })
        .catch((error)=>{
            console.log("error",error);
        })
    }

    return (
        <div className="reader_donatebook">
            <div className="container">
                <div className='row'>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <img src={img} alt='images' className='img_fluid' />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2'>
                        <p className='reader_donatebooke_heading'>
                            Add Book
                        </p>
                        <form onSubmit={subfn}>
                            <div className='row'>
                                <div className='row align-items-center '>
                                    <label className='col-sm-4 donatebook_label'>Book Name</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="text" placeholder="" name='bookname' value={clubdonate.bookname} onChange={changefn} required title="Please fill the field"/>
                                    </div>
                                    <label className='col-sm-4 donatebook_label'>Author Name</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="text" placeholder="" name='authername' value={clubdonate.authername} onChange={changefn} required/>
                                    </div>
                                    <label className='col-sm-4 donatebook_label'>Publisher</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="text" placeholder="" name='publisher' value={clubdonate.publisher} onChange={changefn} required />
                                    </div>
                                    <label className='col-sm-4 donatebook_label'>Publishing year</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="number" placeholder="" name='publisheryear' value={clubdonate.publisheryear} onChange={changefn} required/>
                                    </div>
                                    <label className='col-sm-4 donatebook_label'>Count</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="number" placeholder="" name='count' onChange={changefn} required/>
                                    </div>
                                    <label className='col-sm-4 donatebook_label'>Select a Image</label>
                                    <div className='col-sm-8 reader_donatebook_inputs'>
                                        <input type="file" placeholder="" name='image' onChange={changefn} required/>
                                    </div>
                                    <div className='col-sm-8 reader_donatebook_inputs '>
                                        <button className="btn btn-primary " id='readerdonatebook_button'>Donate</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Readerdonatebook