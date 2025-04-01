import { useRef } from 'react'
import htmlDocx from 'html-docx-js/dist/html-docx';
import iconDownload from '../../static/icons/download.png'
import iconBack from '../../static/icons/back.png'
import { connect } from 'react-redux';
import * as actions from "../../actions/index"
const BangLichTruc = (props) => {
    // Sử dụng useRef để tham chiếu đến phần tử DOM của component cần xuất ra file DOCX
    const contentRef = useRef();
    // Hàm để xuất nội dung component thành file DOCX
    const exportToDoc = () => {
        // Lấy nội dung HTML của component từ ref
        const contentHTML = contentRef.current.innerHTML;
        // Chuyển nội dung HTML thành blob .docx
        const converted = htmlDocx.asBlob(contentHTML);
        // Tạo liên kết và kích hoạt tải xuống
        const link = document.createElement('a');
        link.href = URL.createObjectURL(converted);
        link.download = 'Lịch trực tháng.docx'; // Tên file tải về
        link.click();
    };
    var ngayTruc = props.arrNgayTrucs
    var arrTables = []
    const elementTh = (arrData) => {
        return arrData.map((item, index) => {
            return (
                <th key={index}>{item.thu} {" (" + item.ngay + ")"}</th>
            )
        })
    }
    const elementThBody = (arrData) => {
        return arrData.map((item, index) => {
            return (
                <td key={index}>{item.tenNguoiTruc}</td>
            )
        })
    }
    for (let i = 0; i < ngayTruc.length / 7; i++) {
        let arrData = []
        for (let j = 0; j < 7; j++) {
            if (ngayTruc[i * 7 + j] != null) {
                arrData[j] = ngayTruc[i * 7 + j]
            }
            else {
                break;
            }
        }
        arrTables[i] = (<div key={i} className="row">
            <div className="table-responsive mt-2">
                <label style={{ fontSize: "16", fontWeight: 'bold', color: "red" }}>Tuần {i + 1}</label>
                <table border="1" className='table table-bordered table-data'>
                    <thead>
                        <tr style={{ textAlign: 'center', fontSize: "16px" }}>
                            {elementTh(arrData)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ textAlign: 'center', fontSize: "16px" }}>
                            {elementThBody(arrData)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
    }
    return (
        <div>
            <button className='btn btn-warning' onClick={() => {
                props.onShowLichTrucThang();
            }}><i className="fas fa-long-arrow-alt-left mr-1"></i>Quay lại</button>
            <div ref={contentRef}>{arrTables}</div>
            <button className='btn btn-success' onClick={exportToDoc}><i className="fas fa-download mr-1"></i>Tải file DOCX</button>
        </div>

    )
}
const mapStateToProp = (state) => {
    return {
        isShowLichTruc: state.taskIsShowLichTruc,
        arrNgayTrucs: state.taskLichTruc
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowLichTrucThang: () => {
            dispatch(actions.showLichTrucThang());
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(BangLichTruc)