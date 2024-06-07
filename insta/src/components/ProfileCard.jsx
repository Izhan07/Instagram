import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Button, Input } from './index';
import { set, useForm } from 'react-hook-form';
import { Logout } from '../components/index';
import './component.css';

export default function ProfileCard() {
    const userData = useSelector((state) => state.auth.userData);
    const dp_id = userData ? userData.$id : null;
    const [reqfile, setReqfile] = useState(null);
    const { handleSubmit, register } = useForm();
    const [loading, setLoading] = useState(true);
    const [array, setarray] = useState([])
   

    const [ids, setIds] = useState([]);
    useEffect(()=>{
        const fetchdata = async()=>{
            await service.getfile([])
            .then((list)=>{
                if(list){
                    setarray(list.files)
                }
            })
        }
        fetchdata()
    },[])

    useEffect(()=>{
        if(array.length > 0){
            const req = array.find((ob)=> ob.$id === dp_id)
           setReqfile(req)
            
        }
    },[array])
    
    useEffect(()=>{
        if(reqfile){
            setLoading(false)
        }else{
            setLoading(false)
        }
    },[reqfile,loading])

 
    
    const handleFileUpload = async (data) => {
        try {
            const uploaded = await service.uploadPic(data.image[0], dp_id);
            if (uploaded) {
              
            }
        } catch (error) {
            console.error('Error uploading file:', error);
          
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-card'>
            <div className='dp'><img src={service.getFilePreview(dp_id)} alt="Profile" /></div>
            <form onSubmit={handleSubmit(handleFileUpload)}>
                {reqfile ? (
                    <div className='p-content'>
                        <div className='p-btn'>
                            {userData && <h2>{userData.name}</h2>}
                            <Button className="btn" children={"Edit Profile"} />
                            <Logout className="btn" />
                        </div>
                        <div className='p-data'>
                            <p><b>4</b> posts</p>
                            <p><b>93</b> followers</p>
                            <p><b>164</b> following</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {userData && <h2>{userData.name}</h2>}
                        <div className='p-content'>
                            <div className='p-btn'>
                                <Input
                                    className="btn"
                                    placeholder="Add Profile picture"
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: true })}
                                />
                             <button  className='btn' type='submit'>Add</button>

                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
