import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import axios from 'axios';
const ToolXemDSNhanVien = () => {
    const fetchGetBTD_KP = async () => {
        try {
            const response = await axios.get('http://localhost:85/api/btd_kp');
            setNtd_Kp(response.data)

        } catch (err) {

        }
    }
    const fetchGetDSNHanVien = async (makp) => {
        try {
            const response = await axios.get(`http://localhost:85/api/HSNhanVien/${makp}`);
            console.log(response.data)
            setDsNhanvien(response.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchGetBTD_KP()
    }, [])
    const [btd_KP, setNtd_Kp] = useState([]);
    const [dsnhanvien, setDsNhanvien] = useState([]);
    const [selectKP, setSelectKp] = useState(-1);
    var elementSelectKP = btd_KP.map((item, index) => {
        return <option value={item.makp} key={index}>{item.tenkp}</option>
    })
    var handleChonKhoaPhong = () => {
        if (selectKP === -1) {
            toast.error('Chưa chọn khoa phòng', {
                position: 'bottom-right',
            });
            return false;
        }
        else {
            fetchGetDSNHanVien(selectKP)
        }
    }
    const columns = [
        {
            name: "MÃ NHÂN VIÊN",
            selector: row => row.manv,
            sortable: true,
        },
        {
            name: "TÊN NHÂN VIÊN",
            selector: row => row.tenNhanVien,
            sortable: true,
        },
    ];
    return (<div className="container-fluid">
        <motion.div
            key="component1"
            initial={{ x: '-100%' }}       // Vị trí ban đầu ra ngoài màn hình (bên phải)
            animate={{ x: 0 }}            // Vị trí cuối cùng (hiển thị trong màn hình)
            exit={{ x: '100%' }}         // Khi rời đi, di chuyển ra ngoài màn hình (bên trái)
            transition={{ duration: 0.5 }}  // Thời gian chuyển động
            className="component-box"
        >
            <div className="row mt-3">
                <div className="card  border-left-warning shadow h-70 py-2 col-12" >
                    <div className="card-header bg-gradient-warning text-white">
                        <h5>Chọn khoa phòng</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <label className='col-form-label'>Chọn khoa phòng:</label>
                            </div>
                            <div className="col-12 mb-3">
                                <select className="form-control " data-live-search="true" onChange={(e) => { setSelectKp(e.target.value) }}>
                                    <option value={-1}>Vui lòng chọn khoa phòng</option>
                                    {elementSelectKP}
                                </select>
                            </div>
                            <div className='col-12 mb-2'>
                                <button className='btn btn-primary' onClick={handleChonKhoaPhong}>
                                    <i className="fas fa-list mr-1" ></i>
                                    <span>Xem danh sách nhân viên</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="card border-left-primary shadow h-70 py-2 mb-4 mt-4 col-12">
                    <div className="card-header py-3">
                        <div className='row'>
                            <div className='col-6'>
                                <h6 className="m-0 font-weight-bold text-primary">Danh sách nhân viên </h6>
                            </div>
                            <div className='col-6 d-flex justify-content-end'>
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-1 small" placeholder="Tìm kiếm theo tên..."
                                        aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            {/* <table className="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Mã nhân viên</th>
                                        <th>Tên nhân viên</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Mã nhân viên</th>
                                        <th>Tên nhân viên</th>

                                    </tr>
                                </tfoot>
                                <tbody>
                                    {elementTableNhanVien}
                                </tbody>
                            </table> */}
                            <DataTable
                                columns={columns}
                                data={dsnhanvien}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
        <ToastContainer />
    </div>)
}
export default ToolXemDSNhanVien