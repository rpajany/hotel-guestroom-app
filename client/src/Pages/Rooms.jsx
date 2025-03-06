import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseURL } from '../utils/custom';
import NavBar from "../Pages/Navbar";
import Swal from 'sweetalert2';
import Footer from '../Pages/Footer';
const Rooms = () => {

    const initialState = {
        Room_Number: "",
        Room_Type: "",
        Rate: ""
    }

    const [saveData, setSaveData] = useState({ initialState });
    const [roomData, setRoomData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {

        const loadData = async () => {
            // setRoomsData([]);
            try {
                const { data } = await axios.get(BaseURL + '/rooms/load');
                if (data && data.length) {

                    // console.log(roomData)
                    setRoomData(data)
                }

            } catch (error) {

            }
        }

        loadData();


    }) // , []

    const handelFormSubmit = async (e) => {
        e.preventDefault();

        // console.log(saveData)


        if (!isEditMode) { // save mode

            try {
                await axios.post(BaseURL + '/rooms/insert',
                    { Room_Number: saveData.Room_Number, Room_Type: saveData.Room_Type, Rate: saveData.Rate }).then((data) => {
                        // console.log(data)
                        // clear textbox
                        setSaveData({ ...initialState })
                    });
            } catch (error) {
                console.log(error)
            }

        } else { // update mode
            try {
                await axios.put(BaseURL + '/rooms/update_AddRoom/' + saveData.Room_Number,
                    { Room_Type: saveData.Room_Type, Rate: saveData.Rate }).then((data) => {
                        // console.log(data)
                        // clear textbox
                        setSaveData({ ...initialState })
                    });
            } catch (error) {
                console.log(error)
            }
        }


        setIsEditMode(false);

    }

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        setSaveData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handelEdit = (data) => {
        console.log(data)

        saveData.Room_Type = data.Room_Type
        saveData.Room_Number = data.Room_Number
        saveData.Rate = data.Rate

        setIsEditMode(true);

    }


    const handelDelete = (data) => {
        // console.log(data.ID)

        Swal.fire({
            title: 'Delete !!!, Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete !'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axios.delete(BaseURL + '/rooms/delete/' + data.ID);
                } catch (error) {
                    console.log(error);
                }

                Swal.fire(
                    'Delete !!',
                    'success'
                )
            }


        })
    }





    return (
        <>
            <NavBar />
            <section className='section' style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>
                <div className='row'>
                    <div className='col-sm-12' style={{ textAlign: 'center' }}>

                    </div>
                </div>
                <div className="card border-info">
                    <div className="text-white bg-info">
                        <h5 className="card-header">Add / Edit - Room</h5>
                    </div>

                    <div className="card-body" style={{ backgroundColor: '' }}>




                        <div className='row'>
                            <div className='col-sm-6'>
                                <form onSubmit={handelFormSubmit}>
                                    <div className='form-group row'>
                                        <label htmlFor='Room_Number' className='form-label col-sm-3'>Room Number</label>
                                        <div className='col-sm-3'>
                                            {/* <input type="text" value={saveData.Room_Number} onChange={(e) => { setSaveData((saveData) => ({ ...saveData, Room_Number: e.target.value })) }} id="Room_Number" name="Room_Number" className='form-control' required></input> */}
                                            <input type="text" value={saveData.Room_Number} onChange={handelInputChange} id="Room_Number" name="Room_Number" className='form-control' required></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label htmlFor='Room_Type' className='form-label col-sm-3'>Room Type</label>
                                        <div className='col-sm-3'>
                                            <input type="text" value={saveData.Room_Type} onChange={handelInputChange} id="Room_Type" name="Room_Type" className='form-control' required></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label htmlFor='Rate' className='form-label col-sm-3'>Rate</label>
                                        <div className='col-sm-3'>
                                            {/* <input type="text" value={saveData.Rate} onChange={(e) => { setSaveData((saveData) => ({ ...saveData, Rate: e.target.value })) }} id="Rate" name="Rate" className='form-control' required></input> */}
                                            <input type="text" value={saveData.Rate} onChange={handelInputChange} id="Rate" name="Rate" className='form-control' required></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-sm-3'></div>
                                        <div className='col-sm-3'>
                                            {/* <button type="submit" className='btn btn-success btn-block'>Save</button> */}
                                            <button type="submit" className={isEditMode ? 'btn btn-block btn-sm btn-warning' : 'btn btn-block btn-sm btn-success'}>{isEditMode ? 'Update' : 'Add'}</button>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div >




                        <div className='row'>
                            <div className='col-sm-6'>
                                <table className="table table-md table-striped table-responsive table-bordered" style={{ maxHeight: '350px' }}>

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Room No.</th>
                                            <th>Room Type</th>
                                            <th>Daily_Rent</th>
                                            <th colSpan={2}>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {roomData.map((data, index) => {
                                            return (
                                                <tr key={data.ID}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.Room_Number}</td>
                                                    <td>{data.Room_Type}</td>

                                                    <td>{data.Rate}</td>
                                                    <td><button type="button" id="btn_Insert" name="btn_Insert" onClick={() => { handelEdit(data) }} className='btn btn-sm btn-warning'>Edit</button></td>
                                                    <td><button type="button" id="btn_Delete" name="btn_Delete" onClick={() => { handelDelete(data) }} className='btn btn-sm btn-danger'>Delete</button></td>


                                                </tr>

                                            )
                                        })}



                                    </tbody>

                                </table>
                            </div>
                        </div>


                    </div>
                </div >




            </section >
            <Footer />
        </>

    );
}

export default Rooms;