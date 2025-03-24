import BangLichTruc from "./BangLichTruc"
import DatePicker from 'react-datepicker';
import { vi } from 'date-fns/locale'; // Import locale tiếng Việt
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của react-datepicker
import { addDays, differenceInDays, format } from 'date-fns';
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { connect } from "react-redux";
import * as actions from '../../actions/index'
var sttNguoiTruc = 0;
const LichTrucThang = (props) => {
    var isShowLichTruc = props.isShowLichTruc;
    var [tuNgay, setTuNgay] = useState(new Date())
    var [denNgay, setDenNgay] = useState(new Date())
    const [nguoiTruc, setNguoiTruc] = useState([
        { id: 1, ten: "Hiệp", check: false, stt: null },
        { id: 2, ten: "Hà", check: false, stt: null },
        { id: 3, ten: "Hưng", check: false, stt: null },
        { id: 4, ten: "Lực", check: false, stt: null },
        { id: 5, ten: "Phương", check: false, stt: null },
        { id: 6, ten: "Anh", check: false, stt: null },
        { id: 7, ten: "Khải", check: false, stt: null },
        { id: 8, ten: "Thúy", check: false, stt: null },
        { id: 9, ten: "Nam", check: false, stt: null },
        { id: 10, ten: "Hiếu", check: false, stt: null }
    ])
    const xuLyMangNguoiTruc = (arrNguoiTruc) => {
        let nguoiTruc = [];
        for (let i = 0; i < arrNguoiTruc.length; i++) {
            if (arrNguoiTruc[i].stt != null) {
                nguoiTruc.push(arrNguoiTruc[i]);
            }
        }
        nguoiTruc.sort((a, b) => a.stt - b.stt);
        return nguoiTruc;
    }
    const onHandelChangValue = (e) => {
        let idNguoiTruc = e.target.id.toString()
        let updatedNguoiTruc;
        if (e.target.checked === true) {
            sttNguoiTruc = (sttNguoiTruc + 1)
            updatedNguoiTruc = nguoiTruc.map(item =>
                item.id.toString() === idNguoiTruc
                    ? { ...item, stt: sttNguoiTruc } // Cập nhật đối tượng có id tương ứng
                    : item
            );
        }
        else {
            sttNguoiTruc = (sttNguoiTruc - 1)
            updatedNguoiTruc = nguoiTruc.map(item =>
                item.id.toString() === idNguoiTruc
                    ? { ...item, stt: null } // Cập nhật đối tượng có id tương ứng
                    : item
            );
        }
        setNguoiTruc(updatedNguoiTruc)
    }
    var elementNguoiTruc = nguoiTruc.map((value, index) => {
        return <tr key={index}>
            <td>{value.ten}</td>
            <td><div className="form-check">
                {value.check === true ? <input className="form-check-input" id={value.id} type="checkbox" checked onChange={onHandelChangValue} /> : <input className="form-check-input" id={value.id} type="checkbox" onChange={onHandelChangValue} />}
                <label className="form-check-label" >
                    Chọn
                </label>
            </div></td>
            <td>{value.stt}</td>
        </tr>
    })
    const TinhTuan = () => {
        let arrNguoiTrucs = xuLyMangNguoiTruc(nguoiTruc);
        if (arrNguoiTrucs.length === 0) {
            toast.error('Chưa chọn người trực', {
                position: 'bottom-right',
            });
            return false;
        }
        let newArrNguoiTruc = [];
        let arrNgay = []
        let soNgay = differenceInDays(denNgay, tuNgay) + 1;
        // let soTuan = soNgay / 7
        let ngayIndex = addDays(tuNgay, -1);
        for (let i = 0; i < soNgay; i++) {
            let newDate = addDays(ngayIndex, 1);
            if (i >= arrNguoiTrucs.length) {
                let so = i - (arrNguoiTrucs.length * Math.trunc(i / arrNguoiTrucs.length))
                newArrNguoiTruc[i] = arrNguoiTrucs[so]
            }
            else {
                newArrNguoiTruc[i] = arrNguoiTrucs[i]
            }
            let item = {
                thu: format(newDate, 'EEEE', { locale: vi }),
                ngay: newDate.getDate().toString() + "/" + (newDate.getMonth() + 1).toString() + "/" + newDate.getFullYear().toString(),
                tenNguoiTruc: newArrNguoiTruc[i].ten
            }
            arrNgay[i] = item;
            ngayIndex = newDate
        }

        props.onSetArrLichTruc(arrNgay)
        props.onShowBangLichTruc();
    }

    return <div>
        {isShowLichTruc ?
            <motion.div
                key="component1"
                initial={{ x: '-100%' }}       // Vị trí ban đầu ra ngoài màn hình (bên phải)
                animate={{ x: 0 }}            // Vị trí cuối cùng (hiển thị trong màn hình)
                exit={{ x: '100%' }}         // Khi rời đi, di chuyển ra ngoài màn hình (bên trái)
                transition={{ duration: 0.5 }}  // Thời gian chuyển động
                className="component-box"
            >
                <div className="row mt-3">
                    <div className="card border-left-warning shadow h-70 py-2 col-12" >
                        <div className="card-header bg-gradient-warning text-white">
                            <h5>Chọn ngày</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5">
                                    <label className='col-form-label' >Từ ngày: </label>
                                    <DatePicker
                                        className="form-control"
                                        selected={tuNgay}
                                        onChange={(date) => {
                                            setTuNgay(date)
                                        }}
                                        dateFormat="dd/MM/yyyy" // Định dạng hiển thị ngày
                                        locale={vi} // Thiết lập ngôn ngữ tiếng Việt
                                        showPopperArrow={false} // Tùy chọn không hiển thị mũi tên của popper
                                    />
                                </div>
                                <div className="col-6">
                                    <label className='col-form-label' >Đến ngày: </label>
                                    <DatePicker
                                        className="form-control"
                                        selected={denNgay}
                                        onChange={(date) => {
                                            setDenNgay(date)
                                        }}
                                        dateFormat="dd/MM/yyyy" // Định dạng hiển thị ngày
                                        locale={vi} // Thiết lập ngôn ngữ tiếng Việt
                                        showPopperArrow={false} // Tùy chọn không hiển thị mũi tên của popper
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="card  border-left-primary shadow h-70 py-2 col-12" >
                        <div className="card-header bg-gradient-primary text-white">
                            <h5>Chọn người trực</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tên người trực</th>
                                            <th>Thao tác</th>
                                            <th>Thứ tự</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elementNguoiTruc}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <button style={{ fontSize: "18px", width: "100%" }} className="btn btn-info"
                        onClick={TinhTuan}><i className="fas fa-calendar-alt mr-1"></i><span>Tính lịch tuần</span></button>
                </div>
            </motion.div> : <motion.div
                key="component2"
                initial={{ x: '100%' }}       // Vị trí ban đầu ra ngoài màn hình (bên phải)
                animate={{ x: 0 }}            // Vị trí cuối cùng (hiển thị trong màn hình)
                exit={{ x: '-100%' }}         // Khi rời đi, di chuyển ra ngoài màn hình (bên trái)
                transition={{ duration: 0.5 }}  // Thời gian chuyển động
                className="component-box"
            >
                <div className="row mt-2"><BangLichTruc  ></BangLichTruc></div>
            </motion.div>
        }
        <ToastContainer />

    </div>
}
const mapStateToProp = (state) => {
    return {
        isShowLichTruc: state.taskIsShowLichTruc,
        arrLichTrucs: state.taskLichTruc,

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowBangLichTruc: () => {
            dispatch(actions.showBangLichTruc());
        },
        onSetArrLichTruc: (arrNgayTrucs) => {
            dispatch(actions.setArrLichTruc(arrNgayTrucs))
        }
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(LichTrucThang)