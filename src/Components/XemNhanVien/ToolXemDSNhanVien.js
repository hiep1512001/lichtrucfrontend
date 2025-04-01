import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
const ToolXemDSNhanVien = (props) => {

    const dsnhanvien = props.dsNhanVien;

    const [dsNhanVienFilter, setDsNhanvienFilter] = useState([]);
    useEffect(() => {
        setDsNhanvienFilter(dsnhanvien);
    }, [dsnhanvien])
    const handleInputChange = (e) => {
        let data = dsnhanvien.filter((x) => {
            return x.tenNhanVien.toString().toLowerCase().indexOf(e.target.value.toString().toLowerCase()) !== -1
        });
        setDsNhanvienFilter(data);
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
        {
            name: "NĂM SINH",
            selector: row => row.ngaySinh,
            sortable: true,
        },
    ];
    return (<div >
        <motion.div
            key="component1"
            initial={{ x: '-100%' }}       // Vị trí ban đầu ra ngoài màn hình (bên phải)
            animate={{ x: 0 }}            // Vị trí cuối cùng (hiển thị trong màn hình)
            exit={{ x: '100%' }}         // Khi rời đi, di chuyển ra ngoài màn hình (bên trái)
            transition={{ duration: 0.5 }}  // Thời gian chuyển động
            className="component-box"
        >
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
                                        aria-label="Search" aria-describedby="basic-addon2" onKeyUp={handleInputChange} />
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
                            <DataTable
                                columns={columns}
                                data={dsNhanVienFilter}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>

    </div>)
}
const mapStateToProp = (state) => {
    return {
        dsNhanVien: state.taskNhanVien
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(ToolXemDSNhanVien)