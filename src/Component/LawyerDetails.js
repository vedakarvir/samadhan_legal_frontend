import React, { useState, useEffect } from 'react';
import Menubar from './Menubar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

export default function LawyerDetails() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  useEffect(() => {
    getAllClient();
  }, []);

  const getAllClient = () => {
    fetch(`https://samadhan-legal-services.onrender.com/getAllLawyer`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }

  const deleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch(`https://samadhan-legal-services.onrender.com/lawyer/${id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          console.warn(data);
          getAllClient();
        });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const pageItems = [];
  for (let number = 1; number <= Math.ceil(data.length / itemsPerPage); number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
      <Menubar />
      <div className="text-end my-3 mx-5">
        <Link to="/signUp-lawyer" className="btn btn-primary mx-5 mb-3">Add Lawyer</Link>
      </div>
      <div className="container d-flex justify-content-center align-items-center me-5">
        <div className="table">
          <div className="table-header">
            <div className="row text-center">
              <div className="col-1">Index</div>
              <div className="col-2">Profile</div>
              <div className="col-2">Name</div>
              <div className="col-3 col-md-3 col-sm-4">Email</div>
              <div className="col-1">Edit</div>
              <div className="col-1">View</div>
              <div className="col-1">Delete</div>
            </div>
          </div>

          <div className="table-body">
            {currentItems.map((i, index) => (
              <div key={i._id} className="row text-center">
                <div className="col-1">{index + 1}</div>
                <div className="col-2">
                  <img
                    style={{ width: "40px", height: "45px" }}
                    src={`https://samadhan-legal-services.onrender.com/${i?.image}`}
                    alt="profile"
                  />
                </div>
                <div className="col-2 text-start">{i.name}</div>
                <div className="col-3 col-md-3 col-sm-4">{i.email}</div>
                <div className="col-1">
                  <Link to={`/editLawyer/${i._id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </div>
                <div className="col-1">
                  <Link to={`/getLawyer/${i._id}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </div>
                <div className="col-1">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteProduct(i._id, i.name)}
                  />
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
        {pageItems}
        <Pagination.Next onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
      </Pagination>
      <Footer />
    </>
  )
}
