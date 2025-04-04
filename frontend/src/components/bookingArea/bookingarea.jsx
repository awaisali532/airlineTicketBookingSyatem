import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './Bookingarea.css'; // Custom CSS import
import Bookingcontent from './bookingcontent';

const Bookingarea = () => {
  return (
    <div>
        <div className='position-relative mt-2'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='booking-wrap'>
                            <ul className='nav nav-tabs' id = "myTab" role='tablist'>
                                <li className='nav-item' role='presentation'>
                                <button className="nav-link active" id="bOOKing-tab" data-bs-toggle="tab" data-bs-target="#bOOKing-tab-pane" type="button" role="tab" aria-controls="bOOKing-tab-pane" aria-selected="true">
                                <i class="bi bi-airplane"></i>
                                air BOOKing</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="trips-tab" data-bs-toggle="tab" data-bs-target="#trips-tab-pane" type="button" role="tab" aria-controls="trips-tab-pane" aria-selected="false">
                                        <i class="fa-solid fa-file-lines"></i>
                                        my trips</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="check-tab" data-bs-toggle="tab" data-bs-target="#check-tab-pane" type="button" role="tab" aria-controls="check-tab-pane" aria-selected="false"><i class="fa-regular fa-circle-check"></i> check-in</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="flight-tab" data-bs-toggle="tab" data-bs-target="#flight-tab-pane" type="button" role="tab" aria-controls="flight-tab-pane" aria-selected="false"><i class="fa-regular fa-clock"></i>Flight status</button>
                                    </li>
                            </ul>
                            <Bookingcontent/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bookingarea