import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ToolXemDSNhanVien from "./ToolXemDSNhanVien";
import { connect } from 'react-redux';
import * as actions from "../../actions/index"
import ToolXemLichTruc from "./ToolXemLichTrucNhanVien";
const ToolNhanVien = (props) => {
    const [selectKP, setSelectKp] = useState(-1);
    const [btd_KP, setNtd_Kp] = useState([]);
    var elementSelectKP = btd_KP.map((item, index) => {
        return <option value={item.makp} key={index}>{item.tenkp}</option>
    })
    useEffect(() => {
        fetchGetBTD_KP()
    }, [])
    const fetchGetBTD_KP = async () => {
        try {
            const response = await axios.get('http://localhost:85/api/btd_kp');
            let data = response.data
            data.sort((a, b) => a.tenkp.localeCompare(b.tenkp));
            setNtd_Kp(data)

        } catch (err) {

        }
    }
    const fetchGetDSNHanVien = async (makp) => {
        try {
            const response = await axios.get(`http://localhost:85/api/HSNhanVien/${makp}`);
            let data = response.data;

            data.sort((a, b) => {
                // Tách họ và tên đầy đủ
                let nameA = a.tenNhanVien.trim().split(' ');
                let nameB = b.tenNhanVien.trim().split(' ');
                // Lấy họ (phần đầu tiên của chuỗi)
                let lastNameA = nameA[0];
                let lastNameB = nameB[0];

                // Lấy tên (phần còn lại của chuỗi)
                let firstNameA = nameA.slice(1).join(' ');
                let firstNameB = nameB.slice(1).join(' ');

                // So sánh họ trước (theo tiếng Việt)
                if (lastNameA !== lastNameB) {
                    return lastNameA.localeCompare(lastNameB, 'vi', { sensitivity: 'accent' });
                }

                // Nếu họ giống nhau, so sánh tên
                return firstNameA.localeCompare(firstNameB, 'vi', { sensitivity: 'accent' });
            });
            props.onSetDSNhanVien(data)

        } catch (err) {

        }
    }
    const handleDSNhanVien = () => {
        if (selectKP === -1) {
            toast.error('Chưa chọn khoa phòng', {
                position: 'bottom-right',
            });
            return false;
        }
        else {
            fetchGetDSNHanVien(selectKP)
            props.onSetShowTool(1)
        }
    }
    const handlBangChamCong = () => {
        props.onSetShowTool(2)
    }
    var element = () => {
        if (props.showTool === 1) {
            return <ToolXemDSNhanVien></ToolXemDSNhanVien>
        }
        else if (props.showTool === 2) {
            return <ToolXemLichTruc></ToolXemLichTruc>
        }
        else {
            return ""
        }
    }
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="card  border-left-success shadow h-70 py-2 col-12" >
                    <div className="card-header bg-gradient-success text-white">
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
                                <button className='btn btn-outline-primary mr-2' onClick={handleDSNhanVien}>
                                    <i className="fas fa-list mr-1" ></i>
                                    <span>Xem danh sách nhân viên</span></button>
                                <button className='btn btn-outline-danger' onClick={handlBangChamCong}>
                                    <i className="fas fa-table mr-1"></i>
                                    <span>Xem bảng chấm công nhân viên</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {element()}
            <ToastContainer />
        </div>
    )
}
const mapStateToProp = (state) => {
    return {
        dsNhanVien: state.taskNhanVien,
        showTool: state.taskShowTool
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetDSNhanVien: (arr) => {
            dispatch(actions.setDSNhanVien(arr));
        },
        onSetShowTool: (value) => {
            dispatch(actions.setShowTool(value));
        }
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(ToolNhanVien)