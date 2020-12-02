import React, { useEffect, useState } from 'react'
import { db } from './../firebase'
import './../App.css'

function UploadList({ authCode }) {

    const [uploadList, setUploadList] = useState({
        subject_code: []
    })

    const fetchUpload = async () => {
        const uid = localStorage.getItem('uid')
        db.ref(`/users/${uid}/upload/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if (data) {
                setUploadList({
                    subject_code: Object.keys(data),
                    data: data
                })
            }
        })
    }

    useEffect(() => {
        fetchUpload()
    }, db.ref(`/users/${localStorage.getItem('uid')}/upload/`))

    return (
        <>
            <div>

                {uploadList.subject_code.map((key, index) => {
                    return (
                        <>

                            <li key={index}>{`subject code : ${key}`} Subject name : {uploadList.data[key].name} link :

                            <br></br>
                                <a className='download' onClick={() => window.location.href = uploadList.data[key].fileUrl}>download</a>
                            </li>
                            <hr></hr></>)
                })
                }
            </div>

        </>
    )

}

export default UploadList