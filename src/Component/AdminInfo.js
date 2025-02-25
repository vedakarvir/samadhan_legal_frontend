import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Menubar from './Menubar';
import Footer from './Footer';
import { useParams, Link } from 'react-router-dom';
// import prs from '../Images/prs.png';

export default function AdminInfo() {
    // const [clientData, setClientData] = useState("");
    const [data, setData] = useState([]);
    // const [name,setName] = useState('');

    // const navigate = useNavigate();
    const adminId = useParams();
    // console.log(clientId);

    useEffect(() => {
        const getClient = () => {
            fetch(`https://samadhan-legal-services.onrender.com/getAdmin/${adminId.adminId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data, "userData");
                    setData(data.data);
                });
        };

        getClient(); // Call the function immediately

    }, [adminId]); // Add clientId to the dependency array

    // useEffect(() => {
    //     getClient();

    // },[])

    // const getClient = () => {
    //     fetch(`/getClient/${clientId.clientId}`, {
    //         method: "GET",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data, "userData");

    //             setData(data.data);
    //         });

    // }
    return (
        <>
            <Menubar />
            <div className='container-fluid d-flex align-items-center justify-content-center vh-100'>
            <div className='profile' style={{ maxWidth: "800px", width: " 60%", margin: "50px auto" }}>
                <div class="d-flex justify-content-end">
                    <Link to="/adminDetails"><button className=" float-end" style={{ border: "none", padding: "4px" }}>Back
                        {/* <img style={{ borderRadius: '50%', width: '35px', height: '35px', objectFit: 'cover'}}src={prs} alt="back"/> */}
                    </button></Link>
                </div>
                <h3 style={{ textAlign: "center" }}>My Profile</h3>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>

                    <img style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }}
                        src={`https://samadhan-legal-services.onrender.com/${data?.image}`} alt='profile' />
                </div><br /><br />
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h4 style={{ display: "inline" }}>Name: </h4>
                    <h3 style={{ display: "inline" }}>{data.name}</h3><br />
                    <h4 style={{ display: "inline" }}>Email: </h4>
                    <h5 style={{ display: "inline" }}>{data.email}</h5>
                </div>


            </div>

            </div>

            <Footer />
        </>
    )
}